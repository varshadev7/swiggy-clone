import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();

  return NextResponse.json(
    restaurants.map((r) => ({
      id: r.id,
      name: r.name,
      cuisines: r.cuisines.split(",").map((c) => c.trim()),
      rating: r.rating,
      deliveryTime: r.deliveryTime,
      area: r.area,
      imageUrl: r.imageUrl,
      isTopRestaurant: r.isTopRestaurant,
    }))
  );
}
