import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { property } from "@/lib/db-schema";
import { inArray } from "drizzle-orm";
import { revalidateListings } from "@/lib/revalidate";

export async function POST(request: Request) {
  const { ids } = await request.json();
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }
  await db().delete(property).where(inArray(property.id, ids));
  revalidateListings("property", ...ids);
  return NextResponse.json({ deleted: ids.length });
}
