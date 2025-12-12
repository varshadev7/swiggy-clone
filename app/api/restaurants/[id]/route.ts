import { NextResponse } from "next/server";
import { restaurants } from "@/lib/data/restaurants";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params; // ✅ unwrap

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(restaurant);
}
