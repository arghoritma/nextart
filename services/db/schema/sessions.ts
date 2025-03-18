import { sql } from "drizzle-orm";
import { varchar, mysqlTable, timestamp, tinyint } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  token: varchar("token", { length: 255 }).notNull(),
  device: varchar("device", { length: 255 }),
  ip_address: varchar("ip_address", { length: 45 }),
  user_agent: varchar("user_agent", { length: 255 }),
  is_active: tinyint("is_active").default(1),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  last_accessed: timestamp("last_accessed")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expires_at: timestamp("expires_at").notNull(),
});