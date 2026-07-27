import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Yayımlanan dosyaların indirme sayacı.
 *
 * Sayaç Neon'da tutulur; Vercel Analytics'in özel olay desteği plana bağlı
 * olduğu için sayının kendisine sahip olmak tercih edildi.
 *
 * Sayaç yalnızca site üzerindeki `/indir/...` bağlantısından geçen istekleri
 * sayar. Dosyanın CDN adresini doğrudan açan biri sayaca yansımaz; sayı bu
 * yüzden alt sınırdır, kesin toplam değildir.
 */

export const DOWNLOAD_SLUGS = {
  tercihRobotuExcel: "tercih-robotu-excel",
} as const;

export type DownloadSlug = (typeof DOWNLOAD_SLUGS)[keyof typeof DOWNLOAD_SLUGS];

let client: ReturnType<typeof neon> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlı değil.");
  }

  client ??= neon(databaseUrl);
  return client;
}

/**
 * İndirmeyi kaydeder ve yeni toplamı döndürür.
 *
 * Satır yoksa oluşturulur; böylece ayrı bir başlangıç kaydı gerekmez.
 */
export async function recordDownload(slug: DownloadSlug): Promise<number> {
  const sql = getClient();

  const rows = (await sql`
    INSERT INTO download_counts (slug, total, updated_at)
    VALUES (${slug}, 1, now())
    ON CONFLICT (slug) DO UPDATE
      SET total = download_counts.total + 1,
          updated_at = now()
    RETURNING total
  `) as { total: string | number }[];

  return Number(rows[0]?.total ?? 0);
}

/**
 * Toplam indirme sayısını okur.
 *
 * Sayaç sayfanın çalışmasını engellememelidir: veritabanına ulaşılamazsa
 * `null` döner ve arayüz sayıyı hiç göstermez.
 */
export async function getDownloadCount(slug: DownloadSlug): Promise<number | null> {
  try {
    const sql = getClient();

    const rows = (await sql`
      SELECT total FROM download_counts WHERE slug = ${slug}
    `) as { total: string | number }[];

    return rows.length > 0 ? Number(rows[0].total) : 0;
  } catch (error) {
    console.error("İndirme sayısı okunamadı:", error);
    return null;
  }
}

/**
 * Toplam indirme ve son indirme zamanı.
 *
 * `getDownloadCount` gibi, veritabanına ulaşılamazsa `null` döner; istatistik
 * sayfası bu durumda sayı yerine açıklama gösterir.
 */
export async function getDownloadDetail(
  slug: DownloadSlug,
): Promise<{ total: number; updatedAt: Date | null } | null> {
  try {
    const sql = getClient();

    const rows = (await sql`
      SELECT total, updated_at FROM download_counts WHERE slug = ${slug}
    `) as { total: string | number; updated_at: string | Date }[];

    if (rows.length === 0) return { total: 0, updatedAt: null };

    return {
      total: Number(rows[0].total),
      updatedAt: new Date(rows[0].updated_at),
    };
  } catch (error) {
    console.error("İndirme ayrıntısı okunamadı:", error);
    return null;
  }
}
