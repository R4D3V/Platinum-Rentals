import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { land } from "@/lib/db-schema";
import { sendPushNotifications } from "@/lib/notifications";
import { revalidateListings } from "@/lib/revalidate";

export const revalidate = 30;

export async function GET() {
  const rows = await db().select().from(land);
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  let landId = body.landId;
  if (!landId) {
    const rows = await db()
      .select({ landId: land.landId })
      .from(land);
    const max = rows.reduce((m, l) => {
      const n = parseInt(l.landId.replace("PL-", ""), 10);
      return isNaN(n) ? m : Math.max(m, n);
    }, 999);
    landId = `PL-${max + 1}`;
  }

  const row = await db()
    .insert(land)
    .values({
      id: body.id,
      landId,
      title: body.title,
      landType: body.landType,
      price: body.price,
      size: body.size,
      location: body.location,
      area: body.area,
      description: body.description,
      features: body.features,
      status: body.status ?? "Available",
      titleDocument: body.titleDocument ?? "Freehold",
      gradient: body.gradient,
      images: body.images ?? [],
      featured: body.featured ?? false,
      landlordId: body.landlordId ?? null,
    })
    .returning();

  const created = row[0];

  revalidateListings("land", created.id);

  try {
    await sendPushNotifications(
      `New Land Listing: ${created.title}`,
      `${created.landType} — UGX ${created.price.toLocaleString("en-UG")}`,
      `/land/${created.id}`,
    );
  } catch (err) {
    console.error("[notifications] failed to send push:", err);
  }

  return NextResponse.json(created, { status: 201 });
}