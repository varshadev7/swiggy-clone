import "./globals.css";
import type { ReactNode } from "react";

import { CartProvider } from "@/lib/context/CartContext";
import HeaderWithLocation from "@/components/HeaderWithLocation";

export const metadata = {
  title: "Swiggy Clone",
  description: "Learning project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#02060C]">
        <CartProvider>
        
          <HeaderWithLocation />

          <main className="mx-auto max-w-6xl px-8 py-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
