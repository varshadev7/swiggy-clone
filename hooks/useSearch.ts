"use client";

import { useState } from "react";
import { Restaurant } from "@/lib/types/restaurant";
import { restaurants } from "@/lib/data/restaurants";

export function useSearch(query: string): Restaurant[] {
  return restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );
}
