import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { land } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const row = await db()
    .select()
    .from(land)
    .where(eq(land.id, id))
    .then((rows) => rows[0]);

  if (!row || row.landlordId !== session.user.id) {
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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await db()
    .select()
    .from(land)
    .where(eq(land.id, id))
    .then((rows) => rows[0]);

  if (!existing || existing.landlordId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

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

  return NextResponse.json(row[0]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await db()
    .select()
    .from(land)
    .where(eq(land.id, id))
    .then((rows) => rows[0]);

  if (!existing || existing.landlordId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db().delete(land).where(eq(land.id, id));
  return NextResponse.json({ deleted: true });
}