import { sql } from "drizzle-orm";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const files = pgTable("files", {
  id: text("id").primaryKey(),
  file_name: text("file_name").notNull(),
  file_url: text("file_url").notNull(),
  uploaded_by: text("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploaded_at: timestamp("uploaded_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
