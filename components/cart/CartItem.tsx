// components/cart/CartItem.tsx
"use client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  item: CartItem;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
