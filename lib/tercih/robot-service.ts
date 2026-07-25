import "server-only";
import { neon } from "@neondatabase/serverless";
import {
  SAMPLE_LIMIT,
  type ProgramSample,
  type RobotResult,
  type RobotScoreType,
} from "@/lib/tercih/types";

/**
 * Tercih robotu sorgu katmanı.
 *
 * Tasarım kuralı: bu servis ASLA tam listeyi döndürmez. Amaç kullanıcıya değeri
 * kanıtlamak ve görüşmeye yönlendirmektir; veri setinin kendisi Gürbüz Gövrek'in
 * çalışma varlığıdır ve dışa aktarılmamalıdır.
 *
 * Bu yüzden:
 *   - En fazla `SAMPLE_LIMIT` program döner.
 *   - Sayfalama (offset) yoktur; art arda istekle liste toplanamaz.
 *   - Akademik kadro, akreditasyon, TUS/DUS ve koşul sütunları hiç seçilmez.
 */

/** Sıralamanın etrafında taranan pencere. */
const RANK_WINDOW_BELOW = 0.85;
const RANK_WINDOW_ABOVE = 1.25;

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

/**
 * Verilen başarı sırasına yakın programları özetler.
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
  const windowTo = Math.ceil(rank * RANK_WINDOW_ABOVE);

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

  // Yalnızca vitrin alanları seçilir; kilitli sütunlar sorguya hiç girmez.
  const sampleRows = (await sql`
    SELECT university, department, city, kind, rank
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
    ORDER BY ABS(rank - ${rank}) ASC
    LIMIT ${SAMPLE_LIMIT}
  `) as ProgramSample[];

  const summary = summaryRows[0];

  return {
    totalMatches: summary?.total ?? 0,
    stateCount: summary?.state_count ?? 0,
    foundationCount: summary?.foundation_count ?? 0,
    otherCount: summary?.other_count ?? 0,
    topCities: cityRows,
    samples: sampleRows,
    windowFrom,
    windowTo,
  };
}
