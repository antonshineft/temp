#!/usr/bin/env node
/**
 * Convert a Webflow CMS export of the "Supplements" collection into SQL for the D1 database.
 *
 *   1. In Webflow: CMS -> Supplements -> Export (CSV).
 *   2. node scripts/import-webflow-csv.mjs path/to/Supplements.csv > import.sql
 *   3. npx wrangler d1 execute wellness-whizz --remote --file=import.sql   (or --local)
 *
 * Add --download-images to copy the product images from Webflow's CDN into public/images/products/ and link to the
 * local copies (run it before Webflow hosting is switched off). Without it the original image URLs are kept.
 * Rows are upserted by supplement name, so re-running the import refreshes existing rows.
 *
 * Column names in Webflow exports follow your field names, so the FIELD_MAP below lists likely candidates for each
 * database field. The script prints which columns it matched (and which it ignored) to stderr: adjust FIELD_MAP if needed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import {
  EFFECTIVITY_LABELS, SAFETY_LABELS, inferCategory, parseCsv, productUrl, safeUrl, sanitizeRichText, slugify,
  supplementInsert,
} from './lib.mjs';

const FIELD_MAP = {
  name: ['supplement name', 'name', 'title', 'supplement'],
  slug: ['slug'],
  category: ['category', 'type', 'subtitle', 'group', 'kind'],
  form_type: ['form', 'form type', 'shape', 'dosage form', 'image type'],
  fda_status: ['fda', 'fda status', 'fda approved', 'fda approval'],
  safety_status: ['safe option', 'safety status', 'safe', 'safety badge', 'safety label'],
  effectivity: ['effectiveness', 'effectivity', 'effectivity rating', 'efficacy', 'rate', 'rating'],
  safety: ['safe level', 'safety', 'safety rating', 'safety level', 'safety rate'],
  summary: ['summary', 'description', 'short description', 'intro', 'paragraph'],
  benefits_html: ['benefits', 'benefit'],
  contraindications_html: ['contraindications', 'contraindication', 'cautions'],
  enhancing_html: ['enhancing effect', 'enhancing', 'enhancing effects', 'synergy'],
  interactions_html: ['possible interactions', 'interactions', 'posible interactions', 'interaction'],
  why_consider: ['why you should consider to take it', 'why you should consider', 'why consider', 'why'],
  holistic_html: ['content', 'holistic highlights', 'holistic', 'highlights'],
  studies_html: ['research', 'relevant studies', 'studies', 'links'],
  product_1: ['name 1', 'top 1', 'product 1', 'top1'],
  product_2: ['name 2', 'top 2', 'product 2', 'top2'],
  product_3: ['name 3', 'top 3', 'product 3', 'top3'],
  product_4: ['name 4', 'top 4', 'product 4', 'top4'],
  product_5: ['name 5', 'top 5', 'product 5', 'top5'],
  image_1: ['image 1', 'product image 1'],
  image_2: ['image 2', 'product image 2'],
  image_3: ['image 3', 'product image 3'],
  image_4: ['image 4', 'product image 4'],
  image_5: ['image 5', 'product image 5'],
  link_1: ['link 1', 'url 1', 'product link 1'],
  link_2: ['link 2', 'url 2', 'product link 2'],
  link_3: ['link 3', 'url 3', 'product link 3'],
  link_4: ['link 4', 'url 4', 'product link 4'],
  link_5: ['link 5', 'url 5', 'product link 5'],
};

const args = process.argv.slice(2);
const downloadImages = args.includes('--download-images');
const file = args.find((a) => !a.startsWith('--'));
const IMAGE_DIR = new URL('../public/images/products/', import.meta.url);
if (!file) {
  console.error('usage: node scripts/import-webflow-csv.mjs <Supplements.csv> > import.sql');
  process.exit(1);
}

const rows = parseCsv(readFileSync(file, 'utf8'));
if (!rows.length) {
  console.error('CSV is empty');
  process.exit(1);
}

const headers = Object.keys(rows[0]);
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const columnFor = {};
for (const [field, candidates] of Object.entries(FIELD_MAP)) {
  const hit = candidates.map(norm).map((c) => headers.find((h) => norm(h) === c)).find(Boolean);
  if (hit) columnFor[field] = hit;
}
const used = new Set(Object.values(columnFor));
console.error('Matched columns:');
for (const [field, col] of Object.entries(columnFor)) console.error(`  ${field.padEnd(22)} <- "${col}"`);
console.error('Ignored columns: ' + headers.filter((h) => !used.has(h)).map((h) => `"${h}"`).join(', '));
if (!columnFor.name) {
  console.error('No "Name" column found; adjust FIELD_MAP.');
  process.exit(1);
}

const get = (row, field) => (columnFor[field] ? String(row[columnFor[field]] ?? '').trim() : '');
const statements = [];
let skipped = 0;
for (const row of rows) {
  if (/^true$/i.test(row['Archived'] ?? '') || /^true$/i.test(row['Draft'] ?? '')) {
    skipped++;
    continue;
  }
  const name = get(row, 'name');
  if (!name) {
    skipped++;
    continue;
  }
  const slug = get(row, 'slug') || slugify(name);
  const products = [];
  for (let i = 1; i <= 5; i++) {
    const pname = get(row, `product_${i}`);
    if (!pname) continue;
    const product = { name: pname, brand: '', url: safeUrl(get(row, `link_${i}`)) || productUrl(pname) };
    const image = safeUrl(get(row, `image_${i}`));
    if (image) product.image = downloadImages ? await localImage(image, `${slug}-${i}`) : image;
    products.push(product);
  }
  statements.push(
    supplementInsert({
      name,
      slug,
      category: get(row, 'category') || inferCategory(name),
      form_type: mapForm(get(row, 'form_type')),
      fda_status: mapFda(get(row, 'fda_status')),
      safety_status: mapSafetyStatus(get(row, 'safety_status')),
      effectivity: mapRating(get(row, 'effectivity'), EFFECTIVITY_LABELS),
      safety: mapRating(get(row, 'safety'), SAFETY_LABELS),
      summary: stripTags(get(row, 'summary')),
      benefits_html: richText(get(row, 'benefits_html')),
      contraindications_html: richText(get(row, 'contraindications_html')),
      enhancing_html: richText(get(row, 'enhancing_html')),
      interactions_html: richText(get(row, 'interactions_html')),
      why_consider: stripTags(get(row, 'why_consider')),
      holistic_html: richText(get(row, 'holistic_html')),
      studies_html: richText(get(row, 'studies_html')),
      products,
    }, 'upsert'),
  );
}
process.stdout.write(`-- Imported from ${file} by scripts/import-webflow-csv.mjs\n${statements.join('\n\n')}\n`);
console.error(`Wrote ${statements.length} INSERT statements (${skipped} rows skipped).`);

// ---------- mappers ----------

function mapForm(v) {
  const s = v.toLowerCase();
  if (!s) return 'capsule';
  if (s.includes('small')) return 'small_softgel';
  if (s.includes('soft')) return 'softgel';
  if (s.includes('tablet') || s.includes('pill')) return 'tablet';
  if (s.includes('powder')) return 'powder';
  if (s.includes('gumm')) return 'gummy';
  if (s.includes('bar')) return 'bar';
  if (s.includes('drop') || s.includes('liquid') || s.includes('oil')) return 'drops';
  return 'capsule';
}

function mapFda(v) {
  const s = v.toLowerCase();
  if (!s) return 'probably_ok';
  if (/\b(not|no|unapproved|banned)\b/.test(s)) return 'not_approved';
  if (/\b(yes|approved|true)\b/.test(s)) return 'approved';
  return 'probably_ok';
}

function mapSafetyStatus(v) {
  const s = v.toLowerCase();
  if (!s || s === '-') return 'ok'; // Webflow "Safe Option" = "-" was shown as the "Safe Ok" badge
  if (s.includes('prescription')) return 'prescription';
  if (/\b(not|no|unsafe|danger)\b/.test(s)) return 'not_safe';
  if (/\b(ok|moderate|caution)\b/.test(s)) return 'ok';
  return 'safe';
}

/** Download a product image into public/images/products and return its local URL (falls back to the remote URL). */
async function localImage(url, baseName) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ext = (/\.(png|jpe?g|webp|gif|svg)(?=$|\?)/i.exec(new URL(url).pathname)?.[1] ?? 'png').toLowerCase();
    const fileName = `${baseName}.${ext}`;
    mkdirSync(IMAGE_DIR, { recursive: true });
    const target = new URL(fileName, IMAGE_DIR);
    if (!existsSync(target)) writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    return `/images/products/${fileName}`;
  } catch (err) {
    console.error(`  image not downloaded (${err.message}): ${url}`);
    return url;
  }
}

function mapRating(v, labels) {
  const n = Number(v);
  if (Number.isFinite(n) && n >= 1 && n <= 5) return Math.round(n);
  const m = /rate\s*([1-5])/i.exec(v) || /([1-5])\s*(out of|\/)\s*5/i.exec(v);
  if (m) return Number(m[1]);
  const idx = labels.findIndex((l) => v.toLowerCase().includes(l));
  return idx >= 0 ? idx + 1 : 3;
}

function richText(html) {
  // Webflow exports rich text as HTML; keep the formatting, drop everything else (see sanitizeRichText).
  return sanitizeRichText(html);
}

function stripTags(html) {
  return String(html ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
