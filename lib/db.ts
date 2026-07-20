import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./db-schema";

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(".env.local");
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
