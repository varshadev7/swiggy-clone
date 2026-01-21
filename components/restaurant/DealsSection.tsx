export function DealsSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Deals for you</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="min-w-[260px] rounded-2xl border border-gray-200 px-4 py-3 text-sm">
          <p className="font-semibold">Items at ₹379</p>
          <p className="text-xs text-gray-600">On select items</p>
        </div>
        <div className="min-w-[260px] rounded-2xl border border-gray-200 px-4 py-3 text-sm">
          <p className="font-semibold">Flat ₹200 off</p>
          <p className="text-xs text-gray-600">Use CELEBRATIONS</p>
        </div>
      </div>
    </section>
  );
}
