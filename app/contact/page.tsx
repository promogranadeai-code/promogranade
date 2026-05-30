import { Footer } from "@/components/layout/Footer";
import { ContactPreview } from "@/components/home/ContactPreview";

export const metadata = {
  title: "Contact — Promogranade",
};

export default function ContactPage() {
  return (
    <>
      {/* spacer so the first section clears the fixed nav */}
      <div className="pt-24" />
      <ContactPreview />
      <Footer />
    </>
  );
}
