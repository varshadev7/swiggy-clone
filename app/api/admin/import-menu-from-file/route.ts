import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import rawMenu from "@/lib/data/menu-api.json";

const prisma = new PrismaClient();

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

export async function POST() {
  const anyMenu: any = rawMenu;

  
  const cards: any[] = anyMenu?.data?.cards ?? [];
  const groupedCard = cards[cards.length - 1]?.groupedCard;

  
  const regularCards: any[] =
    groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

  if (!regularCards.length) {
    return NextResponse.json(
      { message: "No REGULAR cards in menu file" },
      { status: 500 }
    );
  }

  const itemCategoryType =
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

  const categories: MenuCategory[] = [];

  for (const wrapper of regularCards) {
    const card = wrapper.card?.card;
    if (!card || card["@type"] !== itemCategoryType) continue;

    const title: string = card.title ?? "Category";
    const itemCards: any[] = card.itemCards ?? [];

    const items: MenuItem[] = itemCards.map((ic) => {
      const info = ic.card?.info ?? ic.info ?? ic;

      const pricePaise =
        info.price ??
        info.defaultPrice ??
        info.pricingModels?.[0]?.price ??
        0;

      const menuItem: MenuItem = {
        id: String(info.id ?? info.name),
        name: info.name ?? "Item",
        description: info.description ?? "",
        price: Math.round(pricePaise / 100),
        isVeg: info.isVeg === 1 || info.veg === 1,
        addons: [],
      };

      const flatAddons: { id: string; name: string; price: number }[] = [];

      if (Array.isArray(info.addons)) {
        for (const group of info.addons) {
          const choices: any[] = group.choices ?? [];
          for (const choice of choices) {
            flatAddons.push({
              id: String(choice.id),
              name: choice.name,
              price: Math.round((choice.price ?? 0) / 100),
            });
          }
        }
      }

      if (flatAddons.length) {
        menuItem.addons = flatAddons;
      }

      return menuItem;
    });

    categories.push({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      items,
    });
  }

  if (!categories.length) {
    return NextResponse.json(
      { message: "No categories found after parsing" },
      { status: 500 }
    );
  }

  const restaurantId = "408177";

  await prisma.restaurantMenu.deleteMany({ where: { restaurantId } });

  await prisma.restaurantMenu.create({
    data: {
      restaurantId,
      categories: JSON.stringify(categories),
    },
  });

  return NextResponse.json({ message: "Imported menu from file" });
}
