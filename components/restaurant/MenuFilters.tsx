export function MenuFilters() {
  return (
    <div className="flex gap-3">
      <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
        🟢 Veg
      </button>
      <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
        🔴 Non-Veg
      </button>
      <button className="rounded-full border border-gray-300 px-4 py-1 text-xs">
        Bestseller
      </button>
    </div>
  );
}
