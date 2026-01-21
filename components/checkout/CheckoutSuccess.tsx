interface Props {
  customerName?: string;
}

export function CheckoutSuccess({ customerName }: Props) {
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Order placed!</h1>
      <p className="text-sm text-gray-700">
        Thank you {customerName || "customer"}. Your order will be delivered soon.
      </p>
    </main>
  );
}
