"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@/lib/types/restaurant";

interface Coords {
  lat: number;
  lng: number;
}

interface State {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

export function useRestaurants(coords: Coords | null): State {
  const [state, setState] = useState<State>({
    restaurants: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const params = new URLSearchParams();
        if (coords) {
          params.set("lat", coords.lat.toString());
          params.set("lng", coords.lng.toString());
        }
        const res = await fetch(`/api/restaurants?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load restaurants");
        const data: Restaurant[] = await res.json();
        setState({ restaurants: data, loading: false, error: null });
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          error: err.message ?? "Something went wrong",
          loading: false,
        }));
      }
    }
    load();
  }, [coords]);

  return state;
}
