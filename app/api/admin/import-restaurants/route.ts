import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import restaurantsApi from "@/lib/data/restaurants-api.json";

const prisma = new PrismaClient();

export async function POST() {
  const json: any = restaurantsApi;

  const cards: any[] = json?.data?.cards ?? [];

  let restaurantInfos: any[] = [];

  for (const c of cards) {
    const maybeList =
      c?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(maybeList) && maybeList.length > 0) {
      restaurantInfos = maybeList.map((r: any) => r.info ?? r.data ?? r);
      break;
    }
  }

  if (!restaurantInfos.length) {
    return NextResponse.json(
      { message: "No restaurants found in local JSON" },
      { status: 500 }
    );
  }

  for (const info of restaurantInfos) {
    const id = String(info.id);
    const name = info.name ?? "Restaurant";
    const cuisines: string[] = info.cuisines ?? [];
    const rating = Number(info.avgRating ?? info.avgRatingString ?? 0);
    const deliveryTime = Number(info.sla?.deliveryTime ?? 30);
    const area = info.areaName ?? info.locality ?? "";
    const imageUrl = info.cloudinaryImageId
      ? `https://res.cloudinary.com/swiggy/image/upload/${info.cloudinaryImageId}`
      : "";
    const isTopRestaurant = Boolean(info.veg ?? false);

    await prisma.restaurant.upsert({
      where: { id },
      update: {
        name,
        cuisines: cuisines.join(", "),
        rating,
        deliveryTime,
        area,
        imageUrl,
        isTopRestaurant,
      },
      create: {
        id,
        name,
        cuisines: cuisines.join(", "),
        rating,
        deliveryTime,
        area,
        imageUrl,
        isTopRestaurant,
      },
    });
  }

  return NextResponse.json({
    message: `Imported ${restaurantInfos.length} restaurants from file`,
  });
}
