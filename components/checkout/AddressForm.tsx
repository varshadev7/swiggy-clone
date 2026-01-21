
"use client";

import { FormEvent, useState } from "react";
import { AddressPreview } from "./AddressPreview";

interface FormData {
  name: string;
  phone: string;
  address: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
  error?: string | null;
  submitting: boolean;
}

export function AddressForm({ onSubmit, error, submitting }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Address details</h1>
      
      {error && <p className="text-xs text-red-600">{error}</p>}
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Phone</label>
        <input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Delivery address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="h-24 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? "Placing order..." : `Pay ₹${0}`} {/* Total passed as prop */}
      </button>
    </form>
  );
}
