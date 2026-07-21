import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pushSubscription } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { endpoint } = await request.json();
  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
  }

  await db()
    .delete(pushSubscription)
    .where(eq(pushSubscription.endpoint, endpoint));

  return NextResponse.json({ ok: true });
}
