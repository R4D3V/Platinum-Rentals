import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const rows = await db()
    .select()
    .from(property)
    .where(eq(property.landlordId, id));

  return NextResponse.json(rows, {
    headers: { "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60" },
  });
}
