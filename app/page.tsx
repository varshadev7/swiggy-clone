"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { setNearbyRestaurants } from "@/lib/geoapifyStore";

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
    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `/api/places/nearby?lat=${latitude}&lng=${longitude}`
          );
          if (!res.ok) {
            throw new Error("Failed to load restaurants");
          }
          const data: Restaurant[] = await res.json();
          setRestaurants(data);
setNearbyRestaurants(data);
        } catch (err: any) {
          setError(err.message ?? "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const topRestaurants = restaurants; // all for now

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
      {/* What's on your mind */}
      <section>
         <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">
          What&apos;s on your mind?
        </h2>
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
        <div className="flex gap-8 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex min-w-[96px] flex-col items-center gap-2"
            >
              <div className="h-20 w-20 rounded-full bg-gray-100" />
              <span className="text-sm font-medium text-gray-800">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        <hr className="mt-4 border-gray-200" />
      </section>
 {/* Status */}
      {loading && <p className="text-sm text-gray-600">Loading nearby restaurants…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {/* Top restaurant chains */}
       <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Restaurants near you
          </h2>
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
                  ⭐ {restaurant.rating.toFixed(1)} • {restaurant.deliveryTime} mins
                </p>
                <p className="text-xs text-gray-600">
                  {restaurant.cuisines.join(", ") || "Restaurant"}
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