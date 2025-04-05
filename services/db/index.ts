import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { files } from "./schema/files";

const path_db = process.env.DATABASE_PATH!;
const sqlite = new Database(`${path_db}/${process.env.NODE_ENV}.db`);
export const db = drizzle(sqlite, { schema: { users, sessions, files } });

// Eksport skema
export * from "./schema/users";
export * from "./schema/sessions";
export * from "./schema/files";
