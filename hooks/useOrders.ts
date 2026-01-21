"use client";

import { useEffect, useState } from "react";
import { Order } from "@/lib/types/order";

interface State {
  orders: Order[];
  loading: boolean;
}

export function useOrders() {
  const [state, setState] = useState<State>({ orders: [], loading: true });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) {
          setState({ orders: [], loading: false });
          return;
        }
        const data: any[] = await res.json();

        const normalised: Order[] = data.map((o) => ({
          id: o.id,
          createdAt: o.createdAt,
          restaurantId: o.restaurantId,
          items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
          totalAmount:
            typeof o.totalAmount === "number"
              ? o.totalAmount
              : typeof o.totalAmountPaise === "number"
              ? o.totalAmountPaise / 100
              : 0,
        }));

        setState({ orders: normalised, loading: false });
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
    load();
  }, []);

  return state;
}
