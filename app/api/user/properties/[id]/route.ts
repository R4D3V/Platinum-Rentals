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
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const row = await db()
    .select()
    .from(property)
    .where(eq(property.id, id))
    .then((rows) => rows[0]);

  if (!row || row.landlordId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(row);
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
    .from(property)
    .where(eq(property.id, id))
    .then((rows) => rows[0]);

  if (!existing || existing.landlordId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const row = await db()
    .update(property)
    .set({
      title: body.title,
      type: body.type,
      price: body.price,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      parking: body.parking,
      size: body.size,
      location: body.location,
      area: body.area,
      description: body.description,
      features: body.features,
      status: body.status,
      availableFrom: body.availableFrom ?? null,
      gradient: body.gradient,
      images: body.images ?? [],
    })
    .where(eq(property.id, id))
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
    .from(property)
    .where(eq(property.id, id))
    .then((rows) => rows[0]);

  if (!existing || existing.landlordId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db().delete(property).where(eq(property.id, id));
  return NextResponse.json({ deleted: true });
}
