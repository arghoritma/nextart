import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "@/schemas/users";
import { sessions } from "@/schemas/sessions";
import { files } from "@/schemas/files";

const pool = mysql.createPool({
  uri: process.env.MYSQL_DATABASE_URL!,
});

export const db = drizzle(pool, {
  mode: "default",
  schema: { users, sessions, files },
});
// Eksport skema
export * from "@/schemas/users";
export * from "@/schemas/sessions";
export * from "@/schemas/files";
