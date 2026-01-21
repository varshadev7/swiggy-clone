"use client";

import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/lib/types/restaurant";
import { useRef } from "react";

interface Props {
  restaurants: Restaurant[];
}

export function RestaurantsCarousel({ restaurants }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
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
        {restaurants.map((restaurant) => (
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
              <h3 className="text-base font-semibold">{restaurant.name}</h3>
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
  );
}
