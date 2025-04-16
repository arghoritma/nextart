import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  file_name: text("file_name").notNull(),
  file_url: text("file_url").notNull(),
  uploaded_by: text("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploaded_at: integer("uploaded_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
