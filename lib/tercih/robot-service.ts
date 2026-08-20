import "server-only";
import { neon } from "@neondatabase/serverless";
import {
  EMPTY_FILTERS,
  QUOTA_YEARS,
  type Program,
  type QuotaTrendPoint,
  type RobotFilters,
  type RobotResult,
  type RobotScoreType,
} from "@/lib/tercih/types";

/**
 * Tercih robotu sorgu katmanı.
 *
 * Kapsam kararı (site sahibinin talebi): robot eşleşen programların TAMAMINI,
 * akademik kadro / akreditasyon / TUS-DUS sütunları dâhil döndürür. Bunun bilinen
 * bedeli, uç nokta herkese açık olduğu için veri setinin sistematik sorguyla
 * dışarı çıkarılabilmesidir; karar erişilebilirlik lehine bilerek verilmiştir.
 */

/** Kullanıcı üst sınır girmediğinde sıralamanın etrafında taranan pencere. */
const RANK_WINDOW_BELOW = 0.85;
const RANK_WINDOW_ABOVE = 1.25;

/**
 * Pencerenin taraması gereken en az sıralama genişliği.
 *
 * Yüzde tabanlı pencere küçük sıralamalarda neredeyse hiç açılmaz: 1. sıra için
 * aralık 1–2 çıkar ve en iyi program 38. sırada olduğu için hiçbir sonuç dönmez.
 */
const MIN_WINDOW_SPAN = 2500;

/**
 * Tek yanıtta dönebilecek en fazla satır. İş kuralı değil, koruma amaçlıdır:
 * en geniş sorgu bile yanıtı ve tarayıcıyı kilitlemesin.
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
  department: string;
  city: string;
  kind: string;
  rank: number;
  rank_2025: number | null;
  rank_2024: number | null;
  rank_2023: number | null;
  score: string | number | null;
  quota: number | null;
  quota_2025: number | null;
  quota_2024: number | null;
  quota_2023: number | null;
};

/**
 * Kullanıcının girdiği aralığı çözer.
 * Üst sınır boşsa alt sınırın etrafında otomatik pencere açılır.
 */
export function resolveWindow(rankFrom: number, rankTo: number | null) {
  if (rankTo !== null && rankTo >= rankFrom) {
    return { windowFrom: Math.max(1, rankFrom), windowTo: rankTo };
  }

  const windowFrom = Math.max(1, Math.floor(rankFrom * RANK_WINDOW_BELOW));
  const windowTo = Math.max(
    Math.ceil(rankFrom * RANK_WINDOW_ABOVE),
    windowFrom + MIN_WINDOW_SPAN,
  );
  return { windowFrom, windowTo };
}

/**
 * Verilen sıralama aralığındaki programların tamamını döndürür.
 * TYT önlisans, diğer puan türleri lisans programlarını kapsar.
 */
export async function queryRobot(
  scoreType: RobotScoreType,
  rankFrom: number,
  rankTo: number | null = null,
  filters: RobotFilters = EMPTY_FILTERS,
): Promise<RobotResult> {
  const sql = getSql();
  const level = scoreType === "TYT" ? "onlisans" : "lisans";
  const { windowFrom, windowTo } = resolveWindow(rankFrom, rankTo);

  /*
    Filtreler çoklu seçimdir. Boş dizi "filtre yok" demektir ve koşul tamamen
    atlanır; dolu dizi `= ANY(...)` ile karşılaştırılır. Sorgu metni sabit kalır,
    tüm değerler bağlı parametre olarak gider.

    Bölüm filtresi metin araması olduğu için diziyi `ILIKE ANY` ile kullanır;
    ifadelerden biri bile eşleşirse program listelenir.
  */
  const cities = filters.cities.length > 0 ? filters.cities : null;
  const kinds = filters.kinds.length > 0 ? filters.kinds : null;
  const departments =
    filters.departments.length > 0
      ? filters.departments.map((term) => `%${term}%`)
      : null;

  const summaryRows = (await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE kind = 'DEVLET')::int AS state_count,
      COUNT(*) FILTER (WHERE kind = 'VAKIF')::int AS foundation_count,
      COUNT(*) FILTER (WHERE kind IS DISTINCT FROM 'DEVLET' AND kind IS DISTINCT FROM 'VAKIF')::int AS other_count,
      COALESCE(SUM(quota), 0)::int AS quota_2026,
      COALESCE(SUM(quota_2025), 0)::int AS quota_2025,
      COALESCE(SUM(quota_2024), 0)::int AS quota_2024,
      COALESCE(SUM(quota_2023), 0)::int AS quota_2023,
      COUNT(quota)::int AS has_2026,
      COUNT(quota_2025)::int AS has_2025,
      COUNT(quota_2024)::int AS has_2024,
      COUNT(quota_2023)::int AS has_2023
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
      AND (${cities}::text[] IS NULL OR city = ANY(${cities}::text[]))
      AND (${kinds}::text[] IS NULL OR kind = ANY(${kinds}::text[]))
      AND (${departments}::text[] IS NULL OR department ILIKE ANY(${departments}::text[]))
  `) as Record<string, number>[];

  const cityRows = (await sql`
    SELECT city, COUNT(*)::int AS count
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
      AND (${cities}::text[] IS NULL OR city = ANY(${cities}::text[]))
      AND (${kinds}::text[] IS NULL OR kind = ANY(${kinds}::text[]))
      AND (${departments}::text[] IS NULL OR department ILIKE ANY(${departments}::text[]))
      AND city IS NOT NULL
    GROUP BY city
    ORDER BY count DESC
    LIMIT 4
  `) as { city: string; count: number }[];

  const programRows = (await sql`
    SELECT
      program_code, university, department, city, kind,
      rank, rank_2025, rank_2024, rank_2023,
      score, quota, quota_2025, quota_2024, quota_2023
    FROM tercih_programs
    WHERE level = ${level}
      AND score_type = ${scoreType}
      AND rank BETWEEN ${windowFrom} AND ${windowTo}
      AND (${cities}::text[] IS NULL OR city = ANY(${cities}::text[]))
      AND (${kinds}::text[] IS NULL OR kind = ANY(${kinds}::text[]))
      AND (${departments}::text[] IS NULL OR department ILIKE ANY(${departments}::text[]))
    ORDER BY rank ASC
    LIMIT ${MAX_ROWS}
  `) as ProgramRow[];

  const programs: Program[] = programRows.map((row) => ({
    programCode: row.program_code,
    university: row.university,
    department: row.department,
    city: row.city,
    kind: row.kind,
    rank: row.rank,
    rank2025: row.rank_2025,
    rank2024: row.rank_2024,
    rank2023: row.rank_2023,
    // NUMERIC sütunu sürücüden metin olarak gelebilir.
    score: row.score === null ? null : Number(row.score),
    quota: row.quota,
    quota2025: row.quota_2025,
    quota2024: row.quota_2024,
    quota2023: row.quota_2023,
  }));

  const summary = summaryRows[0];

  // Kontenjan trendi: her yıl için toplam ve o yıl verisi bulunan program sayısı.
  // Program sayısı gösterilir çünkü yıllar arası toplam farkı kısmen "o yıl veri
  // yok" durumundan kaynaklanır; bunu gizlemek yanıltıcı olur.
  const quotaTrend: QuotaTrendPoint[] = QUOTA_YEARS.map((year) => ({
    year,
    total: summary?.[`quota_${year}`] ?? 0,
    programCount: summary?.[`has_${year}`] ?? 0,
  }));

  return {
    totalMatches: summary?.total ?? 0,
    stateCount: summary?.state_count ?? 0,
    foundationCount: summary?.foundation_count ?? 0,
    otherCount: summary?.other_count ?? 0,
    topCities: cityRows,
    programs,
    quotaTrend,
    windowFrom,
    windowTo,
  };
}
