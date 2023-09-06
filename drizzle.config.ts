import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./lib/db/schema",
  out: "./lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config;