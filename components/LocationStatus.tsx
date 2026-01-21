"use client";

interface Coords {
  lat: number;
  lng: number;
}

interface Props {
  coords: Coords | null;
}

export function LocationStatus({ coords }: Props) {
  if (!coords) return null;

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-green-800">Location fetched successfully</span>
      </div>
      <p className="text-xs text-green-700 mt-1 font-mono">
        Lat: {coords.lat.toFixed(6)} | Lng: {coords.lng.toFixed(6)}
      </p>
    </div>
  );
}
