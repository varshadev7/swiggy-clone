import Link from "next/link";
import { Restaurant } from "@/lib/types/restaurant";

interface Props {
  restaurants: Restaurant[];
}

export function SearchResults({ restaurants }: Props) {
  if (restaurants.length === 0) {
    return (
      <p className="text-sm text-gray-600">No restaurants match your search.</p>
    );
  }

  return (
    <div className="space-y-2">
      {restaurants.map((r) => (
        <Link
          key={r.id}
          href={`/restaurant/${r.id}`}
          className="flex items-center justify-between border-b border-gray-100 pb-2 text-sm"
        >
          <div>
            <p className="font-medium">{r.name}</p>
            <p className="text-xs text-gray-600">{r.cuisines.join(", ")}</p>
          </div>
          <p className="text-xs text-gray-600">
            ⭐ {r.rating} • {r.deliveryTime} mins
          </p>
        </Link>
      ))}
    </div>
  );
}
