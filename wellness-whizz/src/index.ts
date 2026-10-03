/**
 * Wellness Whizz on Cloudflare Workers.
 *
 *   /                      home page (static export + supplement lists from D1)
 *   /wellness-quiz         static quiz page (served from /public)
 *   POST /api/quiz         replaces the Webflow form + Make.com scenario
 *   GET  /api/session/:id  status of a quiz session
 *   /result/:id            personalised results page
 *   /supplement/:slug      supplement detail page
 */
import { Hono } from 'hono';
import {
  countRecentSessions, createSession, findSupplementSlugByPrefix, getSession, getSessionResults, getSupplementBySlug,
  listSupplements, type QuizProfile,
} from './db';
import { runQuizPipeline } from './pipeline';
import { fetchAsset, renderHome } from './render/home';
import { renderFailedPage, renderPendingPage, renderResultPage } from './render/result';
import { renderSupplementPage } from './render/supplement';

export interface Bindings {
  DB: D1Database;
  ASSETS: Fetcher;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  DEV_FAKE_AI?: string;
  PRODUCT_SEARCH_URL?: string;
  RATE_LIMIT_PER_HOUR?: string;
}

const app = new Hono<{ Bindings: Bindings }>();

const AGES = ['<18', '18-25', '26-40', '41-65', '65+'];
const ACTIVITIES = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'];
const SEXES = ['Female', 'Male'];
const SESSION_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
const PENDING_TIMEOUT_MS = 10 * 60 * 1000;

const htmlHeaders = (cacheControl: string) => ({ 'content-type': 'text/html; charset=utf-8', 'cache-control': cacheControl });

// ---------- pages ----------

app.get('/', (c) => renderHome(c.env, c.req.raw));

app.get('/result/:id', async (c) => {
  const id = c.req.param('id');
  if (!SESSION_ID_RE.test(id)) return notFound(c.env, c.req.raw);
  const session = await getSession(c.env.DB, id);
  if (!session) return notFound(c.env, c.req.raw);

  if (session.status === 'pending') {
    const startedAt = Date.parse(session.created_at + 'Z');
    const stale = Number.isFinite(startedAt) && Date.now() - startedAt > PENDING_TIMEOUT_MS;
    return c.body(stale ? renderFailedPage(session) : renderPendingPage(session), 200, htmlHeaders('no-store'));
  }
  if (session.status === 'failed') return c.body(renderFailedPage(session), 200, htmlHeaders('no-store'));

  const items = await getSessionResults(c.env.DB, id);
  if (!items.length) return c.body(renderFailedPage(session), 200, htmlHeaders('no-store'));
  return c.body(renderResultPage(session, items), 200, htmlHeaders('private, max-age=0, must-revalidate'));
});

app.get('/supplement/:slug', async (c) => {
  const slug = c.req.param('slug');
  const supplement = await getSupplementBySlug(c.env.DB, slug);
  if (!supplement) {
    const canonical = await findSupplementSlugByPrefix(c.env.DB, slug);
    return canonical ? c.redirect(`/supplement/${canonical}`, 301) : notFound(c.env, c.req.raw);
  }
  const explore = await listSupplements(c.env.DB, 200);
  return c.body(renderSupplementPage(supplement, explore), 200, htmlHeaders('public, max-age=300'));
});

// ---------- API ----------

app.post('/api/quiz', async (c) => {
  const contentType = c.req.header('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await readJson(c.req.raw) : await readForm(c.req.raw);
  const wantsHtml = !isJson && (c.req.header('accept') ?? '').includes('text/html');

  const validation = validateProfile(body);
  if (!validation.ok) {
    return wantsHtml
      ? c.body(`Invalid submission: ${validation.error}`, 400, { 'content-type': 'text/plain; charset=utf-8' })
      : c.json({ error: validation.error }, 400);
  }

  const requestedId = String(body.sessionID ?? body.sessionId ?? '');
  const id = SESSION_ID_RE.test(requestedId) ? requestedId : newSessionId();

  // Re-submits with the same id (double click, retry after a dropped connection) reuse the session.
  const existing = await getSession(c.env.DB, id);
  if (existing) {
    return wantsHtml ? c.redirect(`/result/${id}`, 303) : c.json({ id, status: existing.status, url: `/result/${id}` });
  }

  const ipHash = await hashIp(c.req.header('cf-connecting-ip') ?? '');
  const limit = Number(c.env.RATE_LIMIT_PER_HOUR ?? '10');
  if (ipHash && limit > 0 && (await countRecentSessions(c.env.DB, ipHash, 1)) >= limit) {
    return c.json({ error: 'Too many requests from this network. Please try again later.' }, 429);
  }

  await createSession(c.env.DB, id, validation.profile, ipHash);

  // Keep the pipeline alive even if the browser disconnects; the result page polls until it is ready.
  const work = runQuizPipeline(c.env, id, validation.profile).then(
    () => ({ status: 'ready' as const, error: null as string | null }),
    (err: unknown) => ({ status: 'failed' as const, error: err instanceof Error ? err.message : String(err) }),
  );
  c.executionCtx.waitUntil(work);
  const outcome = await work;

  if (wantsHtml) return c.redirect(`/result/${id}`, 303);
  if (outcome.status === 'failed') {
    return c.json({ id, status: 'failed', url: `/result/${id}`, error: 'We could not prepare your recommendation. Please try again.' }, 500);
  }
  return c.json({ id, status: 'ready', url: `/result/${id}` });
});

app.get('/api/session/:id', async (c) => {
  const id = c.req.param('id');
  if (!SESSION_ID_RE.test(id)) return c.json({ error: 'Not found' }, 404);
  const session = await getSession(c.env.DB, id);
  if (!session) return c.json({ error: 'Not found' }, 404);
  c.header('cache-control', 'no-store');
  return c.json({ id, status: session.status, url: `/result/${id}`, created_at: session.created_at });
});

app.get('/api/supplements', async (c) => {
  const supplements = await listSupplements(c.env.DB, 500);
  c.header('cache-control', 'public, max-age=300');
  return c.json(
    supplements.map((s) => ({
      slug: s.slug, name: s.name, category: s.category, form_type: s.form_type, fda_status: s.fda_status,
      safety_status: s.safety_status, effectivity: s.effectivity, safety: s.safety, summary: s.summary,
      url: `/supplement/${s.slug}`,
    })),
  );
});

// Anything else that reaches the Worker is served from the static assets (with the 404 page as fallback).
app.notFound((c) => (c.req.path.startsWith('/api/') ? c.json({ error: 'Not found' }, 404) : c.env.ASSETS.fetch(c.req.raw)));

app.onError((err, c) => {
  console.error(`${c.req.method} ${c.req.path} failed: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
  if (c.req.path.startsWith('/api/')) return c.json({ error: 'Internal error' }, 500);
  return c.body('Internal error', 500, { 'content-type': 'text/plain; charset=utf-8' });
});

export default app;

// ---------- helpers ----------

async function notFound(env: Bindings, request: Request): Promise<Response> {
  const res = await fetchAsset(env.ASSETS, request, '/404');
  return new Response(res.body, { status: 404, headers: htmlHeaders('no-store') });
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const data = await request.json();
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

async function readForm(request: Request): Promise<Record<string, unknown>> {
  try {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (typeof value === 'string') out[key] = value;
    });
    return out;
  } catch {
    return {};
  }
}

function validateProfile(body: Record<string, unknown>): { ok: true; profile: QuizProfile } | { ok: false; error: string } {
  const text = (key: string, max: number) => String(body[key] ?? '').trim().slice(0, max);
  const sex = text('Sex', 20) || text('sex', 20);
  const age = text('Age2', 20) || text('age', 20);
  const activity = text('Activity-Level', 40) || text('activity', 40);
  const diet = text('Diet', 256) || text('diet', 256);
  const goal = text('Goal', 256) || text('goal', 256);

  if (!SEXES.includes(sex)) return { ok: false, error: 'Please select your biological sex.' };
  if (!AGES.includes(age)) return { ok: false, error: 'Please select your age group.' };
  if (!ACTIVITIES.includes(activity)) return { ok: false, error: 'Please select your activity level.' };
  if (!diet) return { ok: false, error: 'Please describe your dietary preferences.' };
  if (!goal) return { ok: false, error: 'Please describe your health goals.' };
  return { ok: true, profile: { sex, age, activity, diet, goal } };
}

function newSessionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashIp(ip: string): Promise<string | null> {
  if (!ip) return null;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`wellness-whizz:${ip}`));
  return Array.from(new Uint8Array(digest).slice(0, 16), (b) => b.toString(16).padStart(2, '0')).join('');
}
