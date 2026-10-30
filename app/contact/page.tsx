import { Footer } from "@/components/layout/Footer";
import { ContactPreview } from "@/components/home/ContactPreview";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us: Start Your Web or AI Project",
  description:
    "Get in touch with Promogranade. Tell us about your project and we'll reply within one business day with honest scoping, not a sales pitch.",
  path: "/contact",
  socialDescription: "Tell us about your project. We reply within one business day.",
});

export default function ContactPage() {
  return (
    <>
      {/* spacer so the first section clears the fixed nav */}
      <div className="pt-24" />
      <ContactPreview headingAs="h1" />
      <Footer />
    </>
  );
}
