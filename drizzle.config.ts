import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*",
  out: "./migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_STRING!,
  },
  driver: "mysql2",
} satisfies Config;
