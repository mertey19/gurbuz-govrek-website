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

export type Program = {
  programCode: string | null;
  university: string;
  faculty: string | null;
  department: string;
  city: string;
  kind: string;
  duration: number | null;
  rank: number;
  score: number | null;
  quota: number | null;
  /** Profesör sayısı. */
  prof: number | null;
  /** Doktor öğretim üyesi sayısı. */
  doctor: number | null;
  /** Toplam öğretim görevlisi sayısı. */
  lecturers: number | null;
  accredited: string | null;
  tus: string | null;
  dus: string | null;
  conditions: string | null;
};

export type RobotResult = {
  totalMatches: number;
  stateCount: number;
  foundationCount: number;
  /** KKTC ve yurt dışı programlar. Devlet + vakıf toplamı `totalMatches`'e eşit olmaz. */
  otherCount: number;
  topCities: { city: string; count: number }[];
  programs: Program[];
  windowFrom: number;
  windowTo: number;
};

export function isRobotScoreType(value: unknown): value is RobotScoreType {
  return typeof value === "string" && (SCORE_TYPES as readonly string[]).includes(value);
}
