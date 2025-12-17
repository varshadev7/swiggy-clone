"use client";

import { useState } from "react";
import type { Addon, MenuItem } from "@/lib/data/menus";

type Props = {
  open: boolean;
  onClose: () => void;
  item: MenuItem | null;
  restaurantName: string;
  onAddToCart: (selectedAddonIds: string[]) => void;
};

export default function DishAddonModal({
  open,
  onClose,
  item,
  restaurantName,
  onAddToCart,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  if (!open || !item || !item.addons || item.addons.length === 0) return null;

  const toggleAddon = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalAddonPrice = item.addons
    .filter((a) => selected.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const finalPrice = item.price + totalAddonPrice;

  const handleAdd = () => {
    onAddToCart(selected);
    setSelected([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500">{restaurantName}</p>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm font-semibold">₹{item.price}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl font-light text-gray-500"
          >
            ×
          </button>
        </div>

        <h3 className="mb-2 text-sm font-semibold">
          Customise as per your taste
        </h3>
        <p className="mb-3 text-xs text-gray-500">
          Choose add ons (optional)
        </p>

        <div className="max-h-72 space-y-2 overflow-y-auto border-y border-gray-100 py-3">
          {item.addons.map((addon, index) => (
            <label
              key={`${addon.id}-${index}`}
              className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">⬜</span>
                <span className="text-sm">{addon.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  + ₹{addon.price}
                </span>
                <input
                  type="checkbox"
                  checked={selected.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                />
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm">
            Total: <span className="font-semibold">₹{finalPrice}</span>
          </p>
          <button
            onClick={handleAdd}
            className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white"
          >
            Add item to cart
          </button>
        </div>
      </div>
    </div>
  );
}
