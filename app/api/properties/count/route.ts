import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const { db } = await import("@/lib/db");
  const { property } = await import("@/lib/db-schema");
  const { count } = await import("drizzle-orm");
  const rows = await db().select({ count: count() }).from(property);
  return NextResponse.json(
    { count: rows[0]?.count ?? 0 },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
  );
}
