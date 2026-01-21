import { Restaurant } from "@/lib/types/restaurant";
import { RestaurantMenu } from "@/lib/types/menu";
import { MenuSection } from "./MenuSection";

interface Props {
  restaurant: Restaurant;
  menu: RestaurantMenu | null;
  onOpenAddonModal: (item: any) => void;
}

export function RestaurantMenuSection({ restaurant, menu, onOpenAddonModal }: Props) {
  if (!menu) return <p>No menu found.</p>;

  return (
    <section className="space-y-6">
      {menu.categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h2 className="text-lg font-bold">
            {category.title} ({category.items.length})
          </h2>
          <MenuSection
            items={category.items}
            restaurantId={restaurant.id}
            onOpenAddonModal={onOpenAddonModal}
          />
        </div>
      ))}
    </section>
  );
}
