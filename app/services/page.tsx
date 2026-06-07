import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Services — Promogranade",
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
