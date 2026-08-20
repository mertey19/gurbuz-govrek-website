import "server-only";
import { neon } from "@neondatabase/serverless";
import { managedContentDefaults } from "@/data/managedContentDefaults";
import type {
  ManagedSiteContent,
  ManagedSiteContentKey,
} from "@/lib/site-content/types";

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
      CREATE TABLE IF NOT EXISTS managed_site_content (
        section_key VARCHAR(40) PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });

  return schemaPromise;
}

type ContentRow = {
  section_key: ManagedSiteContentKey;
  content: unknown;
};

export async function getManagedSiteContent(): Promise<ManagedSiteContent> {
  try {
    await ensureSchema();
    const sql = getClient();
    const rows = (await sql`
      SELECT section_key, content
      FROM managed_site_content
      WHERE section_key IN ('announcement', 'faq', 'events')
    `) as ContentRow[];

    const content: ManagedSiteContent = structuredClone(managedContentDefaults);
    for (const row of rows) {
      if (row.section_key in content) {
        // İçerik API'de doğrulandığı için burada saklanan biçim güvenle kullanılır.
        content[row.section_key] = row.content as never;
      }
    }
    return content;
  } catch (error) {
    console.error("Yönetilebilir site içerikleri okunamadı:", error);
    return structuredClone(managedContentDefaults);
  }
}

export async function saveManagedSiteContent<K extends ManagedSiteContentKey>(
  key: K,
  content: ManagedSiteContent[K],
): Promise<void> {
  await ensureSchema();
  const sql = getClient();
  await sql`
    INSERT INTO managed_site_content (section_key, content)
    VALUES (${key}, ${JSON.stringify(content)}::jsonb)
    ON CONFLICT (section_key) DO UPDATE
      SET content = EXCLUDED.content,
          updated_at = NOW()
  `;
}
