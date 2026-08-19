import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Tercih videoları.
 *
 * Videolar YouTube veya Instagram'da barındırılır; burada yalnızca kaynak
 * kimliği ve açıklama tutulur.
 * Video dosyasını sitede barındırmak bant genişliği, farklı çözünürlük üretimi
 * ve mobil oynatma sorunlarını beraberinde getirirdi.
 */

export type SiteVideo = {
  id: number;
  provider: "youtube" | "instagram";
  videoId: string;
  instagramType: "p" | "reel" | "tv" | null;
  title: string;
  description: string;
  category: string;
  sortOrder: number;
  createdAt: Date;
};

export const VIDEO_CATEGORIES = [
  { value: "tercih", label: "Tercih Rehberi" },
  { value: "meslek", label: "Meslek Tanıtımı" },
  { value: "universite", label: "Üniversite Tanıtımı" },
  { value: "matematik", label: "Matematik" },
] as const;

let client: ReturnType<typeof neon> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL tanımlı değil.");
  client ??= neon(databaseUrl);
  return client;
}

/**
 * Yapıştırılan adresten YouTube kimliğini çıkarır.
 *
 * Panele tam adres yapıştırılması beklenir; kimliği elle ayıklamak zorunda
 * kalmamak için watch, youtu.be, embed ve shorts biçimleri de kabul edilir.
 * Tanınmayan bir değer için `null` döner — hatalı kimlik boş bir oynatıcı
 * üretirdi.
 */
export function extractYoutubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  // Çıplak kimlik: 11 karakter, YouTube'un kullandığı alfabe.
  if (/^[\w-]{11}$/.test(value)) return value;

  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
    /\/live\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export type VideoSource =
  | { provider: "youtube"; videoId: string; storageKey: string; instagramType: null }
  | {
      provider: "instagram";
      videoId: string;
      storageKey: string;
      instagramType: "p" | "reel" | "tv";
    };

/** Instagram gönderi, Reels ve eski IGTV bağlantılarını güvenli kimliğe çevirir. */
export function extractInstagramSource(input: string): VideoSource | null {
  const value = input.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== "instagram.com") return null;

  const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([\w-]+)/i);
  if (!match) return null;

  const instagramType = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
  if (instagramType !== "p" && instagramType !== "reel" && instagramType !== "tv") {
    return null;
  }

  const videoId = match[2];
  return {
    provider: "instagram",
    videoId,
    instagramType,
    storageKey: `instagram:${instagramType}:${videoId}`,
  };
}

/** Yönetim paneline yapıştırılan YouTube veya Instagram adresini ayrıştırır. */
export function extractVideoSource(input: string): VideoSource | null {
  const youtubeId = extractYoutubeId(input);
  if (youtubeId) {
    return {
      provider: "youtube",
      videoId: youtubeId,
      storageKey: youtubeId,
      instagramType: null,
    };
  }
  return extractInstagramSource(input);
}

type VideoRow = {
  id: number;
  youtube_id: string;
  title: string;
  description: string;
  category: string;
  sort_order: number;
  created_at: string | Date;
};

function toVideo(row: VideoRow): SiteVideo {
  const instagram = row.youtube_id.match(/^instagram:(p|reel|tv):([\w-]+)$/);
  return {
    id: Number(row.id),
    provider: instagram ? "instagram" : "youtube",
    videoId: instagram?.[2] ?? row.youtube_id,
    instagramType: (instagram?.[1] as "p" | "reel" | "tv" | undefined) ?? null,
    title: row.title,
    description: row.description,
    category: row.category,
    sortOrder: Number(row.sort_order),
    createdAt: new Date(row.created_at),
  };
}

/**
 * Yayındaki videolar. Veritabanına ulaşılamazsa boş dizi döner; video listesi
 * sayfanın geri kalanını engellememelidir.
 */
export async function listVideos(category?: string): Promise<SiteVideo[]> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT id, youtube_id, title, description, category, sort_order, created_at
      FROM videos
      WHERE (${category ?? null}::text IS NULL OR category = ${category ?? null})
      ORDER BY sort_order ASC, created_at DESC
    `) as VideoRow[];

    return rows.map(toVideo);
  } catch (error) {
    console.error("Videolar okunamadı:", error);
    return [];
  }
}

export async function createVideo(input: {
  sourceKey: string;
  title: string;
  description: string;
  category: string;
}): Promise<SiteVideo> {
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO videos (youtube_id, title, description, category)
    VALUES (${input.sourceKey}, ${input.title}, ${input.description}, ${input.category})
    ON CONFLICT (youtube_id) DO UPDATE
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          category = EXCLUDED.category
    RETURNING id, youtube_id, title, description, category, sort_order, created_at
  `) as VideoRow[];

  return toVideo(rows[0]);
}

export async function deleteVideo(id: number): Promise<boolean> {
  const sql = getClient();
  const rows = (await sql`DELETE FROM videos WHERE id = ${id} RETURNING id`) as {
    id: number;
  }[];
  return rows.length > 0;
}
