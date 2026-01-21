import { Order, OrderItem } from "@/lib/types/order";

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  const items = order.items as OrderItem[];
  
  return (
    <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
        {order.createdAt && (
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      <p className="text-xs text-gray-600">Restaurant: {order.restaurantId}</p>

      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 font-semibold">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>
    </div>
  );
}
