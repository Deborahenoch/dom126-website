import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CollectionPreview from "@/components/home/CollectionPreview";
import Experience from "@/components/home/Experience";
import StoryQuote from "@/components/home/StoryQuote";
import SignatureFeature from "@/components/home/SignatureFeature";
import Benefits from "@/components/home/Benefits";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CollectionPreview />
      <Experience />
      <StoryQuote />
      <SignatureFeature />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
