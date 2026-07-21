import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notification } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST() {
  await db
    .update(notification)
    .set({ read: "true" })
    .where(eq(notification.read, "false"));
  return NextResponse.json({ ok: true });
}
