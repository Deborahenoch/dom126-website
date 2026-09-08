import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review your DOM126 selection and proceed to checkout.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
