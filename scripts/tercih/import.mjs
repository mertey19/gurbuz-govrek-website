/**
 * Tercih robotu veri yükleyici: JSONL -> Neon.
 *
 * Veri repoda tutulmaz (repo herkese açıktır). Bu betik `tmp/tercih-programs.jsonl`
 * dosyasını okur ve veritabanını yeniden doldurur.
 *
 * Kullanım:
 *   1. python scripts/tercih/extract.py "<xlsx yolu>"
 *   2. DATABASE_URL tanımlıyken: npm run tercih:import
 */
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { neon } from "@neondatabase/serverless";

const INPUT = "tmp/tercih-programs.jsonl";
const BATCH_SIZE = 500;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    "DATABASE_URL tanımlı değil. Vercel panelindeki değeri .env.local dosyasına ekleyin.",
  );
  process.exit(1);
}

const sql = neon(databaseUrl);

async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS tercih_programs (
      id BIGSERIAL PRIMARY KEY,
      level VARCHAR(16) NOT NULL,
      program_code VARCHAR(24),
      kind VARCHAR(16),
      city VARCHAR(80),
      university VARCHAR(200),
      faculty VARCHAR(240),
      department VARCHAR(280),
      duration SMALLINT,
      score_type VARCHAR(8) NOT NULL,
      rank INTEGER NOT NULL,
      score NUMERIC(10, 5),
      quota INTEGER,
      conditions TEXT,
      prof INTEGER,
      doctor INTEGER,
      lecturers INTEGER,
      accredited VARCHAR(80),
      tus VARCHAR(80),
      dus VARCHAR(80),
      imported_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Robot sorgusu daima (puan türü, sıralama) üzerinden filtreler.
  await sql`
    CREATE INDEX IF NOT EXISTS tercih_programs_lookup_idx
      ON tercih_programs (score_type, rank)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS tercih_programs_level_idx
      ON tercih_programs (level, score_type, rank)
  `;
}

/** UNNEST ile toplu ekleme — satır başına sorgu açmaktan çok daha hızlı. */
async function insertBatch(rows) {
  if (rows.length === 0) return;

  const column = (key) => rows.map((row) => row[key] ?? null);

  await sql`
    INSERT INTO tercih_programs (
      level, program_code, kind, city, university, faculty, department,
      duration, score_type, rank, score, quota, conditions,
      prof, doctor, lecturers, accredited, tus, dus
    )
    SELECT * FROM UNNEST(
      ${column("level")}::varchar[],
      ${column("program_code")}::varchar[],
      ${column("kind")}::varchar[],
      ${column("city")}::varchar[],
      ${column("university")}::varchar[],
      ${column("faculty")}::varchar[],
      ${column("department")}::varchar[],
      ${column("duration")}::smallint[],
      ${column("score_type")}::varchar[],
      ${column("rank")}::integer[],
      ${column("score")}::numeric[],
      ${column("quota")}::integer[],
      ${column("conditions")}::text[],
      ${column("prof")}::integer[],
      ${column("doctor")}::integer[],
      ${column("lecturers")}::integer[],
      ${column("accredited")}::varchar[],
      ${column("tus")}::varchar[],
      ${column("dus")}::varchar[]
    )
  `;
}

/** Dosyanın tamamını okur; hangi seviyelerin geldiğini önceden bilmek gerekir. */
async function readRecords() {
  const reader = createInterface({
    input: createReadStream(INPUT, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  const records = [];
  for await (const line of reader) {
    if (line.trim()) records.push(JSON.parse(line));
  }
  return records;
}

async function main() {
  await ensureSchema();

  const records = await readRecords();

  if (records.length === 0) {
    console.error("Dosyada kayıt yok. Yükleme iptal edildi; tablo değiştirilmedi.");
    process.exitCode = 1;
    return;
  }

  const levels = [...new Set(records.map((record) => record.level))];

  // Şehir sütunu güncellenmiş kaynak dosyada bulunmuyor. Mevcut kayıtlardaki
  // program kodu → şehir eşlemesi çıkarılıp yeni satırlara geri yazılır.
  const existingCityRows = await sql`
    SELECT program_code, city FROM tercih_programs
    WHERE program_code IS NOT NULL AND city IS NOT NULL
  `;
  const cityByCode = new Map(
    existingCityRows.map((row) => [row.program_code, row.city]),
  );

  let restored = 0;
  let missing = 0;
  for (const record of records) {
    if (record.city) continue;
    const city = cityByCode.get(record.program_code);
    if (city) {
      record.city = city;
      restored += 1;
    } else {
      missing += 1;
    }
  }

  // Yalnızca dosyada bulunan seviyeler değiştirilir. Tabloyu tümüyle boşaltmak,
  // sadece lisans içeren bir dosya geldiğinde önlisans verisini de silerdi.
  for (const level of levels) {
    await sql`DELETE FROM tercih_programs WHERE level = ${level}`;
  }

  let total = 0;
  for (let index = 0; index < records.length; index += BATCH_SIZE) {
    const batch = records.slice(index, index + BATCH_SIZE);
    await insertBatch(batch);
    total += batch.length;
    process.stdout.write(`\r${total} program yüklendi…`);
  }

  const counts = await sql`
    SELECT level, COUNT(*)::int AS count FROM tercih_programs GROUP BY level ORDER BY level
  `;

  console.log(`\r${total} program yüklendi (seviye: ${levels.join(", ")}).`);
  if (restored || missing) {
    console.log(`Şehir eşleştirme: ${restored} kayıt kurtarıldı, ${missing} kayıt şehirsiz.`);
  }
  for (const row of counts) {
    console.log(`  ${row.level}: ${row.count}`);
  }
}

main().catch((error) => {
  console.error("Yükleme başarısız:", error.message);
  process.exit(1);
});
