import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { land } from "@/lib/db-schema";
import { eq } from "drizzle-orm";
import { sendPushNotifications } from "@/lib/notifications";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db()
    .select()
    .from(land)
    .where(eq(land.landlordId, session.user.id));

  return NextResponse.json(rows, {
    headers: { "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60" },
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      landlordId: session.user.id,
    })
    .returning();

  const created = row[0];

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