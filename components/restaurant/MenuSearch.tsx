export function MenuSearch() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
        <span className="mr-2 text-lg">🔍</span>
        <input
          placeholder="Search for dishes"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
