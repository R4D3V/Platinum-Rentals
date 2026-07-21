import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await import("@/lib/db");
  const { property } = await import("@/lib/db-schema");
  const { count } = await import("drizzle-orm");
  const rows = await db.select({ count: count() }).from(property);
  return NextResponse.json({ count: rows[0]?.count ?? 0 });
}
