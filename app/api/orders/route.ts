import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { restaurantId, items, totalAmount } = body as {
    restaurantId: string;
    items: { id: string; name: string; price: number; quantity: number }[];
    totalAmount: number;
  };

  if (!restaurantId || !Array.isArray(items) || !items.length) {
    return NextResponse.json(
      { message: "Invalid order" },
      { status: 400 }
    );
  }

  const order = await prisma.order.create({
    data: {
      restaurantId,
      items: JSON.stringify(items),
      totalAmount: Math.round(totalAmount * 100),
    },
  });

  return NextResponse.json({ id: order.id }, { status: 201 });
}

export async function GET() {
  const orders = await prisma.order.findMany();

  return NextResponse.json(
    orders.map((o) => ({
      id: o.id,
      restaurantId: o.restaurantId,
      rawItems: o.items,
      totalAmountPaise: o.totalAmount,
    }))
  );
}


