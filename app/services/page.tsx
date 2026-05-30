import { Footer } from "@/components/layout/Footer";
import { ContactPreview } from "@/components/home/ContactPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";

export const metadata = {
  title: "Services — Promogranade",
};

export default function ServicesPage() {
  return (
    <>
      {/* Spacer to push content below the fixed nav */}
      <div className="pt-24" />
      <ServicesPreview />
      <ContactPreview />
      <Footer />
    </>
  );
}
