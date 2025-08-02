import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { users } from "@/schemas/users";
import { sessions } from "@/schemas/sessions";
import { files } from "@/schemas/files";
import "dotenv/config";

const DB_NAME = process.env.NODE_ENV === "development" ? process.env.DB_NAME : "prod";
const path_db = process.env.DATABASE_PATH!;
const sqlite = new Database(`${path_db}/${DB_NAME}.db`);
export const db = drizzle(sqlite, { schema: { users, sessions, files } });

// Eksport skema
export * from "@/schemas/users";
export * from "@/schemas/sessions";
export * from "@/schemas/files";
