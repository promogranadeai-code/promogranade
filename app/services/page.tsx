import { ContactPreview } from "@/components/home/ContactPreview";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Services — Promogranade",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we do."
        description="Eight disciplines. One senior team. From first pixel to first paying customer — we own the outcome end to end."
        tone="b"
      />
      <ServicesGrid />
      <ContactPreview />
    </>
  );
}
