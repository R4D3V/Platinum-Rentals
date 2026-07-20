import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./db-schema";

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // .env.local doesn't exist (e.g., on Vercel)
  }
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
