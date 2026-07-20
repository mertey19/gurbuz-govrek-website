import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const appointments = sqliteTable(
  "appointments",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    gradeLevel: text("grade_level").notNull(),
    service: text("service").notNull(),
    meetingType: text("meeting_type").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    noticeAcknowledgedAt: integer("notice_acknowledged_at").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("appointments_created_at_idx").on(table.createdAt),
    index("appointments_contact_idx").on(table.email, table.phone),
  ],
);
