import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Panelden eklenen sunum serileri.
 *
 * Koddaki 29 seri `data/presentationCollections.ts` içinde kalır; görselleri
 * depoda duruyor ve küçük resimleri üretilmiş durumda. Panelden gelenler ayrı
 * bir kaynaktır; sunum köşesi ikisini birleştirerek gösterir.
 *
 * Slaytlar ayrı tablo yerine JSONB dizisi olarak tutuluyor. Bir seride en fazla
 * birkaç düzine slayt oluyor; sıralamayı değiştirmek diziyi baştan yazmak
 * demek ve bu ölçekte ayrı tablo + birleştirme sorgusundan daha yalın.
 */

export type ManagedSlide = {
  url: string;
  alt: string;
  title: string;
};

export type ManagedCollection = {
  id: number;
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  slides: ManagedSlide[];
  createdAt: Date;
};

let client: ReturnType<typeof neon> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL tanımlı değil.");
  client ??= neon(databaseUrl);
  return client;
}

type CollectionRow = {
  id: number;
  slug: string;
  label: string;
  short_label: string;
  description: string;
  slides: ManagedSlide[] | string;
  created_at: string | Date;
};

function toCollection(row: CollectionRow): ManagedCollection {
  return {
    id: Number(row.id),
    slug: row.slug,
    label: row.label,
    shortLabel: row.short_label,
    description: row.description,
    // Sürücü JSONB'yi çözümlenmiş döndürüyor; metin gelirse de tolere edilir.
    slides: typeof row.slides === "string" ? JSON.parse(row.slides) : row.slides,
    createdAt: new Date(row.created_at),
  };
}

const COLUMNS = "id, slug, label, short_label, description, slides, created_at";

/** Yayındaki panel serileri. Hata durumunda boş dizi döner. */
export async function listManagedCollections(): Promise<ManagedCollection[]> {
  try {
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_collections
      ORDER BY created_at DESC
    `) as CollectionRow[];
    return rows.map(toCollection);
  } catch (error) {
    console.error("Panel serileri okunamadı:", error);
    return [];
  }
}

export async function createManagedCollection(input: {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  slides: ManagedSlide[];
}): Promise<ManagedCollection> {
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO managed_collections (slug, label, short_label, description, slides)
    VALUES (${input.slug}, ${input.label}, ${input.shortLabel}, ${input.description},
            ${JSON.stringify(input.slides)}::jsonb)
    ON CONFLICT (slug) DO UPDATE
      SET label = EXCLUDED.label,
          short_label = EXCLUDED.short_label,
          description = EXCLUDED.description,
          slides = EXCLUDED.slides
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as CollectionRow[];

  return toCollection(rows[0]);
}

export async function deleteManagedCollection(id: number): Promise<boolean> {
  const sql = getClient();
  const rows = (await sql`
    DELETE FROM managed_collections WHERE id = ${id} RETURNING id
  `) as { id: number }[];
  return rows.length > 0;
}
