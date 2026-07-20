import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(property)
    .where(eq(property.landlordId, session.user.id));

  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  let propertyId = body.propertyId;
  if (!propertyId) {
    const rows = await db
      .select({ propertyId: property.propertyId })
      .from(property);
    const max = rows.reduce((m, p) => {
      const n = parseInt(p.propertyId.replace("PR-", ""), 10);
      return isNaN(n) ? m : Math.max(m, n);
    }, 999);
    propertyId = `PR-${max + 1}`;
  }

  const row = await db
    .insert(property)
    .values({
      id: body.id,
      propertyId,
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
      status: body.status ?? "Available",
      availableFrom: body.availableFrom ?? null,
      gradient: body.gradient,
      images: body.images ?? [],
      landlordId: session.user.id,
    })
    .returning();
  return NextResponse.json(row[0], { status: 201 });
}
