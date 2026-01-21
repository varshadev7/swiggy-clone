"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@/lib/types/restaurant";
import { RestaurantMenu, MenuItem } from "@/lib/types/menu";

interface State {
  restaurant: Restaurant | null;
  menu: RestaurantMenu | null;
  loading: boolean;
}

export function useRestaurantData(id: string): State {
  const [state, setState] = useState<State>({
    restaurant: null,
    menu: null,
    loading: true,
  });

  useEffect(() => {
    async function load() {
      setState({ restaurant: null, menu: null, loading: true });
      try {
        const [rRes, mRes] = await Promise.all([
          fetch(`/api/restaurants/${id}`),
          fetch(`/api/restaurants/${id}/menu`),
        ]);

        if (rRes.ok) {
          setState((prev) => ({
            ...prev,
            restaurant: await rRes.json(),
          }));
        }

        if (mRes.ok) {
          setState((prev) => ({
            ...prev,
            menu: await mRes.json(),
          }));
        }
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
    load();
  }, [id]);

  return state;
}
