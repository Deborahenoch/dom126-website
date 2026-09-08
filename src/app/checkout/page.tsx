import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your DOM126 order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
