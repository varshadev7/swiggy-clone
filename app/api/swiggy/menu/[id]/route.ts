
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };


const SWIGGY_MENU_BASE =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.38430&lng=78.45830&restaurantId=408177&submitAction=ENTER";

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;          

  const url = `${SWIGGY_MENU_BASE}restaurantId=${id}`;

  const res = await fetch(url, {
    
    headers: {
     
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch menu from Swiggy" },
      { status: res.status }
    );
  }

  const raw = await res.json() as any;

  
  const regularCards: any[] =
    raw?.data?.cards?.find((c: any) => c.groupedCard)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards ?? [];

  type MenuItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    isVeg: boolean;
    addons?: { id: string; name: string; price: number }[];
  };

  type MenuCategory = {
    id: string;
    title: string;
    items: MenuItem[];
  };

  const categories: MenuCategory[] = [];

  for (const cardWrapper of regularCards) {
    const card = cardWrapper.card?.card;
    if (!card || card["@type"] !== "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
      continue;
    }

    const title = card.title as string;
    const itemCards: any[] = card.itemCards ?? [];

    const items: MenuItem[] = itemCards.map((ic) => {
      const info = ic.card?.info ?? ic.info ?? ic;
      const pricePaise =
        info.price ??
        info.defaultPrice ??
        info.pricingModels?.[0]?.price ??
        0;

      return {
        id: String(info.id),
        name: info.name,
        description: info.description,
        price: Math.round(pricePaise / 100),
        isVeg: info.isVeg === 1 || info.veg === 1,
        addons: [], 
      };
    });

    categories.push({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      items,
    });
  }

  const menu = {
    restaurantId: id,
    categories,
  };

  return NextResponse.json(menu);
}
