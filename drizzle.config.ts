import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const DB_NAME = process.env.NODE_ENV === "development" ? process.env.DB_NAME : "prod";
export default defineConfig({
  out: "./migrations",
  schema: "./schemas/*.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${process.env.DATABASE_PATH}/${DB_NAME}.db`,
  },
  verbose: true,
});
