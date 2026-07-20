import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.password) {
    await auth.api.setUserPassword({
      body: { userId: id, newPassword: body.password },
      headers: await headers(),
    });
  }

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.email !== undefined) updateData.email = body.email;
  if (body.role !== undefined) updateData.role = body.role;

  if (Object.keys(updateData).length > 0) {
    const updated = await auth.api.adminUpdateUser({
      body: { userId: id, data: updateData },
      headers: await headers(),
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ message: "No changes" });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  await auth.api.removeUser({
    body: { userId: id },
    headers: await headers(),
  });
  return NextResponse.json({ deleted: true });
}
