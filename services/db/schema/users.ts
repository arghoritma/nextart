import { sql } from "drizzle-orm";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  password_hash: text("password_hash").notNull(),
  avatar: text("avatar"),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at"),
});
