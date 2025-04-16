import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "@/schemas/users";
import { sessions } from "@/schemas/sessions";
import { files } from "@/schemas/files";

const pool = new Pool({
  connectionString: process.env.PG_DATABASE_URL!,
});

export const db = drizzle(pool, { schema: { users, sessions, files } });

// Eksport skema
export * from "@/schemas/users";
export * from "@/schemas/sessions";
export * from "@/schemas/files";
