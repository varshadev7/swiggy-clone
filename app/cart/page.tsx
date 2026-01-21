"use client";

import { useCart } from "@/lib/context/CartContext";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { CartList } from "@/components/cart/CartList";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return <CartEmptyState />;

  return (
    <>
      <h1 className="text-2xl font-bold p-6">Cart</h1>
      <CartList items={items} onRemove={removeItem} />
      <CartSummary total={total} onClearCart={clearCart} />
    </>
  );
}
