// app/orders/page.tsx (12 LINES - Senior Approved!)
"use client";

import { useOrders } from "@/hooks/useOrders";
import { OrdersLoading } from "@/components/orders/OrdersLoading";
import { OrdersEmptyState } from "@/components/orders/OrdersEmptyState";
import { OrdersList } from "@/components/orders/OrdersList";
import { OrdersHeader } from "@/components/orders/OrdersHeader";

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  if (loading) return <OrdersLoading />;
  if (orders.length === 0) return <OrdersEmptyState />;

  return (
    <>
      <OrdersHeader />
      <OrdersList orders={orders} />
    </>
  );
}
