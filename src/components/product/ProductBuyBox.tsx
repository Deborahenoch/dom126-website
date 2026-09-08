"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import QuantityStepper from "@/components/cart/QuantityStepper";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import styles from "./ProductBuyBox.module.css";

export default function ProductBuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const isBespoke = product.category === "bespoke";

  const waLink = buildWhatsAppLink(
    `Hello DOM126! I would like to order ${product.name} (${product.size}) — ₦${product.price.toLocaleString("en-NG")}${qty > 1 ? ` × ${qty}` : ""}.`
  );

  if (isBespoke) {
    return (
      <div className={styles.root}>
        <p className={styles.bespokeNote}>
          The Signature Perfume is not added to a bag — it begins with a
          personal request.
        </p>
        <ButtonLink href="/custom-signature#request" variant="primary" full arrow>
          Request Your Signature Perfume
        </ButtonLink>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--outline-dark ${styles.waBtn}`}
          >
            <WhatsAppIcon size={17} /> Ask on WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${product.name}`} />
        <div className={styles.grow}>
          <AddToCartButton slug={product.slug} qty={qty} full label="Add to Bag" />
        </div>
      </div>
      {waLink ? (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn--outline-dark ${styles.waBtn}`}
        >
          <WhatsAppIcon size={17} /> Order via WhatsApp
        </a>
      ) : null}
    </div>
  );
}
