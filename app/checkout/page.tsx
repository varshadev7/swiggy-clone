"use client";

import { useState } from "react"; 
import { useCart } from "@/lib/context/CartContext";
import { CheckoutEmptyState } from "@/components/checkout/CheckoutEmptyState";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const { items } = useCart();
  
  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 30 : 0;
  const total = itemsTotal + deliveryFee;
  const [customerName, setCustomerName] = useState("");  
  const [orderPlaced, setOrderPlaced] = useState(false); 

  if (items.length === 0 && !orderPlaced) return <CheckoutEmptyState />;
  if (orderPlaced) return <CheckoutSuccess customerName={customerName} />;

  return (
    <main className="grid gap-8 p-6 md:grid-cols-[2fr,1fr]">
      <CheckoutForm onOrderPlaced={(name) => {
        setCustomerName(name);
        setOrderPlaced(true);
      }} />
      <OrderSummary items={items} itemsTotal={itemsTotal} deliveryFee={deliveryFee} total={total} />
    </main>
  );
}
