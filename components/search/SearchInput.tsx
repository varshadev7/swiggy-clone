"use client";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchInput({ query, onQueryChange }: Props) {
  return (
    <div>
      <div className="flex items-center rounded-md border border-gray-300 px-4 py-3">
        <span className="mr-3 text-lg">🔍</span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for restaurants and food"
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}
