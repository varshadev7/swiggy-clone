"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBrowserLocation } from "@/lib/hooks/useBrowserLocation";


type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  area: string;
  cloudinaryImageId: string; 
  isTopRestaurant: boolean;
};

const categories = [
  { id: "dosa", label: "Dosa" },
  { id: "idli", label: "Idli" },
  { id: "poori", label: "Poori" },
  { id: "vada", label: "Vada" },
  { id: "chole-bhature", label: "Chole Bhature" },
  { id: "khichdi", label: "Khichdi" },
  { id: "cakes", label: "Cakes" },
];

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
   const { coords, error: locError, loading: locLoading } =
    useBrowserLocation();

  useEffect(() => {
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (coords) {
        params.set("lat", coords.lat.toString());
        params.set("lng", coords.lng.toString());
      }
      const res = await fetch(`/api/restaurants?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load restaurants");
      const data: Restaurant[] = await res.json();
      setRestaurants(data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  load();
}, [coords]);



  const topRestaurants = restaurants;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const primaryArea =
  restaurants.length > 0 ? restaurants[0].area : "Other";

  return (
    
    <div className="space-y-10">
      
      <section className="space-y-3">
        <h2 className="text-xl font-bold">What&apos;s on your mind?</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="min-w-[100px] rounded-2xl border border-gray-200 px-4 py-3 text-sm"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>
{coords && (
  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-green-800">Location fetched successfully</span>
    </div>
    <p className="text-xs text-green-700 mt-1 font-mono">
      Lat: {coords.lat.toFixed(6)} | Lng: {coords.lng.toFixed(6)}
    </p>
  </div>
)}




      {loading && (
        <p className="text-sm text-gray-600">Loading restaurants…</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}


      <section className="space-y-4">
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Restaurants</h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg"
            >
              ›
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-3">
          {topRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurant/${restaurant.id}`}
              className="min-w-[260px] max-w-[260px] overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md"
            >
             
            {restaurant.cloudinaryImageId ? (
  <Image
    src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.cloudinaryImageId}`}
    alt={restaurant.name}
    width={400}
    height={160}
    className="h-40 w-full object-cover"
  />
) : (
  <div className="h-40 w-full bg-gray-200" />
)}



              <div className="space-y-1 p-3">
                <h3 className="text-base font-semibold">
                  {restaurant.name}
                </h3>
                <p className="text-xs text-gray-600">
                  ⭐ {restaurant.rating} • {restaurant.deliveryTime} mins
                </p>
                <p className="text-xs text-gray-600">
                  {restaurant.cuisines.join(", ")}
                </p>
                <p className="text-xs text-gray-500">{restaurant.area}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
