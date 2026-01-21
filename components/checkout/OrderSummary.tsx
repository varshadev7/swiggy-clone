import { CartItem } from "@/lib/types/cart";

interface Props {
  items: CartItem[];
  itemsTotal: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({ items, itemsTotal, deliveryFee, total }: Props) {
  return (
    <aside className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Order summary</h2>
      
      <div className="space-y-2 text-sm">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-gray-800"
          >
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
        <div className="flex items-center justify-between text-gray-700">
          <span>Items total</span>
          <span>₹{itemsTotal}</span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span>Delivery fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="flex items-center justify-between font-semibold">
          <span>To pay</span>
          <span>₹{total}</span>
        </div>
      </div>
    </aside>
  );
}
