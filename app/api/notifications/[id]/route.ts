import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notification } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db
    .update(notification)
    .set({ read: "true" })
    .where(eq(notification.id, id));
  return NextResponse.json({ ok: true });
}
