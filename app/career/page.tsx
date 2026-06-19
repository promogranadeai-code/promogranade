import { Footer } from "@/components/layout/Footer";
import { CareerForm } from "@/components/career/CareerForm";
import { CareerCulture } from "@/components/career/CareerCulture";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Careers",
  description:
    "Join Promogranade. We're a lean, senior team of developers, AI engineers, and marketing operators — no juniors, no fluff. See open roles and apply.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers — Promogranade",
    description: "Join a lean, senior team building web apps, AI systems, and growth engines.",
    type: "website",
    url: "https://promogranade.com/career",
  },
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build with us."
        description="A lean, senior team of developers, AI engineers, and marketing operators. No juniors handed your account, no fluff — just people who ship."
      />
      <CareerCulture />
      <CareerForm />
      <Footer />
    </>
  );
}
