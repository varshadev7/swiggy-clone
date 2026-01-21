// app/search/page.tsx (12 LINES - Senior Approved!)
"use client";

import { useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { PopularCuisines } from "@/components/search/PopularCuisines";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const filteredRestaurants = useSearch(query);

  return (
    <main className="space-y-8 p-6">
      <SearchInput query={query} onQueryChange={setQuery} />
      
      {query ? (
        <SearchResults restaurants={filteredRestaurants} />
      ) : (
        <PopularCuisines />
      )}
    </main>
  );
}
