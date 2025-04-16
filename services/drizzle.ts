import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { users } from "@/schemas/users";
import { sessions } from "@/schemas/sessions";
import { files } from "@/schemas/files";

const path_db = process.env.DATABASE_PATH!;
const sqlite = new Database(`${path_db}/${process.env.NODE_ENV}.db`);
export const db = drizzle(sqlite, { schema: { users, sessions, files } });

// Eksport skema
export * from "@/schemas/users";
export * from "@/schemas/sessions";
export * from "@/schemas/files";
