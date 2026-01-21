import { popularCuisines } from "@/lib/data/popularCuisines";

export function PopularCuisines() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Popular Cuisines</h2>
      <div className="flex flex-wrap gap-4">
        {popularCuisines.map((cuisine) => (
          <button key={cuisine} className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-full bg-gray-100" />
            <span className="text-xs font-medium text-gray-800">{cuisine}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
