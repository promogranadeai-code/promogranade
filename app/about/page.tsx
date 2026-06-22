import { PageHero } from "@/components/ui/PageHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutManifesto } from "@/components/about/AboutManifesto";
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
    description: "Obsessed with outcomes, not optics. Meet the senior team behind Promogranade.",
    type: "website",
    url: "https://promogranade.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — About"
        title="Obsessed with outcomes, not optics."
        description="Promogranade is a senior team of designers, engineers, and AI/marketing operators who treat your roadmap like our own startup. No juniors, no hand-offs, no theatre — just relentless execution until the numbers move."
      />
      <AboutStory />
      <AboutManifesto />
      <AboutTeam />
      <AboutTestimonials />
      <Footer />
    </>
  );
}
