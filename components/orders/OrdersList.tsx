import { Order } from "@/lib/types/order";
import { OrderCard } from "./OrderCard";

interface Props {
  orders: Order[];
}

export function OrdersList({ orders }: Props) {
  return (
    <div className="space-y-4 p-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
