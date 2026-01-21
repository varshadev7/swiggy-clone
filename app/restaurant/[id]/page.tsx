"use client";

import { useState } from "react";
import { RestaurantHeader } from "@/components/restaurant/RestaurantHeader";
import { DealsSection } from "@/components/restaurant/DealsSection";
import { MenuSearch } from "@/components/restaurant/MenuSearch";
import { MenuFilters } from "@/components/restaurant/MenuFilters";
import { useRestaurantData } from "@/hooks/useRestaurantData";
import { RestaurantLoading } from "@/components/restaurant/RestaurantLoading";
import { RestaurantNotFound } from "@/components/restaurant/RestaurantNotFound";
import { RestaurantMenuSection } from "@/components/restaurant/RestaurantMenuSection";
import { CartBar } from "@/components/restaurant/CartBar";
import { useParams } from "next/navigation";
import DishAddonModal from "@/components/DishAddonModal";

export default function RestaurantPage() {
  const params = useParams();
  const id = params.id as string;
  const { restaurant, menu, loading } = useRestaurantData(id);
  const [addonOpen, setAddonOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  if (loading) return <RestaurantLoading />;
  if (!restaurant) return <RestaurantNotFound />;

  return (
    <>
      <main className="space-y-8 px-6 pb-12 pt-6">
        <p className="text-xs text-gray-500">
          Home / Hyderabad / {restaurant.name}
        </p>
        <RestaurantHeader restaurant={restaurant} />
        <DealsSection />
        <section className="space-y-4">
          <p className="text-center text-xs tracking-[0.2em] text-gray-500">— MENU —</p>
          <MenuSearch />
          <MenuFilters />
        </section>
        <RestaurantMenuSection 
          restaurant={restaurant} 
          menu={menu} 
          onOpenAddonModal={(item) => {
            setCurrentItem(item);
            setAddonOpen(true);
          }}
        />
      </main>
      <CartBar />
      <DishAddonModal
        open={addonOpen}
        onClose={() => setAddonOpen(false)}
        item={currentItem}
        restaurantName={restaurant.name}
        onAddToCart={() => {}}
      />
    </>
  );
}
