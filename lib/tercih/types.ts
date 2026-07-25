/**
 * Tercih robotunun istemci ve sunucu tarafında ortak kullanılan tip ve sabitleri.
 *
 * Bu dosya bilinçli olarak `server-only` DEĞİLDİR ve veritabanına dokunmaz; sorgu
 * mantığı `robot-service.ts` içindedir ve yalnızca sunucuda çalışır.
 */
export const SCORE_TYPES = ["SAY", "EA", "SÖZ", "DİL", "TYT"] as const;
export type RobotScoreType = (typeof SCORE_TYPES)[number];

/**
 * Arayüzde ilk anda basılan satır sayısı. Veri sınırı DEĞİLDİR — eşleşen programların
 * tamamı yanıtta gelir, bu yalnızca DOM'u şişirmemek için kademeli gösterim eşiğidir.
 */
export const RENDER_BATCH_SIZE = 50;

/** Kurum türü seçenekleri. Hiçbiri seçilmezse tümü döner. */
export const INSTITUTION_KINDS = [
  { value: "DEVLET", label: "Devlet" },
  { value: "VAKIF", label: "Vakıf" },
  { value: "KIBRIS", label: "KKTC" },
  { value: "Y.DIŞI", label: "Yurt dışı" },
] as const;

/** Tabloda gösterilen geçmiş yıllar. Veri eksikse hücre boş kalır. */
export const RANK_YEARS = [2025, 2024, 2023, 2022] as const;
export const QUOTA_YEARS = [2026, 2025, 2024, 2023] as const;

export type Program = {
  programCode: string | null;
  university: string;
  faculty: string | null;
  department: string;
  city: string;
  kind: string;
  duration: number | null;
  /** 2025 yerleşme sırası. */
  rank: number;
  rank2024: number | null;
  rank2023: number | null;
  rank2022: number | null;
  score: number | null;
  /** 2026 kontenjanı. */
  quota: number | null;
  quota2025: number | null;
  quota2024: number | null;
  quota2023: number | null;
  prof: number | null;
  doctor: number | null;
  lecturers: number | null;
  accredited: string | null;
  tus: string | null;
  dus: string | null;
  conditions: string | null;
};

/** Boş dizi "filtre yok" anlamına gelir. */
export type RobotFilters = {
  cities: string[];
  kinds: string[];
  /** Bölüm adında aranan ifadeler; biri bile eşleşirse program listelenir. */
  departments: string[];
};

export const EMPTY_FILTERS: RobotFilters = { cities: [], kinds: [], departments: [] };

/** Seçilen programların yıllara göre toplam kontenjanı. */
export type QuotaTrendPoint = { year: number; total: number; programCount: number };

export type RobotResult = {
  totalMatches: number;
  stateCount: number;
  foundationCount: number;
  /** KKTC ve yurt dışı programlar. Devlet + vakıf toplamı `totalMatches`'e eşit olmaz. */
  otherCount: number;
  topCities: { city: string; count: number }[];
  programs: Program[];
  quotaTrend: QuotaTrendPoint[];
  windowFrom: number;
  windowTo: number;
};

export function isRobotScoreType(value: unknown): value is RobotScoreType {
  return typeof value === "string" && (SCORE_TYPES as readonly string[]).includes(value);
}

/** Sıralamayı bir programın ilgili yılına göre okur. */
export function rankForYear(program: Program, year: number): number | null {
  if (year === 2025) return program.rank;
  if (year === 2024) return program.rank2024;
  if (year === 2023) return program.rank2023;
  if (year === 2022) return program.rank2022;
  return null;
}

export function quotaForYear(program: Program, year: number): number | null {
  if (year === 2026) return program.quota;
  if (year === 2025) return program.quota2025;
  if (year === 2024) return program.quota2024;
  if (year === 2023) return program.quota2023;
  return null;
}
