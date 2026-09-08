import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ShopGrid from "@/components/product/ShopGrid";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Shop Fragrances",
  description:
    "Explore the DOM126 collection — Boss Man, Ephata and Sweet Savour, each 100ml, plus the Custom-Made Signature Perfume created for one person only.",
  alternates: { canonical: "/shop" },
};

type Category = "all" | "fragrance" | "bespoke";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory: Category =
    category === "fragrance" || category === "bespoke" ? category : "all";

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="The Collection"
        description="Three signature fragrances, each presented in 100ml — and one made only for you. Every price is clear, every order personally confirmed."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <ShopGrid initialCategory={initialCategory} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
