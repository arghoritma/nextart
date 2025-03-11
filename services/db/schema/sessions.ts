import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token").notNull(),
  device: text("device"),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  is_active: integer("is_active").default(1),
  created_at: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  last_accessed: integer("last_accessed", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expires_at: integer("expires_at", { mode: "timestamp" }).notNull(),
});
