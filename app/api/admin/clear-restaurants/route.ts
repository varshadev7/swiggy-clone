import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  await prisma.restaurantMenu.deleteMany();
//   await prisma.order.deleteMany().catch(() => {});
  await prisma.restaurant.deleteMany();
  return NextResponse.json({ message: "Cleared restaurants + menus" });
}
