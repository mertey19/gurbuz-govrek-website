/**
 * Panel sunum serileri tablosunu oluşturur. Bir kez çalıştırmak yeterlidir.
 *
 * Çalıştırma: node --env-file=.env.local scripts/slides/init.mjs
 */
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS managed_collections (
    id          serial PRIMARY KEY,
    slug        text NOT NULL UNIQUE,
    label       text NOT NULL,
    short_label text NOT NULL DEFAULT '',
    description text NOT NULL DEFAULT '',
    slides      jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at  timestamptz NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS managed_collections_created_idx
    ON managed_collections (created_at DESC)
`;

const rows = await sql`
  SELECT count(*)::int AS seri, coalesce(sum(jsonb_array_length(slides)), 0)::int AS slayt
  FROM managed_collections
`;
console.log(`managed_collections hazır. Seri: ${rows[0].seri}, slayt: ${rows[0].slayt}`);
