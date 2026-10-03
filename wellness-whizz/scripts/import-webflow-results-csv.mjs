#!/usr/bin/env node
/**
 * Convert a Webflow CMS export of the "Results" collection (one item per quiz session) into SQL, so that old
 * /result/{sessionID} links keep working after the move.
 *
 *   node scripts/import-webflow-results-csv.mjs path/to/Results.csv > results.sql
 *   npx wrangler d1 execute wellness-whizz --remote --file=results.sql
 *
 * Run it AFTER importing the Supplements collection: each "Supplement N" column holds a supplement slug, which is
 * resolved against the supplements table. Rows whose supplements are missing simply get fewer cards.
 */
import { readFileSync } from 'node:fs';
import { parseCsv, sql } from './lib.mjs';

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/import-webflow-results-csv.mjs <Results.csv> > results.sql');
  process.exit(1);
}
const rows = parseCsv(readFileSync(file, 'utf8'));
const statements = [];
let sessions = 0;
let cards = 0;
let skipped = 0;
const slugs = new Map();

for (const row of rows) {
  if (/^true$/i.test(row['Archived'] ?? '') || /^true$/i.test(row['Draft'] ?? '')) {
    skipped++;
    continue;
  }
  const id = String(row['User Session'] || row['Slug'] || row['Name'] || '').trim();
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
    skipped++;
    continue;
  }
  const created = toSqlDate(row['Created On']);
  statements.push(
    `INSERT OR IGNORE INTO sessions (id, sex, age, activity, diet, goal, status, created_at, completed_at) ` +
      `VALUES (${sql(id)}, '', '', '', '', '', 'ready', ${sql(created)}, ${sql(created)});`,
  );
  sessions++;
  for (let i = 1; i <= 5; i++) {
    const slug = String(row[`Supplement ${i}`] || row[`Supplements ${i}`] || '').trim();
    if (!slug) continue;
    const reason = String(row[`Dosage ${i}`] || row[`Reason ${i}`] || '').trim();
    slugs.set(slug, (slugs.get(slug) ?? 0) + 1);
    statements.push(
      `INSERT OR IGNORE INTO session_supplements (session_id, position, supplement_id, reason) ` +
        `SELECT ${sql(id)}, ${i}, id, ${sql(reason)} FROM supplements WHERE slug = ${sql(slug)};`,
    );
    cards++;
  }
}

process.stdout.write(`-- Imported from ${file} by scripts/import-webflow-results-csv.mjs\n${statements.join('\n')}\n`);
console.error(`Wrote ${sessions} sessions with ${cards} cards (${skipped} rows skipped); ${slugs.size} distinct supplement slugs referenced.`);

function toSqlDate(value) {
  const d = new Date(String(value ?? ''));
  const iso = Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  return iso.slice(0, 19).replace('T', ' ');
}
