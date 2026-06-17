import { Footer } from "@/components/layout/Footer";
import { ContactPreview } from "@/components/home/ContactPreview";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Promogranade. Tell us about your project and we'll reply within one business day with honest scoping, not a sales pitch.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Promogranade",
    description: "Tell us about your project. We reply within one business day.",
    type: "website",
    url: "https://promogranade.com/contact",
  },
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
