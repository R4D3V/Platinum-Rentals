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

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let cached: ReturnType<typeof getDb> | null = null;
export function db() {
  if (!cached) cached = getDb();
  return cached;
}
