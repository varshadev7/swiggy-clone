"use client";

import { FormEvent, useState } from "react";
import { AddressForm } from "./AddressForm";
import { PaymentSelector } from "./PaymentSelector";
import { AddressPreview } from "./AddressPreview";
import { useCart } from "@/lib/context/CartContext";
import { CartItem } from "@/lib/types/cart";

interface Props {
  onOrderPlaced: (customerName: string) => void;
}

export function CheckoutForm({ onOrderPlaced }: Props) {
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 30 : 0;
  const total = itemsTotal + deliveryFee;

  const handleAddressSubmit = async (formData: any) => {
    setError(null);
    
    if (!items.length) return;

    const restaurantId = items[0].restaurantId;

    try {
      setSubmitting(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          items,
          totalAmount: total,
          customer: { ...formData, paymentMethod },
        }),
      });

      if (!res.ok) {
        setError("Failed to place order. Please try again.");
        return;
      }

      setPlaced(true);
      clearCart();
      onOrderPlaced(formData.name);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) return null;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h2 className="mb-2 text-sm font-semibold">Deliver to</h2>
        {customerData.address ? (
          <AddressPreview
            name={customerData.name}
            address={customerData.address}
            phone={customerData.phone}
          />
        ) : (
          <p className="text-xs text-gray-500">
            Enter your details below to save this address.
          </p>
        )}
      </div>

      <AddressForm
        onSubmit={handleAddressSubmit}
        error={error}
        submitting={submitting}
      />
      
      <PaymentSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
    </section>
  );
}
