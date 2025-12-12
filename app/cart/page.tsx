"use client";

import { useCart } from "@/lib/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="p-6">
        <h1 className="mb-2 text-2xl font-bold">Cart</h1>
        <p>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 pb-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-600">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-lg font-semibold">Total: ₹{total}</p>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="rounded border border-gray-300 px-4 py-2 text-sm"
          >
            Clear
          </button>
         <Link
  href="/checkout"
  className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white"
>
  Checkout
</Link>
        </div>
      </div>
    </main>
  );
}
