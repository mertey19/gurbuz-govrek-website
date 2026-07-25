import "server-only";
import { neon } from "@neondatabase/serverless";
import type { Program, RobotResult, RobotScoreType } from "@/lib/tercih/types";

/**
 * Tercih robotu sorgu katmanı.
 *
 * Kapsam kararı (2026-07-25, site sahibinin talebi): robot eşleşen programların
 * TAMAMINI, akademik kadro / akreditasyon / TUS-DUS sütunları dâhil döndürür.
 * Daha önceki sürümde yalnızca 5 örnek dönüyor ve bu sütunlar gizleniyordu.
 *
 * Bunun bilinen bedeli: uç nokta herkese açık olduğu için veri seti sistematik
 * sorguyla dışarı çıkarılabilir. Karar, trafik ve erişilebilirlik lehine bilerek
 * verilmiştir.
 */

/** Sıralamanın etrafında taranan pencere. */
const RANK_WINDOW_BELOW = 0.85;
const RANK_WINDOW_ABOVE = 1.25;

/**
 * Pencerenin taraması gereken en az sıralama genişliği.
 *
 * Yüzde tabanlı pencere küçük sıralamalarda neredeyse hiç açılmaz: 1. sıra için
 * aralık 1–2 çıkar ve en iyi program 38. sırada olduğu için hiçbir sonuç dönmez.
 * Bu taban, ilk sıralardaki öğrencinin de anlamlı bir liste görmesini sağlar.
 */
const MIN_WINDOW_SPAN = 2500;

/**
 * Tek yanıtta dönebilecek en fazla satır. İş kuralı değil, koruma amaçlıdır:
 * en geniş sorgu bile (~7.900 önlisans programı) yanıtı ve tarayıcıyı kilitlemesin.
 */
const MAX_ROWS = 8000;

export class TercihRobotUnavailableError extends Error {
  constructor() {
    super("Tercih robotu veritabanı yapılandırılmamış.");
    this.name = "TercihRobotUnavailableError";
  }
}

let client: ReturnType<typeof neon> | undefined;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new TercihRobotUnavailableError();
  client ??= neon(databaseUrl);
  return client;
}

type ProgramRow = {
  program_code: string | null;
  university: string;
  faculty: string | null;
  department: string;
  city: string;
  kind: string;
  duration: number | null;
  rank: number;
  score: string | number | null;
  quota: number | null;
  prof: number | null;
  doctor: number | null;
  lecturers: number | null;
  accredited: string | null;
  tus: string | null;
  dus: string | null;
  conditions: string | null;
};

/**
 * Verilen başarı sırasına yakın programların tamamını döndürür.
 * TYT önlisans, diğer puan türleri lisans programlarını kapsar.
 */
export async function queryRobot(
  scoreType: RobotScoreType,
  rank: number,
): Promise<RobotResult> {
  const sql = getSql();
  const level = scoreType === "TYT" ? "onlisans" : "lisans";

  // Öğrencinin sırasının biraz üstü ve altı: hem güvenli hem hedef tercihler.
  const windowFrom = Math.max(1, Math.floor(rank * RANK_WINDOW_BELOW));
  const windowTo = Math.max(
    Math.ceil(rank * RANK_WINDOW_ABOVE),
    windowFrom + MIN_WINDOW_SPAN,
  );

  const summaryRows = (await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE kind = 'DEVLET')::int AS state_count,
      COUNT(*) FILTER (WHERE kind = 'VAKIF')::int AS foundation_count,
      COUNT(*) FILTER (WHERE kind IS DISTINCT FROM 'DEVLET' AND kind IS DISTINCT FROM 'VAKIF')::int AS other_count
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
  `) as {
    total: number;
    state_count: number;
    foundation_count: number;
    other_count: number;
  }[];

  const cityRows = (await sql`
    SELECT city, COUNT(*)::int AS count
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
      AND city IS NOT NULL
    GROUP BY city
    ORDER BY count DESC
    LIMIT 4
  `) as { city: string; count: number }[];

  const programRows = (await sql`
    SELECT
      program_code, university, faculty, department, city, kind, duration,
      rank, score, quota, prof, doctor, lecturers, accredited, tus, dus, conditions
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
    ORDER BY rank ASC
    LIMIT ${MAX_ROWS}
  `) as ProgramRow[];

  const programs: Program[] = programRows.map((row) => ({
    programCode: row.program_code,
    university: row.university,
    faculty: row.faculty,
    department: row.department,
    city: row.city,
    kind: row.kind,
    duration: row.duration,
    rank: row.rank,
    // NUMERIC sütunu sürücüden metin olarak gelebilir.
    score: row.score === null ? null : Number(row.score),
    quota: row.quota,
    prof: row.prof,
    doctor: row.doctor,
    lecturers: row.lecturers,
    accredited: row.accredited,
    tus: row.tus,
    dus: row.dus,
    conditions: row.conditions,
  }));

  const summary = summaryRows[0];

  return {
    totalMatches: summary?.total ?? 0,
    stateCount: summary?.state_count ?? 0,
    foundationCount: summary?.foundation_count ?? 0,
    otherCount: summary?.other_count ?? 0,
    topCities: cityRows,
    programs,
    windowFrom,
    windowTo,
  };
}
