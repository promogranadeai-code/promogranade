import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Web, AI, SEO & Ads Services",
  description:
    "Website development, custom apps, AI agents, SEO/GEO/AEO, social media, Meta & Google ads, workflow automation and custom AI systems. One studio, full stack.",
  path: "/services",
  socialDescription: "Eight services, one senior team. Web, AI, and growth — end to end.",
});

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24" />
      <ServicesGrid headingAs="h1" />
      <Footer />
    </>
  );
}
