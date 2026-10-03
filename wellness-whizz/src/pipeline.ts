/**
 * The quiz pipeline. This is the Make.com scenario in code:
 *   form submission -> OpenAI recommendations -> look up existing supplements -> create the missing ones with OpenAI
 *   -> store the 5 results for the session -> mark the session ready.
 */
import {
  getSupplementsByNameKeys, insertSupplement, listSupplementNames, markSession, normalizeNameKey, saveSessionResults,
  type QuizProfile, type Supplement,
} from './db';
import { generateSupplementProfile, recommendSupplements, type AiEnv } from './openai';

export interface PipelineEnv extends AiEnv {
  DB: D1Database;
}

export async function runQuizPipeline(env: PipelineEnv, sessionId: string, profile: QuizProfile): Promise<void> {
  try {
    const knownNames = await listSupplementNames(env.DB, 300);
    const recommendations = await recommendSupplements(env, profile, knownNames);

    const keys = recommendations.map((r) => normalizeNameKey(r.name));
    const existing = await getSupplementsByNameKeys(env.DB, keys);

    // Generate the missing profiles in parallel (the Make scenario did this one by one).
    const resolved = await Promise.all(
      recommendations.map(async (rec, i): Promise<{ supplement: Supplement; reason: string }> => {
        const found = existing.get(keys[i]);
        if (found) return { supplement: found, reason: rec.reason };
        const draft = await generateSupplementProfile(env, rec);
        const supplement = await insertSupplement(env.DB, draft);
        return { supplement, reason: rec.reason };
      }),
    );

    // Two recommendations can resolve to the same supplement; keep the first.
    const seen = new Set<number>();
    const items = resolved
      .filter(({ supplement }) => (seen.has(supplement.id) ? false : (seen.add(supplement.id), true)))
      .map(({ supplement, reason }) => ({ supplementId: supplement.id, reason }));

    await saveSessionResults(env.DB, sessionId, items);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`quiz pipeline failed for session ${sessionId}: ${message}`);
    await markSession(env.DB, sessionId, 'failed', message.slice(0, 500));
    throw err;
  }
}
