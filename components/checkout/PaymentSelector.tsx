"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold">Payment method</h2>
      <div className="space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="cod"
            checked={value === "cod"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="card"
            checked={value === "card"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>Card / UPI</span>
        </label>
      </div>
    </div>
  );
}
