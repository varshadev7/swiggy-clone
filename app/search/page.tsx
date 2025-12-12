"use client";

import { useState } from "react";
import Link from "next/link";
import { restaurants } from "@/lib/data/restaurants";

const popularCuisines = [
  "Rolls",
  "North Indian",
  "Tea",
  "Cake",
  "Dessert",
  "Sandwich",
  "Beverages",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="space-y-8 p-6">
      {/* Search bar */}
      <div>
        <div className="flex items-center rounded-md border border-gray-300 px-4 py-3">
          <span className="mr-3 text-lg">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurants and food"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Results */}
      {query ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Results</h2>
          {filtered.length === 0 && (
            <p className="text-sm text-gray-600">
              No restaurants match your search.
            </p>
          )}
          <div className="space-y-2">
            {filtered.map((r) => (
              <Link
                key={r.id}
                href={`/restaurant/${r.id}`}
                className="flex items-center justify-between border-b border-gray-100 pb-2 text-sm"
              >
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-gray-600">
                    {r.cuisines.join(", ")}
                  </p>
                </div>
                <p className="text-xs text-gray-600">
                  ⭐ {r.rating} • {r.deliveryTime} mins
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        /* Popular cuisines when no query */
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Popular Cuisines</h2>
          <div className="flex flex-wrap gap-4">
            {popularCuisines.map((cuisine) => (
              <button
                key={cuisine}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-16 w-16 rounded-full bg-gray-100" />
                <span className="text-xs font-medium text-gray-800">
                  {cuisine}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
