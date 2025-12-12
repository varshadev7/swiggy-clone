// Very simple in-memory cache just for dev
export type NearbyRestaurant = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  area: string;
  imageUrl: string;
  isTopRestaurant: boolean;
};

let lastRestaurants: NearbyRestaurant[] = [];

export function setNearbyRestaurants(data: NearbyRestaurant[]) {
  lastRestaurants = data;
}

export function getRestaurantById(id: string) {
  return lastRestaurants.find((r) => r.id === id) || null;
}
