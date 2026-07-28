import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Panelden yazılan meslek tanıtımları.
 *
 * `public/resources/meslek-tanitim` altındaki 115 dosya İŞKUR'a aittir ve
 * kategori sayfalarından kaynak gösterilerek sunulur; panelden yönetilmez.
 * Buradakiler site sahibinin kendi yazdığı içeriklerdir ve o dosyaların
 * yanında, ayrı bir bölüm olarak gösterilir.
 */

/** Meslek tanıtımının bağlandığı puan türü; kategori sayfalarının slug'ları. */
export const PROFESSION_CATEGORIES = [
  { value: "sayisal", label: "Sayısal (SAY)" },
  { value: "esit-agirlik", label: "Eşit Ağırlık (EA)" },
  { value: "sozel", label: "Sözel (SÖZ)" },
  { value: "dil", label: "Dil (DİL)" },
  { value: "tyt", label: "TYT" },
] as const;

export type ManagedProfession = {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  image: string;
  imageAlt: string;
  createdAt: Date;
};

let client: ReturnType<typeof neon> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL tanımlı değil.");
  client ??= neon(databaseUrl);
  return client;
}

type Row = {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  image: string;
  image_alt: string;
  created_at: string | Date;
};

function toProfession(row: Row): ManagedProfession {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    body: row.body,
    image: row.image,
    imageAlt: row.image_alt,
    createdAt: new Date(row.created_at),
  };
}

const COLUMNS = "id, slug, title, category, summary, body, image, image_alt, created_at";

/** Yayındaki meslek tanıtımları. Hata durumunda boş dizi döner. */
export async function listManagedProfessions(category?: string): Promise<ManagedProfession[]> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_professions
      WHERE (${category ?? null}::text IS NULL OR category = ${category ?? null})
      ORDER BY title ASC
    `) as Row[];
    return rows.map(toProfession);
  } catch (error) {
    console.error("Meslek tanıtımları okunamadı:", error);
    return [];
  }
}

export async function getManagedProfession(slug: string): Promise<ManagedProfession | null> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_professions WHERE slug = ${slug}
    `) as Row[];
    return rows.length > 0 ? toProfession(rows[0]) : null;
  } catch (error) {
    console.error("Meslek tanıtımı okunamadı:", error);
    return null;
  }
}

export async function createManagedProfession(input: {
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  image: string;
  imageAlt: string;
}): Promise<ManagedProfession> {
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO managed_professions (slug, title, category, summary, body, image, image_alt)
    VALUES (${input.slug}, ${input.title}, ${input.category}, ${input.summary},
            ${input.body}, ${input.image}, ${input.imageAlt})
    ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          category = EXCLUDED.category,
          summary = EXCLUDED.summary,
          body = EXCLUDED.body,
          image = EXCLUDED.image,
          image_alt = EXCLUDED.image_alt
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as Row[];

  return toProfession(rows[0]);
}

export async function deleteManagedProfession(id: number): Promise<boolean> {
  const sql = getClient();
  const rows = (await sql`
    DELETE FROM managed_professions WHERE id = ${id} RETURNING id
  `) as { id: number }[];
  return rows.length > 0;
}
