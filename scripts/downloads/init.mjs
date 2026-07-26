/**
 * İndirme sayacı tablosunu oluşturur. Bir kez çalıştırmak yeterlidir.
 *
 * Çalıştırma: node --env-file=.env.local scripts/downloads/init.mjs
 */
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS download_counts (
    slug       text PRIMARY KEY,
    total      bigint NOT NULL DEFAULT 0,
    updated_at timestamptz NOT NULL DEFAULT now()
  )
`;

const rows = await sql`SELECT slug, total, updated_at FROM download_counts ORDER BY slug`;

console.log("download_counts tablosu hazır.");
if (rows.length === 0) {
  console.log("Henüz kayıt yok.");
} else {
  for (const row of rows) {
    console.log(`  ${row.slug}: ${row.total} (son: ${row.updated_at.toISOString()})`);
  }
}
