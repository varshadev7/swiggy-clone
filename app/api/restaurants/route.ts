// app/api/restaurants/route.ts
import { NextResponse } from "next/server";
import { restaurants } from "@/lib/data/restaurants";

export async function GET() {
  return NextResponse.json(restaurants);
}
