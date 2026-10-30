import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServiceBySlug } from "@/lib/services-data";
import { ServicePageClient } from "@/components/services/ServicePageClient";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const keywords = service.groups
    .flatMap((g) => g.items.flatMap((i) => i.tags ?? []))
    .filter((t, i, arr) => arr.indexOf(t) === i)
    .slice(0, 12);

  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    extra: { keywords: [service.title, ...keywords] },
  });
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Promogranade",
      url: "https://promogranade.com",
    },
    url: `https://promogranade.com/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicePageClient service={service} />
      <Footer />
    </>
  );
}
