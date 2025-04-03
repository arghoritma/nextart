import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { files } from "./schema/files";

const pool = mysql.createPool({
  uri: process.env.MYSQL_DATABASE_URL!,
});

export const db = drizzle(pool, {
  mode: "default",
  schema: { users, sessions, files },
});
// Eksport skema
export * from "./schema/users";
export * from "./schema/sessions";
export * from "./schema/files";
