"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  createdAt?: string;
  restaurantId: string;
  items: OrderItem[] | string; 
  totalAmountPaise?: number;
  totalAmount?: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) {
          setOrders([]);
          return;
        }
        const data: any[] = await res.json();

        const normalised: Order[] = data.map((o) => ({
          id: o.id,
          createdAt: o.createdAt,
          restaurantId: o.restaurantId,
          items:
            typeof o.items === "string" ? JSON.parse(o.items) : o.items,
          totalAmount:
            typeof o.totalAmount === "number"
              ? o.totalAmount
              : typeof o.totalAmountPaise === "number"
              ? o.totalAmountPaise / 100
              : 0,
        }));

        setOrders(normalised);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="mb-2 text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-600">Loading…</p>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.length === 0 && (
        <p className="text-sm text-gray-600">No orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const items = order.items as OrderItem[];
          return (
            <div
              key={order.id}
              className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 text-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  Order #{order.id.slice(0, 8)}
                </p>
                {order.createdAt && (
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-600">
                Restaurant: {order.restaurantId}
              </p>

              <div className="space-y-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount ?? 0}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
