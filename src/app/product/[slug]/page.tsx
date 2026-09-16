import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import availableImages from "@/lib/image-manifest.json";
import { categoryLabels, getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Price from "@/components/ui/Price";
import ProductImage from "@/components/product/ProductImage";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";
import Ornament from "@/components/ui/Ornament";
import styles from "./product.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  const path = `/product/${product.slug}`;
  const description = `${product.tagline} ${product.blurb} ${product.size}, ${formatPrice(
    product.price
  )}.`;

  /**
   * Share the real photograph as soon as it exists (see the build-time image
   * manifest); until then the brand texture stands in, so og:image never points
   * at a file that 404s.
   */
  const hasPhotograph = (availableImages as string[]).includes(product.image);
  const images = hasPhotograph
    ? [{ url: product.image, alt: `${product.name} — DOM126 Fragrances` }]
    : undefined;

  const metadata = pageMetadata({ title: product.name, description, path, images });

  return {
    ...metadata,
    // The document title carries the size; og:title stays short and brandy.
    title: `${product.name} — ${product.size}`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    image: `${siteConfig.url}${product.image}`,
    brand: { "@type": "Brand", name: "DOM126 Fragrances" },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteConfig.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className={styles.crumbsBand}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.grid}`}>
          {/* ---------- Gallery ---------- */}
          <Reveal className={styles.galleryCol}>
            <div className={styles.gallery}>
              <ProductImage
                src={product.image}
                name={product.name}
                size={product.size}
                priority
                ratio="4 / 5"
                sizes="(max-width: 900px) 92vw, 46vw"
              />
              {product.gallery.length > 0 && (
                <div className={styles.thumbs}>
                  <ProductImage
                    src={product.image}
                    name={`${product.name} — main`}
                    size={product.size}
                    ratio="1 / 1"
                    sizes="90px"
                  />
                  {product.gallery.map((img, i) => (
                    <ProductImage
                      key={img}
                      src={img}
                      name={`${product.name} — view ${i + 2}`}
                      size={product.size}
                      ratio="1 / 1"
                      sizes="90px"
                    />
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* ---------- Info ---------- */}
          <div className={styles.infoCol}>
            <Reveal>
              <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>
                {categoryLabels[product.category]} · {product.size}
              </p>
              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.tagline}>{product.tagline}</p>

              <div className={styles.priceRow}>
                <p className={styles.price}>
                  <span className="sr-only">Price: </span>
                  <Price value={product.price} />
                </p>
                <span className={styles.chip}>{product.size}</span>
                <span className={styles.chip}>
                  {product.availability === "in-stock" ? "In Stock" : "Made to Order"}
                </span>
              </div>

              <div className={styles.description}>
                {product.description.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>

              <ProductBuyBox product={product} />

              <ul className={styles.assurances}>
                <li>
                  <Ornament className={styles.assuranceOrnament} />
                  Every order is personally confirmed by the DOM126 team
                </li>
                <li>
                  <Ornament className={styles.assuranceOrnament} />
                  Delivery is arranged when your order is confirmed
                </li>
                <li>
                  <Ornament className={styles.assuranceOrnament} />
                  Have a question? <Link href="/contact">Contact DOM126</Link> — we respond personally
                </li>
              </ul>

              <dl className={styles.details}>
                <div>
                  <dt>Presentation</dt>
                  <dd>{product.size} bottle</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{categoryLabels[product.category]}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>
                    {product.availability === "in-stock"
                      ? "Available now"
                      : "Created on request"}
                  </dd>
                </div>
                {product.notes ? (
                  <div>
                    <dt>Fragrance Notes</dt>
                    <dd>
                      Top: {product.notes.top.join(", ")} · Heart:{" "}
                      {product.notes.heart.join(", ")} · Base:{" "}
                      {product.notes.base.join(", ")}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className={`section ${styles.related}`}>
        <div className="container">
          <Reveal>
            <h2 className={`h3 ${styles.relatedTitle}`}>Continue the collection</h2>
          </Reveal>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
