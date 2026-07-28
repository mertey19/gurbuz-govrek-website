/**
 * Panel yazıları tablosunu oluşturur. Bir kez çalıştırmak yeterlidir.
 *
 * Çalıştırma: node --env-file=.env.local scripts/posts/init.mjs
 */
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS managed_posts (
    id           serial PRIMARY KEY,
    slug         text NOT NULL UNIQUE,
    title        text NOT NULL,
    description  text NOT NULL DEFAULT '',
    category     text NOT NULL DEFAULT 'Genel',
    body         text NOT NULL,
    image        text NOT NULL DEFAULT '/images/guidance-introduction.webp',
    image_alt    text NOT NULL DEFAULT '',
    reading_time text NOT NULL DEFAULT '5 dakika',
    published_at timestamptz NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS managed_posts_published_idx
    ON managed_posts (published_at DESC)
`;

const rows = await sql`SELECT count(*)::int AS adet FROM managed_posts`;
console.log(`managed_posts tablosu hazır. Kayıt: ${rows[0].adet}`);
