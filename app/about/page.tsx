import { PageHero } from "@/components/ui/PageHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About",
  description:
    "Promogranade is a senior team of designers, engineers, and marketers building web applications, AI systems, and growth engines. Meet the studio behind the work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Promogranade",
    description: "A studio built to ship. Meet the senior team behind Promogranade.",
    type: "website",
    url: "https://promogranade.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — About"
        title="A studio built to ship."
        description="Promogranade is a senior team of designers, engineers, and marketers. We treat every launch like our own product."
      />
      <AboutStory />
      <AboutTeam />
      <AboutTestimonials />
      <Footer />
    </>
  );
}
