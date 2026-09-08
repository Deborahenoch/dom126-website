/**
 * DOM126 Fragrances — product catalogue (single source of truth).
 *
 * HOW TO ADD A PRODUCT (no rebuild of the website required — the shop,
 * product pages, search, cart and checkout all read from this file):
 *   1. Add a photo at `public/images/products/<slug>.jpg` (and optional
 *      gallery images `<slug>-2.jpg`, `<slug>-3.jpg`, …).
 *   2. Copy a fragrance object below and update its fields.
 *   3. Prices are whole Naira numbers (e.g. 54000 renders as ₦54,000).
 *
 * IMPORTANT CONTENT RULES:
 *   - Do not invent fragrance notes. The `notes` field is reserved and only
 *     renders when real notes are supplied by the brand.
 *   - Do not invent ingredients, formulations, longevity claims or stats.
 */

export type ProductCategory = "fragrance" | "bespoke";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  /** URL segment, e.g. /product/boss-man */
  slug: string;
  name: string;
  /** Short positioning line shown on cards. */
  tagline: string;
  /** One-line blurb used in search results and metadata. */
  blurb: string;
  /** Full description paragraphs for the product page. */
  description: string[];
  size: string;
  /** Whole Naira amount. */
  price: number;
  currency: "NGN";
  /** Primary photograph — drop the real file at this exact path. */
  image: string;
  /** Additional gallery photos (optional; add paths as files are supplied). */
  gallery: string[];
  category: ProductCategory;
  availability: "in-stock" | "made-to-order";
  /** Reserved for real fragrance notes — leave undefined until supplied. */
  notes?: FragranceNotes;
}

export const products: Product[] = [
  {
    slug: "boss-man",
    name: "Boss Man",
    tagline: "Confidence in a bottle.",
    blurb: "Sophisticated, confident and refined — designed to complement a strong presence.",
    description: [
      "Boss Man is sophistication you can wear. Confident, masculine and refined, it is designed for the man whose presence is felt before he speaks — and remembered long after he leaves the room.",
      "Presented in a generous 100ml bottle, Boss Man is the fragrance equivalent of a perfectly tailored suit: assured, understated and unmistakably his.",
    ],
    size: "100ml",
    price: 54000,
    currency: "NGN",
    image: "/images/products/boss-man.jpg",
    gallery: [],
    category: "fragrance",
    availability: "in-stock",
  },
  {
    slug: "ephata",
    name: "Ephata",
    tagline: "A fragrance that speaks without saying a word.",
    blurb: "Refined, distinctive and elegant — memorable without effort.",
    description: [
      "Ephata is quiet confidence, bottled. Refined and distinctive, it never asks for attention — it simply holds it. Elegant from the first impression to the last.",
      "For those who prefer presence over noise, Ephata is a signature that lingers in the memory: a word spoken softly that stays heard.",
    ],
    size: "100ml",
    price: 54000,
    currency: "NGN",
    image: "/images/products/ephata.jpg",
    gallery: [],
    category: "fragrance",
    availability: "in-stock",
  },
  {
    slug: "sweet-savour",
    name: "Sweet Savour",
    tagline: "Leave them wanting to remember you.",
    blurb: "Captivating, sophisticated and expressive — the scent people ask about.",
    description: [
      "Sweet Savour is made to be remembered. Captivating and expressive, it turns an entrance into an occasion — a scent that lingers in the room, and in the memory.",
      "Sophisticated and self-assured, it is the fragrance people ask about, and the one they remember you by.",
    ],
    size: "100ml",
    price: 54000,
    currency: "NGN",
    image: "/images/products/sweet-savour.jpg",
    gallery: [],
    category: "fragrance",
    availability: "in-stock",
  },
  {
    slug: "custom-signature",
    name: "Custom-Made Signature Perfume",
    tagline: "Your scent. Your identity.",
    blurb: "A bespoke fragrance created for one person only — you.",
    description: [
      "Some fragrances are made for everyone. This one is made for you. The DOM126 Custom-Made Signature Perfume is a bespoke creation, crafted on request for a single individual.",
      "From your personality to the moments you live in, every detail shapes a scent that could belong to no one else. One fragrance. One person. One signature.",
    ],
    size: "100ml",
    price: 98000,
    currency: "NGN",
    image: "/images/products/custom-signature.jpg",
    gallery: [],
    category: "bespoke",
    availability: "made-to-order",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const fragrances = products.filter((p) => p.category === "fragrance");
export const bespoke = products.filter((p) => p.category === "bespoke");

export const categoryLabels: Record<ProductCategory, string> = {
  fragrance: "Fragrance",
  bespoke: "Bespoke",
};
