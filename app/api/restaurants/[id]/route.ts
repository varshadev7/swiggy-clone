import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params; 

  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  const r = await prisma.restaurant.findUnique({
    where: { id },
  });

  if (!r) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: r.id,
    name: r.name,
    cuisines: r.cuisines.split(",").map((c) => c.trim()),
    rating: r.rating,
    deliveryTime: r.deliveryTime,
    area: r.area,
    imageUrl: r.imageUrl,
    isTopRestaurant: r.isTopRestaurant,
  });
}
