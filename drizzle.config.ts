import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./services/db/migrations",
  schema: "./services/db/schema/*.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
});