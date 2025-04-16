import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./migrations",
  schema: "./schemas/*.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.MYSQL_DATABASE_URL!,
  },
  verbose: true,
});
