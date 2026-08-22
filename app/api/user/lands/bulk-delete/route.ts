import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { land } from "@/lib/db-schema";
import { inArray, and, eq } from "drizzle-orm";
import { revalidateListings } from "@/lib/revalidate";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ids } = await request.json();
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  await db()
    .delete(land)
    .where(
      and(inArray(land.id, ids), eq(land.landlordId, session.user.id)),
    );
  revalidateListings("land", ...ids);
  return NextResponse.json({ deleted: ids.length });
}