import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./services/db/migrations",
  schema: "./services/db/schema/*.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
});
