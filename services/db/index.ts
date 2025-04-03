import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { files } from "./schema/files";

const pool = new Pool({
  connectionString: process.env.PG_DATABASE_URL!,
});

export const db = drizzle(pool, { schema: { users, sessions, files } });

// Eksport skema
export * from "./schema/users";
export * from "./schema/sessions";
export * from "./schema/files";
