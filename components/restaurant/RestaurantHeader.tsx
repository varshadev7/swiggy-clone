import { Restaurant } from "@/lib/types/restaurant";

interface Props {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: Props) {
  return (
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
          <p className="text-sm font-semibold">⭐ {restaurant.rating}</p>
          <p className="text-xs text-gray-500">₹300 for two</p>
        </div>
      </div>
    </section>
  );
}
