
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  addons?: { id: string; price: number }[];
}

export interface RestaurantMenu {
  categories: {
    id: string;
    title: string;
    items: MenuItem[];
  }[];
}
