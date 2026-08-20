/**
 * Tercih robotunun sunucuda kullanacağı küçük, salt okunur veri dosyasını üretir.
 *
 * `extract.py` tarafından yazılan JSONL, tekrar eden metinleri sözlüklere ayıran
 * dizi biçimine dönüştürülür. Böylece robot DATABASE_URL olmadan da çalışır.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const INPUT = "tmp/tercih-programs.jsonl";
const OUTPUT = "data/tercih-programs-2026.json";
const ALIASES = "scripts/tercih/city-aliases.json";
const EXPECTED_RECORDS = 18_251;

const lines = readFileSync(INPUT, "utf8")
  .split(/\r?\n/)
  .filter((line) => line.trim() !== "");

if (lines.length !== EXPECTED_RECORDS) {
  throw new Error(
    `Beklenen ${EXPECTED_RECORDS} kayıt yerine ${lines.length} kayıt bulundu. Veri dosyası yazılmadı.`,
  );
}

const aliases = JSON.parse(readFileSync(ALIASES, "utf8"));
const records = lines.map((line) => JSON.parse(line));

function dictionary() {
  const values = [];
  const indexes = new Map();

  return {
    values,
    index(value) {
      const current = indexes.get(value);
      if (current !== undefined) return current;
      const next = values.length;
      values.push(value);
      indexes.set(value, next);
      return next;
    },
  };
}

const kinds = dictionary();
const cities = dictionary();
const universities = dictionary();
const departments = dictionary();
const scoreTypes = dictionary();

const rows = records.map((record) => {
  // Arayüzdeki kurum türü değeriyle kaynak dosyadaki yazımı aynılaştır.
  const kind = record.kind === "YURTDIŞI" ? "Y.DIŞI" : record.kind;
  const city =
    aliases[record.city] ??
    record.city ??
    (kind === "Y.DIŞI" ? "YURT DIŞI" : "BİLİNMİYOR");

  return [
    record.level === "onlisans" ? 1 : 0,
    record.program_code,
    kinds.index(kind),
    cities.index(city),
    universities.index(record.university),
    departments.index(record.department),
    scoreTypes.index(record.score_type),
    record.rank,
    record.score,
    record.quota,
    record.rank_2025,
    record.rank_2024,
    record.rank_2023,
    record.quota_2025,
    record.quota_2024,
    record.quota_2023,
  ];
});

const output = {
  version: 2026,
  kinds: kinds.values,
  cities: cities.values,
  universities: universities.values,
  departments: departments.values,
  scoreTypes: scoreTypes.values,
  rows,
};

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(output), "utf8");
console.log(`${rows.length} programlık yerel veri yazıldı -> ${OUTPUT}`);
