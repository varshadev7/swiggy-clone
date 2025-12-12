"use client";

import { useState } from "react";
import Link from "next/link";
import LocationModal from "./LocationModal";
import { useCart } from "@/lib/context/CartContext";

export default function HeaderWithLocation() {
  const [locationOpen, setLocationOpen] = useState(false);
  const { items } = useCart();

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-orange-500" />
              <span className="text-lg font-semibold">Swiggy</span>
            </Link>

            <button
              onClick={() => setLocationOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700"
            >
              Other
              <span className="text-xs">▼</span>
            </button>
          </div>

          <nav className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <button className="flex items-center gap-2">
           
              <span>Swiggy Corporate</span>
            </button>
            <Link href="/search" className="flex items-center gap-2">
            
              <span>Search</span>
            </Link>
            <button className="flex items-center gap-2">
            
              <span>Offers</span>
            </button>
            <button className="flex items-center gap-2">
           
              <span>Help</span>
            </button>
            <button className="flex items-center gap-2">
             
              <span>Sign In</span>
            </button>

            <Link href="/cart" className="relative flex items-center gap-2">
          
              <span>Cart</span>
              {totalQty > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-semibold text-white">
                  {totalQty}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <LocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
      />
    </>
  );
}
