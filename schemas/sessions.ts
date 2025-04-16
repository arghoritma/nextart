import { sql } from "drizzle-orm";
import { text, timestamp, pgTable, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token").notNull(),
  device: text("device"),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  last_accessed: timestamp("last_accessed")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expires_at: timestamp("expires_at").notNull(),
});
