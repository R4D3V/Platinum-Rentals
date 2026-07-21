import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { users } = await auth.api.listUsers({
    query: {},
    headers: await headers(),
  });
  return NextResponse.json(users, {
    headers: { "Cache-Control": "private, s-maxage=15, stale-while-revalidate=30" },
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { user: created } = await auth.api.createUser({
    body: {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role ?? "user",
    },
    headers: await headers(),
  });
  return NextResponse.json(created, { status: 201 });
}
