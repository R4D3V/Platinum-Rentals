import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { land } from "@/lib/db-schema";
import { eq } from "drizzle-orm";
import { revalidateListings } from "@/lib/revalidate";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const row = await db()
    .select()
    .from(land)
    .where(eq(land.id, id))
    .then((rows) => rows[0]);
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(row, {
    headers: { "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60" },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const row = await db()
    .update(land)
    .set({
      title: body.title,
      landType: body.landType,
      price: body.price,
      size: body.size,
      location: body.location,
      area: body.area,
      description: body.description,
      features: body.features,
      status: body.status,
      titleDocument: body.titleDocument,
      gradient: body.gradient,
      images: body.images ?? [],
      featured: body.featured ?? false,
    })
    .where(eq(land.id, id))
    .returning();
  if (!row[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidateListings("land", id);
  return NextResponse.json(row[0]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const row = await db()
    .delete(land)
    .where(eq(land.id, id))
    .returning();
  if (!row[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidateListings("land", id);
  return NextResponse.json({ deleted: true });
}