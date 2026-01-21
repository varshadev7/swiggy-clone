"use client";

import { MenuItem } from "@/lib/types/menu";
import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

interface Props {
  items: MenuItem[];
  restaurantId: string;
  onOpenAddonModal: (item: MenuItem) => void;
}

export function MenuSection({ items, restaurantId, onOpenAddonModal }: Props) {
  const { addItem } = useCart();

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const hasAddons = !!item.addons && item.addons.length > 0;

        return (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 pb-4"
          >
            <div className="max-w-xl">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm">₹{item.price}</p>
              {item.description && (
                <p className="mt-1 text-xs text-gray-600">
                  {item.description}
                </p>
              )}
              {hasAddons && (
                <p className="mt-1 text-[11px] text-gray-500">Customisable</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-24 rounded-xl bg-gray-100" />
              <button
                onClick={() => {
                  if (hasAddons) {
                    onOpenAddonModal(item);
                  } else {
                    addItem({
                      id: item.id,
                      restaurantId,
                      name: item.name,
                      price: item.price,
                    });
                  }
                }}
                className="w-24 rounded-md border border-green-600 bg-white py-1 text-xs font-semibold text-green-600"
              >
                {hasAddons ? "CUSTOMISE" : "ADD"}
              </button>
              {hasAddons && (
                <span className="text-[10px] text-gray-500">Customisable</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
