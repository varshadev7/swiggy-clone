import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  await prisma.restaurant.create({
    data: {
      id: "408177",
      name: "Pizza Hut",
      cuisines: "Pizzas",
      rating: 4.5,
      deliveryTime: 35,
      area: "Kachiguda",
      imageUrl: "",
      isTopRestaurant: true,
    },
  });

  return NextResponse.json({ message: "Inserted 408177" });
}
