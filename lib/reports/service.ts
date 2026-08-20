import "server-only";
import { neon } from "@neondatabase/serverless";
import type { SiteReport } from "@/data/reports";

export type ManagedReport = SiteReport & {
  id: number;
  createdAt: Date;
};

let client: ReturnType<typeof neon> | undefined;
let schemaPromise: Promise<void> | undefined;

function getClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL tanımlı değil.");
  client ??= neon(databaseUrl);
  return client;
}

async function ensureSchema() {
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    const sql = getClient();
    await sql`
      CREATE TABLE IF NOT EXISTS managed_reports (
        id BIGSERIAL PRIMARY KEY,
        slug VARCHAR(90) UNIQUE NOT NULL,
        title VARCHAR(180) NOT NULL,
        description VARCHAR(500) NOT NULL,
        publisher VARCHAR(160) NOT NULL,
        pages INTEGER NOT NULL CHECK (pages > 0),
        size_label VARCHAR(30) NOT NULL,
        file_url TEXT NOT NULL,
        intro TEXT NOT NULL,
        highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });
  return schemaPromise;
}

type ReportRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  publisher: string;
  pages: number;
  size_label: string;
  file_url: string;
  intro: string;
  highlights: SiteReport["highlights"] | string;
  created_at: string | Date;
};

const COLUMNS =
  "id, slug, title, description, publisher, pages, size_label, file_url, intro, highlights, created_at";

function toReport(row: ReportRow): ManagedReport {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    description: row.description,
    publisher: row.publisher,
    ownWork: false,
    pages: Number(row.pages),
    sizeLabel: row.size_label,
    file: row.file_url,
    intro: row.intro,
    highlights: typeof row.highlights === "string" ? JSON.parse(row.highlights) : row.highlights,
    createdAt: new Date(row.created_at),
  };
}

export async function listManagedReports(): Promise<ManagedReport[]> {
  try {
    await ensureSchema();
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_reports ORDER BY created_at DESC
    `) as ReportRow[];
    return rows.map(toReport);
  } catch (error) {
    console.error("Panel raporları okunamadı:", error);
    return [];
  }
}

export async function getManagedReport(slug: string): Promise<ManagedReport | null> {
  try {
    await ensureSchema();
    const sql = getClient();
    const rows = (await sql`
      SELECT ${sql.unsafe(COLUMNS)} FROM managed_reports WHERE slug = ${slug}
    `) as ReportRow[];
    return rows[0] ? toReport(rows[0]) : null;
  } catch (error) {
    console.error("Panel raporu okunamadı:", error);
    return null;
  }
}

export async function createManagedReport(input: Omit<SiteReport, "ownWork" | "externalUrl" | "externalNote">): Promise<ManagedReport> {
  await ensureSchema();
  const sql = getClient();
  const rows = (await sql`
    INSERT INTO managed_reports
      (slug, title, description, publisher, pages, size_label, file_url, intro, highlights)
    VALUES
      (${input.slug}, ${input.title}, ${input.description}, ${input.publisher},
       ${input.pages}, ${input.sizeLabel}, ${input.file ?? ""}, ${input.intro},
       ${JSON.stringify(input.highlights)}::jsonb)
    ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          publisher = EXCLUDED.publisher,
          pages = EXCLUDED.pages,
          size_label = EXCLUDED.size_label,
          file_url = EXCLUDED.file_url,
          intro = EXCLUDED.intro,
          highlights = EXCLUDED.highlights
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as ReportRow[];
  return toReport(rows[0]);
}

export async function deleteManagedReport(id: number): Promise<boolean> {
  await ensureSchema();
  const sql = getClient();
  const rows = (await sql`DELETE FROM managed_reports WHERE id = ${id} RETURNING id`) as { id: number }[];
  return rows.length > 0;
}
