import { categories } from "@/lib/data/categories";

export function CategoriesSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">Whats on your mind?</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="min-w-[100px] rounded-2xl border border-gray-200 px-4 py-3 text-sm"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
