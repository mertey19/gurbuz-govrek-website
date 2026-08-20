import "server-only";
import dataset from "@/data/tercih-programs-2026.json";
import {
  EMPTY_FILTERS,
  QUOTA_YEARS,
  type Program,
  type QuotaTrendPoint,
  type RobotFilters,
  type RobotResult,
  type RobotScoreType,
} from "@/lib/tercih/types";

/** Kullanıcı üst sınır girmediğinde sıralamanın etrafında taranan pencere. */
const RANK_WINDOW_BELOW = 0.85;
const RANK_WINDOW_ABOVE = 1.25;

/** Küçük sıralamalarda otomatik aralığın boş kalmasını önleyen alt genişlik. */
const MIN_WINDOW_SPAN = 2500;

/** Tek yanıtta dönebilecek en fazla satır. */
const MAX_ROWS = 8000;

/**
 * Sözlüklerle sıkıştırılmış yerel veri satırı.
 *
 * Metin alanları dosyada bir kez tutulur; satır bu sözlüklerin indekslerini
 * taşır. Bu yapı 18 binden fazla programı yaklaşık 1,5 MB'ta tutar.
 */
type LocalRow = [
  level: number,
  programCode: string,
  kind: number,
  city: number,
  university: number,
  department: number,
  scoreType: number,
  rank: number,
  score: number | null,
  quota: number | null,
  rank2025: number | null,
  rank2024: number | null,
  rank2023: number | null,
  quota2025: number | null,
  quota2024: number | null,
  quota2023: number | null,
];

const rows = dataset.rows as LocalRow[];

if (dataset.version !== 2026 || rows.length !== 18_251) {
  throw new Error("Tercih robotunun 2026 veri dosyası eksik veya geçersiz.");
}

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

function decodeProgram(row: LocalRow): Program {
  return {
    programCode: row[1],
    kind: dataset.kinds[row[2]],
    city: dataset.cities[row[3]],
    university: dataset.universities[row[4]],
    department: dataset.departments[row[5]],
    rank: row[7],
    score: row[8],
    quota: row[9],
    rank2025: row[10],
    rank2024: row[11],
    rank2023: row[12],
    quota2025: row[13],
    quota2024: row[14],
    quota2023: row[15],
  };
}

function quotaAt(row: LocalRow, year: number): number | null {
  if (year === 2026) return row[9];
  if (year === 2025) return row[13];
  if (year === 2024) return row[14];
  if (year === 2023) return row[15];
  return null;
}

/**
 * Verilen sıralama aralığındaki programların tamamını döndürür.
 *
 * Veri dağıtımla birlikte gelen doğrulanmış 2026 dosyasından okunur. Böylece
 * eksik ortam değişkeni ya da eski Neon şeması robot sorgusunu durduramaz.
 */
export async function queryRobot(
  scoreType: RobotScoreType,
  rankFrom: number,
  rankTo: number | null = null,
  filters: RobotFilters = EMPTY_FILTERS,
): Promise<RobotResult> {
  const level = scoreType === "TYT" ? 1 : 0;
  const scoreTypeIndex = dataset.scoreTypes.indexOf(scoreType);
  const { windowFrom, windowTo } = resolveWindow(rankFrom, rankTo);
  const cityFilter = new Set(filters.cities);
  const kindFilter = new Set(filters.kinds);
  const departmentTerms = filters.departments.map((term) =>
    term.toLocaleLowerCase("tr-TR"),
  );

  const matches = rows.filter((row) => {
    if (
      row[0] !== level ||
      row[6] !== scoreTypeIndex ||
      row[7] < windowFrom ||
      row[7] > windowTo
    ) {
      return false;
    }

    const city = dataset.cities[row[3]];
    if (cityFilter.size > 0 && !cityFilter.has(city)) return false;

    const kind = dataset.kinds[row[2]];
    if (kindFilter.size > 0 && !kindFilter.has(kind)) return false;

    if (departmentTerms.length > 0) {
      const department = dataset.departments[row[5]].toLocaleLowerCase("tr-TR");
      if (!departmentTerms.some((term) => department.includes(term))) return false;
    }

    return true;
  });

  matches.sort((left, right) => left[7] - right[7]);

  let stateCount = 0;
  let foundationCount = 0;
  const cityCounts = new Map<string, number>();

  for (const row of matches) {
    const kind = dataset.kinds[row[2]];
    if (kind === "DEVLET") stateCount += 1;
    if (kind === "VAKIF") foundationCount += 1;

    const city = dataset.cities[row[3]];
    cityCounts.set(city, (cityCounts.get(city) ?? 0) + 1);
  }

  const topCities = [...cityCounts]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "tr"))
    .slice(0, 4)
    .map(([city, count]) => ({ city, count }));

  const quotaTrend: QuotaTrendPoint[] = QUOTA_YEARS.map((year) => {
    let total = 0;
    let programCount = 0;

    for (const row of matches) {
      const quota = quotaAt(row, year);
      if (quota !== null) {
        total += quota;
        programCount += 1;
      }
    }

    return { year, total, programCount };
  });

  return {
    totalMatches: matches.length,
    stateCount,
    foundationCount,
    otherCount: matches.length - stateCount - foundationCount,
    topCities,
    programs: matches.slice(0, MAX_ROWS).map(decodeProgram),
    quotaTrend,
    windowFrom,
    windowTo,
  };
}
