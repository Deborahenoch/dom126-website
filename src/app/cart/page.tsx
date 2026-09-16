import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CartView from "@/components/cart/CartView";

/**
 * Kept out of the index, but still self-describing: `og:url` now matches this
 * route's canonical, so the metadata cannot contradict itself if someone shares
 * the page anyway.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Your Bag",
    description: "Review your DOM126 selection and proceed to checkout.",
    path: "/cart",
  }),
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
