"use client";

import { useState } from "react";
import Image from "next/image";
import availableImages from "@/lib/image-manifest.json";
import styles from "./ProductImage.module.css";

interface ProductImageProps {
  /** Path to the real photograph, e.g. /images/products/boss-man.jpg */
  src: string;
  name: string;
  size?: string;
  alt?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Product photograph with a graceful, premium fallback.
 *
 * - If the photograph exists (build-time image manifest), it is rendered and
 *   optimised by Next.js.
 * - If it has not been supplied yet, an elegant branded placeholder plate is
 *   rendered instead — with no failed network request.
 *
 * Drop the real photograph at the exact `src` path and rebuild: it is picked
 * up automatically. No other code changes required.
 */
export default function ProductImage({
  src,
  name,
  size,
  alt,
  ratio = "4 / 5",
  sizes = "(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw",
  priority = false,
  className = "",
}: ProductImageProps) {
  const knownAvailable = (availableImages as string[]).includes(src);
  const [failed, setFailed] = useState(false);
  const imageAlt = alt ?? `${name} by DOM126 Fragrances`;

  if (src && knownAvailable && !failed) {
    return (
      <div
        className={`${styles.frame} ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.frame} ${styles.placeholder} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${imageAlt} (photography coming soon)`}
    >
      <span className={styles.innerFrame} aria-hidden="true" />
      <div className={styles.plate}>
        <span className={styles.monogram} aria-hidden="true">
          D
        </span>
        <p className={styles.plateName}>{name}</p>
        {size ? (
          <p className={styles.plateMeta}>
            {size} <span aria-hidden="true">·</span> DOM126
          </p>
        ) : null}
      </div>
      <p className={styles.plateNote}>Photography coming soon</p>
    </div>
  );
}
