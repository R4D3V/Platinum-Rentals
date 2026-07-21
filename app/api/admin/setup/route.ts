import { randomBytes, scrypt } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user, account } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString("hex");
    scrypt(
      password.normalize("NFKC"),
      salt,
      64,
      { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 },
      (err, key) => {
        if (err) reject(err);
        else resolve(`${salt}:${key.toString("hex")}`);
      },
    );
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json({ error: "name, email, and password are required" }, { status: 400 });
  }

  const existingAdmin = await db()
    .select()
    .from(user)
    .where(eq(user.role, "admin"))
    .limit(1)
    .then((rows) => rows[0]);

  if (existingAdmin) {
    return NextResponse.json({ error: "An admin user already exists" }, { status: 409 });
  }

  const id = crypto.randomUUID();
  const now = new Date();
  const hashedPassword = await hashPassword(password);

  await db().insert(user).values({
    id,
    name,
    email: email.toLowerCase(),
    role: "admin",
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  });

  await db().insert(account).values({
    id: crypto.randomUUID(),
    accountId: id,
    providerId: "credential",
    userId: id,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ message: "Admin user created", userId: id }, { status: 201 });
}
