"use client";

import { CartItem } from "./CartItem";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  items: CartItem[];
  onRemove: (id: string) => void;
}

export function CartList({ items, onRemove }: Props) {
  return (
    <div className="space-y-3 p-6">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
