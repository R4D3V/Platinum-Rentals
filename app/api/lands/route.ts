import { NextResponse } from "next/server";
import { getAllLands } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const lands = await getAllLands();
  return NextResponse.json(lands, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}