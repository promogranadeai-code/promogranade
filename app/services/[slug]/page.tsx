import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServiceBySlug } from "@/lib/services-data";
import { ServicePageClient } from "@/components/services/ServicePageClient";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} — Promogranade`,
    description: service.description,
  };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServicePageClient service={service} />
      <Footer />
    </>
  );
}
