import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CheckoutView from "@/components/checkout/CheckoutView";

/**
 * Kept out of the index, but still self-describing: `og:url` now matches this
 * route's canonical, so the metadata cannot contradict itself if someone shares
 * the page anyway.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description: "Complete your DOM126 order.",
    path: "/checkout",
  }),
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
