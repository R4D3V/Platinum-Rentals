import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pushSubscription } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { endpoint, keys } = await request.json();
  if (!endpoint || !keys) {
    return NextResponse.json({ error: "Missing endpoint or keys" }, { status: 400 });
  }

  const existing = await db()
    .select()
    .from(pushSubscription)
    .where(eq(pushSubscription.endpoint, endpoint));

  if (existing.length === 0) {
    await db().insert(pushSubscription).values({
      id: crypto.randomUUID(),
      endpoint,
      keys: JSON.stringify(keys),
    });
  }

  return NextResponse.json({ ok: true });
}
