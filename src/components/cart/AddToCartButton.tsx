"use client";

import Button from "@/components/ui/Button";
import { getProduct } from "@/lib/products";
import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  slug: string;
  qty?: number;
  label?: string;
  variant?: "primary" | "outline-light" | "outline-dark";
  className?: string;
  full?: boolean;
  /** Open the cart drawer after adding (default true). */
  openDrawer?: boolean;
}

export default function AddToCartButton({
  slug,
  qty = 1,
  label = "Add to Bag",
  variant = "primary",
  className = "",
  full = false,
  openDrawer = true,
}: AddToCartButtonProps) {
  const { add, openDrawer: showDrawer } = useCart();
  const product = getProduct(slug);
  const ariaLabel = product && label === "Add to Bag" ? `Add ${product.name} to bag` : label;

  return (
    <Button
      variant={variant}
      className={className}
      full={full}
      ariaLabel={ariaLabel}
      onClick={() => {
        add(slug, qty);
        if (openDrawer) showDrawer();
      }}
    >
      {label}
    </Button>
  );
}
