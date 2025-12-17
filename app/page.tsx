"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  area: string;
  imageUrl: string;
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

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/restaurants");
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
  }, []);

  const topRestaurants = restaurants;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

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
              <div className="h-40 w-full bg-gray-200" />
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
