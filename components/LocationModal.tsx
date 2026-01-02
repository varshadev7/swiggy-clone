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
      
    
      setStatus(`Lat: ${latitude.toFixed(6)} | Lng: ${longitude.toFixed(6)}`);
     
      const res = await fetch(`/api/places/nearby?lat=${latitude}&lng=${longitude}`);
      const data = await res.json();
      
      console.log("Geoapify places:", data);
      setStatus(`Found ${data.features?.length ?? 0} restaurants near you at Lat: ${latitude.toFixed(6)} | Lng: ${longitude.toFixed(6)}`);
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
  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-green-800">Location fetched successfully</span>
    </div>
    <p className="text-xs text-green-700 font-mono">
      Lat: {status.includes("lat") ? status.split("lat:")[1]?.split("|")[0]?.trim() : ""} | 
      Lng: {status.includes("lng") ? status.split("lng:")[1]?.trim() : ""}
    </p>
  </div>
)}

      </div>

      
      <div className="hidden flex-1 bg-black/10 md:block" onClick={onClose} />
    </div>
  );
}
