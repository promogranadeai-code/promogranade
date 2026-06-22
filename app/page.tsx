import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { MarqueeTicker } from "@/components/layout/MarqueeTicker";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { BlogPreview } from "@/components/home/BlogPreview";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { ContactPreview } from "@/components/home/ContactPreview";
import { homeFaqs } from "@/lib/home-faqs";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProcessTimeline />
      <MarqueeTicker />
      <ArcadeShowcase />
      <HomeTestimonials />
      <BlogPreview />
      <HomeFAQ />
      <ContactPreview />
      <Footer />
    </>
  );
}
