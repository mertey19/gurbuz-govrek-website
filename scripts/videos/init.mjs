/**
 * Video tablosunu oluşturur. Bir kez çalıştırmak yeterlidir.
 *
 * Çalıştırma: node --env-file=.env.local scripts/videos/init.mjs
 */
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS videos (
    id          serial PRIMARY KEY,
    youtube_id  text NOT NULL UNIQUE,
    title       text NOT NULL,
    description text NOT NULL DEFAULT '',
    category    text NOT NULL DEFAULT 'tercih',
    sort_order  integer NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now()
  )
`;

// Liste sorgusu kategoriye göre filtreleyip sıraya diziyor.
await sql`
  CREATE INDEX IF NOT EXISTS videos_category_sort_idx
    ON videos (category, sort_order, created_at DESC)
`;

const rows = await sql`SELECT category, count(*)::int AS adet FROM videos GROUP BY category`;

console.log("videos tablosu hazır.");
if (rows.length === 0) {
  console.log("Henüz video yok.");
} else {
  for (const row of rows) {
    console.log(`  ${row.category}: ${row.adet}`);
  }
}
