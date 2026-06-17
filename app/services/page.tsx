import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Services",
  description:
    "Website development, custom applications, AI agents, SEO/GEO/AEO, social media marketing, Meta and Google ads, workflow automation, and custom AI systems — one studio, full stack.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Promogranade",
    description: "Eight services, one senior team. Web, AI, and growth — end to end.",
    type: "website",
    url: "https://promogranade.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24" />
      <ServicesGrid />
      <Footer />
    </>
  );
}
