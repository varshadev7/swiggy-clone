import { NextResponse } from "next/server";
import rawMenu from "@/lib/data/menu-api.json";

export async function POST() {
  const anyMenu: any = rawMenu;
  
  console.log("Full top level:", Object.keys(anyMenu));
  console.log("data keys:", Object.keys(anyMenu.data || {}));
  console.log("Has groupedCard?", !!anyMenu.data?.groupedCard);
  
  return NextResponse.json({
    topLevel: Object.keys(anyMenu),
    hasGroupedCard: !!anyMenu.data?.groupedCard,
    hasCards: !!anyMenu.data?.cards,
    restaurantId: anyMenu.data?.cards?.[2]?.card?.card?.info?.id
  });
}
