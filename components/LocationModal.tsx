"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LocationModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (!open) return null;

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported in this browser.");
      return;
    }

    setStatus("Finding your location...");

    navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    setStatus("Finding restaurants near you...");

    const res = await fetch(
      `/api/places/nearby?lat=${latitude}&lng=${longitude}`
    );
    const data = await res.json();

    console.log("Geoapify places:", data); 
    setStatus(`Found ${data.features?.length ?? 0} restaurants near you.`);
  },
  (error) => {
    setStatus(error.message);
  }
);

  };

  return (
    <div className="fixed inset-0 z-40 flex bg-black/60">
      
      <div className="flex h-full w-full max-w-md flex-col bg-white p-6">
        <button
          onClick={onClose}
          className="mb-6 text-2xl font-light text-gray-700"
        >
          ×
        </button>

       
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for area, street name.."
            className="w-full rounded border border-gray-300 px-3 py-3 text-sm outline-none"
          />
        </div>

        
        <button
          onClick={handleUseCurrentLocation}
          className="mt-2 flex w-full flex-col items-start rounded border border-gray-300 px-4 py-3 text-left"
        >
          <span className="text-sm font-semibold">Get current location</span>
          <span className="text-xs text-gray-500">Using GPS</span>
        </button>

        {status && (
          <p className="mt-3 text-xs text-gray-600">
            {status}
          </p>
        )}
      </div>

      
      <div className="hidden flex-1 bg-black/10 md:block" onClick={onClose} />
    </div>
  );
}
