"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";

export function CartBar() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="flex w-full max-w-6xl items-center justify-between bg-green-700 px-6 py-3 text-sm text-white">
        <div>
          <p className="font-semibold">
            {totalItems} item{totalItems > 1 ? "s" : ""} added
          </p>
          <p className="text-xs text-green-100">Total ₹{totalAmount}</p>
        </div>
        <Link
          href="/cart"
          className="rounded bg-white px-4 py-2 text-xs font-semibold text-green-700"
        >
          VIEW CART
        </Link>
      </div>
    </div>
  );
}
