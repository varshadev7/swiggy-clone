import { NextResponse } from "next/server";
import { menus } from "@/lib/data/menus";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params; // ✅ unwrap

  const menu = menus.find((m) => m.restaurantId === id);

  if (!menu) {
    return NextResponse.json({ message: "No menu" }, { status: 404 });
  }

  return NextResponse.json(menu);
}
