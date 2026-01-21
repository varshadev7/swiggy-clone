"use client";

import Link from "next/link";

interface Props {
  total: number;
  onClearCart: () => void;
}

export function CartSummary({ total, onClearCart }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <p className="text-lg font-semibold">Total: ₹{total}</p>
      <div className="flex gap-3">
        <button
          onClick={onClearCart}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Clear
        </button>
        <Link
          href="/checkout"
          className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
