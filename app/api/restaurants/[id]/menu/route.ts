import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params; 

  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  const menu = await prisma.restaurantMenu.findFirst({
    where: { restaurantId: id },
  });

  if (!menu) {
    return NextResponse.json(
      { message: "Menu not found" },
      { status: 404 }
    );
  }

  const categories = JSON.parse(menu.categories || "[]");

  return NextResponse.json({
    restaurantId: id,
    categories,
  });
}
