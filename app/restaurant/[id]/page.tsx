"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import DishAddonModal from "@/components/DishAddonModal";
import { restaurants } from "@/lib/data/restaurants";
import { menus, type MenuItem, type RestaurantMenu } from "@/lib/data/menus";

type Props = { params: Promise<{ id: string }> };

export default function RestaurantPage({ params }: Props) {
  const { id } = React.use(params);

  const { addItem, items } = useCart();

  const [restaurant, setRestaurant] = React.useState(restaurants[0] || null);
  const [menu, setMenu] = React.useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [addonOpen, setAddonOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<MenuItem | null>(null);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  React.useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [rRes, mRes] = await Promise.all([
          fetch(`/api/restaurants/${id}`),
          fetch(`/api/restaurants/${id}/menu`),
        ]);

        if (rRes.ok) {
          setRestaurant(await rRes.json());
        }

        if (mRes.ok) {
          setMenu(await mRes.json());
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading...</p>
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="p-6">
        <h1>Restaurant not found</h1>
      </main>
    );
  }

  const handleAddWithAddons = (selectedAddonIds: string[]) => {
    if (!currentItem) return;
    const selectedAddons =
      currentItem.addons?.filter((a) => selectedAddonIds.includes(a.id)) ?? [];
    const addonsTotal = selectedAddons.reduce(
      (sum, a) => sum + a.price,
      0
    );

    addItem({
      id: currentItem.id,
      restaurantId: restaurant.id,
      name: currentItem.name,
      price: currentItem.price + addonsTotal,
    });
  };


  return (
    <>
      <main className="space-y-8 px-6 pb-12 pt-6">
       
        <p className="text-xs text-gray-500">
          Home / Hyderabad / {restaurant.name}
        </p>

       
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-xs text-gray-600">
                {restaurant.cuisines.join(", ")}
              </p>
              <p className="text-xs text-gray-600">
                {restaurant.area} • {restaurant.deliveryTime} mins
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                ⭐ {restaurant.rating}
              </p>
              <p className="text-xs text-gray-500">₹300 for two</p>
            </div>
          </div>
        </section>

       
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Deals for you</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="min-w-[260px] rounded-2xl border border-gray-200 px-4 py-3 text-sm">
              <p className="font-semibold">Items at ₹379</p>
              <p className="text-xs text-gray-600">On select items</p>
            </div>
            <div className="min-w-[260px] rounded-2xl border border-gray-200 px-4 py-3 text-sm">
              <p className="font-semibold">Flat ₹200 off</p>
              <p className="text-xs text-gray-600">Use CELEBRATIONS</p>
            </div>
          </div>
        </section>

       
        <section className="space-y-4">
          <p className="text-center text-xs tracking-[0.2em] text-gray-500">
            — MENU —
          </p>

          <div className="mx-auto max-w-xl">
            <div className="flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
              <span className="mr-2 text-lg">🔍</span>
              <input
                placeholder="Search for dishes"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
              🟢 Veg
            </button>
            <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
              🔴 Non-Veg
            </button>
            <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
              Bestseller
            </button>
          </div>
        </section>

      
        <section className="space-y-6">
          {menu ? (
            menu.categories.map((category) => (
              <div key={category.id} className="space-y-3">
                <h2 className="text-lg font-bold">
                  {category.title} ({category.items.length})
                </h2>

                <div className="space-y-4">
                  {category.items.map((item) => {
                    const hasAddons =
                      !!item.addons && item.addons.length > 0;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-gray-100 pb-4"
                      >
                        <div className="max-w-xl">
                          <p className="text-sm font-semibold">
                            {item.name}
                          </p>
                          <p className="text-sm">₹{item.price}</p>
                          {item.description && (
                            <p className="mt-1 text-xs text-gray-600">
                              {item.description}
                            </p>
                          )}
                          {hasAddons && (
                            <p className="mt-1 text-[11px] text-gray-500">
                              Customisable
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="h-20 w-24 rounded-xl bg-gray-100" />
                          <button
                            onClick={() => {
                              if (hasAddons) {
                                setCurrentItem(item);
                                setAddonOpen(true);
                              } else {
                                addItem({
                                  id: item.id,
                                  restaurantId: restaurant.id,
                                  name: item.name,
                                  price: item.price,
                                });
                              }
                            }}
                            className="w-24 rounded-md border border-green-600 bg-white py-1 text-xs font-semibold text-green-600"
                          >
                            {hasAddons ? "CUSTOMISE" : "ADD"}
                          </button>
                          {hasAddons && (
                            <span className="text-[10px] text-gray-500">
                              Customisable
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>No menu found.</p>
          )}
        </section>
      </main>

      
      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
          <div className="flex w-full max-w-6xl items-center justify-between bg-green-700 px-6 py-3 text-sm text-white">
            <div>
              <p className="font-semibold">
                {totalItems} item{totalItems > 1 ? "s" : ""} added
              </p>
              <p className="text-xs text-green-100">
                Total ₹{totalAmount}
              </p>
            </div>
            <Link
              href="/cart"
              className="rounded bg-white px-4 py-2 text-xs font-semibold text-green-700"
            >
              VIEW CART
            </Link>
          </div>
        </div>
      )}

      
      <DishAddonModal
        open={addonOpen}
        onClose={() => setAddonOpen(false)}
        item={currentItem}
        restaurantName={restaurant.name}
        onAddToCart={(selectedAddonIds) => {
          handleAddWithAddons(selectedAddonIds);
        }}
      />
    </>
  );
}
