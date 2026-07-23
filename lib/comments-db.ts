import { neon } from "@neondatabase/serverless";
import type {
  AdminComment,
  CommentRole,
  CommentStatus,
  PublicComment,
} from "@/lib/comment-types";

type CommentRow = {
  id: string;
  name: string;
  role: CommentRole;
  body: string;
  status: CommentStatus;
  created_at: string | Date;
  approved_at: string | Date | null;
};

let client: ReturnType<typeof neon> | undefined;
let schemaPromise: Promise<void> | undefined;

export class CommentsDatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL ortam değişkeni ayarlanmamış.");
    this.name = "CommentsDatabaseNotConfiguredError";
  }
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new CommentsDatabaseNotConfiguredError();
  }

  client ??= neon(databaseUrl);
  return client;
}

export async function ensureCommentsSchema() {
  if (schemaPromise) return schemaPromise;

  schemaPromise = (async () => {
    const sql = getSql();

    await sql`
      CREATE TABLE IF NOT EXISTS website_comments (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        role VARCHAR(24) NOT NULL
          CHECK (role IN ('Öğrenci', 'Veli', 'Mezun', 'Diğer')),
        body VARCHAR(700) NOT NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'approved', 'rejected')),
        submitter_hash CHAR(64),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        approved_at TIMESTAMPTZ
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS website_comments_public_idx
      ON website_comments (status, approved_at DESC, created_at DESC)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS website_comments_rate_limit_idx
      ON website_comments (submitter_hash, created_at DESC)
    `;
  })().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });

  return schemaPromise;
}

function iso(value: string | Date) {
  return new Date(value).toISOString();
}

function toPublicComment(row: CommentRow): PublicComment {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    body: row.body,
    createdAt: iso(row.created_at),
  };
}

function toAdminComment(row: CommentRow): AdminComment {
  return {
    ...toPublicComment(row),
    status: row.status,
    approvedAt: row.approved_at ? iso(row.approved_at) : null,
  };
}

export async function listApprovedComments(limit = 12) {
  await ensureCommentsSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT
      id::text,
      name,
      role,
      body,
      status,
      created_at,
      approved_at
    FROM website_comments
    WHERE status = 'approved'
    ORDER BY approved_at DESC NULLS LAST, created_at DESC
    LIMIT ${limit}
  `) as CommentRow[];

  return rows.map(toPublicComment);
}

export async function createPendingComment(input: {
  name: string;
  role: CommentRole;
  body: string;
  submitterHash: string;
}) {
  await ensureCommentsSchema();
  const sql = getSql();

  const rateRows = (await sql`
    SELECT COUNT(*)::int AS count
    FROM website_comments
    WHERE submitter_hash = ${input.submitterHash}
      AND created_at > NOW() - INTERVAL '1 hour'
  `) as { count: number | string }[];

  if (Number(rateRows[0]?.count ?? 0) >= 3) {
    return { ok: false as const, reason: "rate-limit" as const };
  }

  const duplicateRows = (await sql`
    SELECT id
    FROM website_comments
    WHERE submitter_hash = ${input.submitterHash}
      AND body = ${input.body}
      AND created_at > NOW() - INTERVAL '24 hours'
    LIMIT 1
  `) as { id: string }[];

  if (duplicateRows.length > 0) {
    return { ok: false as const, reason: "duplicate" as const };
  }

  const rows = (await sql`
    INSERT INTO website_comments (name, role, body, submitter_hash)
    VALUES (${input.name}, ${input.role}, ${input.body}, ${input.submitterHash})
    RETURNING id::text
  `) as { id: string }[];

  return { ok: true as const, id: rows[0].id };
}

export async function listCommentsForAdmin() {
  await ensureCommentsSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT
      id::text,
      name,
      role,
      body,
      status,
      created_at,
      approved_at
    FROM website_comments
    ORDER BY
      CASE status
        WHEN 'pending' THEN 0
        WHEN 'approved' THEN 1
        ELSE 2
      END,
      created_at DESC
    LIMIT 200
  `) as CommentRow[];

  return rows.map(toAdminComment);
}

export async function updateCommentStatus(id: string, status: CommentStatus) {
  await ensureCommentsSchema();
  const sql = getSql();
  const rows = (await sql`
    UPDATE website_comments
    SET
      status = ${status},
      approved_at = CASE
        WHEN ${status} = 'approved' THEN COALESCE(approved_at, NOW())
        ELSE NULL
      END
    WHERE id = ${id}
    RETURNING id::text
  `) as { id: string }[];

  return rows.length > 0;
}

export async function deleteComment(id: string) {
  await ensureCommentsSchema();
  const sql = getSql();
  const rows = (await sql`
    DELETE FROM website_comments
    WHERE id = ${id}
    RETURNING id::text
  `) as { id: string }[];

  return rows.length > 0;
}

