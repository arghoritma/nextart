import { sql } from "drizzle-orm";
import { varchar, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const files = mysqlTable("files", {
  id: varchar("id", { length: 255 }).primaryKey(),
  file_name: varchar("file_name", { length: 255 }).notNull(),
  file_url: varchar("file_url", { length: 255 }).notNull(),
  uploaded_by: varchar("uploaded_by", { length: 255 })
    .notNull()
    .references(() => users.id),
  uploaded_at: timestamp("uploaded_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
