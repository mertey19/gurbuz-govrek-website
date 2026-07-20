import type { AppointmentFormData } from "@/types";

export interface D1PreparedStatementLike {
  bind(...values: unknown[]): D1PreparedStatementLike;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<{ success: boolean; error?: string }>;
}

export interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
  batch(
    statements: D1PreparedStatementLike[],
  ): Promise<Array<{ success: boolean; error?: string }>>;
}

const createTableSql = `CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  service TEXT NOT NULL,
  meeting_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  notice_acknowledged_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
)`;

const createCreatedAtIndexSql =
  "CREATE INDEX IF NOT EXISTS appointments_created_at_idx ON appointments (created_at)";
const createContactIndexSql =
  "CREATE INDEX IF NOT EXISTS appointments_contact_idx ON appointments (email, phone)";

export async function ensureAppointmentSchema(
  db: D1DatabaseLike,
): Promise<void> {
  const results = await db.batch([
    db.prepare(createTableSql),
    db.prepare(createCreatedAtIndexSql),
    db.prepare(createContactIndexSql),
  ]);

  const failed = results.find((result) => !result.success);
  if (failed) {
    throw new Error(failed.error || "Randevu veritabanı hazırlanamadı.");
  }
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+90${digits.slice(1)}`;
  if (digits.startsWith("90")) return `+${digits}`;
  return `+90${digits}`;
}

export async function createAppointment(
  db: D1DatabaseLike,
  data: AppointmentFormData,
): Promise<{ duplicate: boolean; id?: string }> {
  await ensureAppointmentSchema(db);

  const email = data.email.trim().toLowerCase();
  const phone = normalizePhone(data.phone);
  const now = Date.now();
  const recent = await db
    .prepare(
      "SELECT id FROM appointments WHERE (email = ? OR phone = ?) AND created_at >= ? LIMIT 1",
    )
    .bind(email, phone, now - 60_000)
    .first<{ id: string }>();

  if (recent) return { duplicate: true, id: recent.id };

  const id = crypto.randomUUID();
  const result = await db
    .prepare(
      `INSERT INTO appointments (
        id, full_name, phone, email, grade_level, service,
        meeting_type, message, status, notice_acknowledged_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
    )
    .bind(
      id,
      data.fullName.trim(),
      phone,
      email,
      data.gradeLevel,
      data.service,
      data.meetingType,
      data.message.trim(),
      now,
      now,
    )
    .run();

  if (!result.success) {
    throw new Error(result.error || "Randevu talebi kaydedilemedi.");
  }

  return { duplicate: false, id };
}
