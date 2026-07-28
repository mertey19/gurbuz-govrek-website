import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Tercih videoları.
 *
 * Videolar YouTube'da barındırılır; burada yalnızca kimlik ve açıklama tutulur.
 * Video dosyasını sitede barındırmak bant genişliği, farklı çözünürlük üretimi
 * ve mobil oynatma sorunlarını beraberinde getirirdi.
 */

export type SiteVideo = {
  id: number;
  youtubeId: string;
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
  return {
    id: Number(row.id),
    youtubeId: row.youtube_id,
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
  youtubeId: string;
  title: string;
  description: string;
  category: string;
}): Promise<SiteVideo> {
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO videos (youtube_id, title, description, category)
    VALUES (${input.youtubeId}, ${input.title}, ${input.description}, ${input.category})
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
