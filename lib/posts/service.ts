import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Panelden yazılan blog yazıları.
 *
 * Mevcut 13 yazı elle yazılmış React bileşenleridir: kontrol listeleri, SSS
 * şeması, iç bağlantılar. Onlara dokunulmaz — panele taşımak o zenginliği
 * kaybettirirdi. Panelden gelen yazılar ayrı bir kaynaktır ve liste sayfasında
 * kod tabanlı yazılarla birlikte, tarihe göre sıralanarak gösterilir.
 *
 * Görsel: şimdilik `public/images` altındaki mevcut görsellerden seçilir.
 * Yükleme için Vercel Blob gerekir; o kurulana kadar panel çalışır durumda
 * kalsın diye seçim yöntemi tercih edildi.
 */

export type ManagedPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  publishedAt: Date;
};

let client: ReturnType<typeof neon> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL tanımlı değil.");
  client ??= neon(databaseUrl);
  return client;
}

/**
 * Başlıktan adres üretir.
 *
 * Türkçe harfler ASCII karşılığına çevrilir; aksi hâlde adreste yüzde kodlaması
 * oluşur ve paylaşıldığında okunmaz hâle gelir.
 */
const TURKISH_MAP: Record<string, string> = {
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
  Ç: "c", Ğ: "g", İ: "i", I: "i", Ö: "o", Ş: "s", Ü: "u",
};

export function slugify(title: string): string {
  return title
    .split("")
    .map((char) => TURKISH_MAP[char] ?? char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Ortalama okuma hızı 200 kelime/dakika kabul edilir. */
export function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} dakika`;
}

type PostRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
  image: string;
  image_alt: string;
  reading_time: string;
  published_at: string | Date;
};

function toPost(row: PostRow): ManagedPost {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    body: row.body,
    image: row.image,
    imageAlt: row.image_alt,
    readingTime: row.reading_time,
    publishedAt: new Date(row.published_at),
  };
}

const COLUMNS =
  "id, slug, title, description, category, body, image, image_alt, reading_time, published_at";

/** Yayındaki panel yazıları. Hata durumunda boş dizi döner. */
export async function listManagedPosts(): Promise<ManagedPost[]> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_posts ORDER BY published_at DESC
    `) as PostRow[];
    return rows.map(toPost);
  } catch (error) {
    console.error("Panel yazıları okunamadı:", error);
    return [];
  }
}

export async function getManagedPost(slug: string): Promise<ManagedPost | null> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_posts WHERE slug = ${slug}
    `) as PostRow[];
    return rows.length > 0 ? toPost(rows[0]) : null;
  } catch (error) {
    console.error("Panel yazısı okunamadı:", error);
    return null;
  }
}

export async function createManagedPost(input: {
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
  image: string;
  imageAlt: string;
}): Promise<ManagedPost> {
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO managed_posts
      (slug, title, description, category, body, image, image_alt, reading_time)
    VALUES
      (${input.slug}, ${input.title}, ${input.description}, ${input.category},
       ${input.body}, ${input.image}, ${input.imageAlt},
       ${estimateReadingTime(input.body)})
    ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          body = EXCLUDED.body,
          image = EXCLUDED.image,
          image_alt = EXCLUDED.image_alt,
          reading_time = EXCLUDED.reading_time
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as PostRow[];

  return toPost(rows[0]);
}

export async function deleteManagedPost(id: number): Promise<boolean> {
  const sql = getClient();
  const rows = (await sql`
    DELETE FROM managed_posts WHERE id = ${id} RETURNING id
  `) as { id: number }[];
  return rows.length > 0;
}
