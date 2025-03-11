import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { files } from "./schema/files";

// Koneksi ke Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema: { users, sessions, files } });

// Eksport skema
export * from "./schema/users";
export * from "./schema/sessions";
export * from "./schema/files";
