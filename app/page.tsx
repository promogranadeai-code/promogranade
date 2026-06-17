import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { BlogPreview } from "@/components/home/BlogPreview";
import { MarqueeTicker } from "@/components/layout/MarqueeTicker";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Promogranade",
  url: "https://promogranade.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProcessTimeline />
      <BlogPreview />
      <MarqueeTicker />
      <ArcadeShowcase />
      <HomeTestimonials />
      <Footer />
    </>
  );
}
