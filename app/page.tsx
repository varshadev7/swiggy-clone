"use client";

import { CategoriesSection } from "@/components/ui/CategoriesSection";
import { RestaurantsCarousel } from "@/components/ui/RestaurantsCarousel";
import { LocationStatus } from "@/components/LocationStatus";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useBrowserLocation } from "@/lib/hooks/useBrowserLocation";

export default function HomePage() {
  const { coords } = useBrowserLocation();
  const { restaurants, loading, error } = useRestaurants(coords);

  return (
    <div className="space-y-10">
      <CategoriesSection />
      <LocationStatus coords={coords ?? null} />
      {loading && <p className="text-sm text-gray-600">Loading restaurants…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <RestaurantsCarousel restaurants={restaurants} />
    </div>
  );
}
