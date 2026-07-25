/**
 * Tercih robotunun istemci ve sunucu tarafında ortak kullanılan tip ve sabitleri.
 *
 * Bu dosya bilinçli olarak `server-only` DEĞİLDİR ve veritabanına dokunmaz; sorgu
 * mantığı `robot-service.ts` içindedir ve yalnızca sunucuda çalışır.
 */
export const SCORE_TYPES = ["SAY", "EA", "SÖZ", "DİL", "TYT"] as const;
export type RobotScoreType = (typeof SCORE_TYPES)[number];

/** Ücretsiz gösterimde döndürülen en fazla program sayısı. */
export const SAMPLE_LIMIT = 5;

export type ProgramSample = {
  university: string;
  department: string;
  city: string;
  kind: string;
  rank: number;
};

export type RobotResult = {
  totalMatches: number;
  stateCount: number;
  foundationCount: number;
  /** KKTC ve yurt dışı programlar. Devlet + vakıf toplamı `totalMatches`'e eşit olmaz. */
  otherCount: number;
  topCities: { city: string; count: number }[];
  samples: ProgramSample[];
  windowFrom: number;
  windowTo: number;
};

export function isRobotScoreType(value: unknown): value is RobotScoreType {
  return typeof value === "string" && (SCORE_TYPES as readonly string[]).includes(value);
}
