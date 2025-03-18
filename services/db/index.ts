import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { users } from "./schema/users";
import { sessions } from "./schema/sessions";
import { files } from "./schema/files";

export const db = drizzle(process.env.DATABASE_URL!, {
  mode: "default",
  schema: { users, sessions, files },
});

export * from "./schema/users";
export * from "./schema/sessions";
export * from "./schema/files";
