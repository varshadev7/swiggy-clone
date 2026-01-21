export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt?: string;
  restaurantId: string;
  items: OrderItem[];
  totalAmount: number;
}
