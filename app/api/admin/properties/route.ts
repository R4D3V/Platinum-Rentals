import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { property } from "@/lib/db-schema";
import { sendPushNotifications } from "@/lib/notifications";

export const revalidate = 30;

export async function GET() {
  const rows = await db().select().from(property);
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  let propertyId = body.propertyId;
  if (!propertyId) {
    const rows = await db()
      .select({ propertyId: property.propertyId })
      .from(property);
    const max = rows.reduce((m, p) => {
      const n = parseInt(p.propertyId.replace("PR-", ""), 10);
      return isNaN(n) ? m : Math.max(m, n);
    }, 999);
    propertyId = `PR-${max + 1}`;
  }

  const row = await db()
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
      featured: body.featured ?? false,
      landlordId: body.landlordId ?? null,
    })
    .returning();

  const created = row[0];

  sendPushNotifications(
    `New Listing: ${created.title}`,
    `${created.type} — UGX ${created.price.toLocaleString("en-UG")}`,
    `/properties/${created.id}`,
  ).catch(() => {});

  return NextResponse.json(created, { status: 201 });
}
