import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./services/db/migrations",
  schema: "./services/db/schema/*.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${process.env.DATABASE_PATH}/${process.env.NODE_ENV}.db`,
  },
  verbose: true,
});
