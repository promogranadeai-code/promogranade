import { Footer } from "@/components/layout/Footer";
import { CareerForm } from "@/components/career/CareerForm";

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
      {/* spacer so the form clears the fixed nav */}
      <div className="pt-24" />
      <CareerForm />
      <Footer />
    </>
  );
}
