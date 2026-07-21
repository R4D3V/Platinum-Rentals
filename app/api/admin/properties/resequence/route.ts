import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const rows = await db()
    .select()
    .from(property)
    .orderBy(property.propertyId);

  let num = 1000;
  for (const row of rows) {
    const nextId = `PR-${num}`;
    if (row.propertyId !== nextId) {
      await db()
        .update(property)
        .set({ propertyId: nextId })
        .where(eq(property.id, row.id));
    }
    num++;
  }

  return NextResponse.json({ message: `Resequenced ${rows.length} properties` });
}
