interface AddressPreviewProps {
  name: string;
  address: string;
  phone: string;
}

export function AddressPreview({ name, address, phone }: AddressPreviewProps) {
  return (
    <div className="text-xs text-gray-700">
      <p className="font-semibold">{name || "New customer"}</p>
      <p>{address}</p>
      <p className="text-gray-500">{phone}</p>
    </div>
  );
}
