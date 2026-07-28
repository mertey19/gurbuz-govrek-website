/**
 * Panel meslek tanıtımları tablosunu oluşturur. Bir kez çalıştırmak yeterlidir.
 *
 * Çalıştırma: node --env-file=.env.local scripts/professions/init.mjs
 */
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS managed_professions (
    id         serial PRIMARY KEY,
    slug       text NOT NULL UNIQUE,
    title      text NOT NULL,
    category   text NOT NULL DEFAULT 'sayisal',
    summary    text NOT NULL DEFAULT '',
    body       text NOT NULL,
    image      text NOT NULL DEFAULT '',
    image_alt  text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS managed_professions_category_idx
    ON managed_professions (category, title)
`;

const rows = await sql`SELECT count(*)::int AS adet FROM managed_professions`;
console.log(`managed_professions hazır. Kayıt: ${rows[0].adet}`);
