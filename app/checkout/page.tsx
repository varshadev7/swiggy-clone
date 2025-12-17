"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/lib/context/CartContext";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 30 : 0;
  const total = itemsTotal + deliveryFee;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
          customer: {
            name,
            phone,
            address,
            paymentMethod,
          },
        }),
      });

      if (!res.ok) {
        setError("Failed to place order. Please try again.");
        return;
      }

      

      setPlaced(true);
      clearCart();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !placed) {
    return (
      <main className="p-6">
        <h1 className="mb-2 text-2xl font-bold">Checkout</h1>
        <p>Your cart is empty.</p>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="p-6 space-y-3">
        <h1 className="text-2xl font-bold">Order placed!</h1>
        <p className="text-sm text-gray-700">
          Thank you {name || "customer"}. Your order will be delivered soon.
        </p>
      </main>
    );
  }

  return (
    <main className="grid gap-8 p-6 md:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold">Deliver to</h2>
          {address ? (
            <div className="text-xs text-gray-700">
              <p className="font-semibold">{name || "New customer"}</p>
              <p>{address}</p>
              <p className="text-gray-500">{phone}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              Enter your details below to save this address.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold">Address details</h1>

          {error && (
            <p className="text-xs text-red-600">
              {error}
            </p>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Delivery address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-24 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Payment method</h2>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Card / UPI</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Placing order..." : `Pay ₹${total}`}
          </button>
        </form>
      </section>

      <aside className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
        <h2 className="text-lg font-semibold">Order summary</h2>

        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-gray-800"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
          <div className="flex items-center justify-between text-gray-700">
            <span>Items total</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span>Delivery fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>To pay</span>
            <span>₹{total}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}
