import { PageHero } from "@/components/ui/PageHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutManifesto } from "@/components/about/AboutManifesto";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us: Senior Web, AI & Growth Team",
  description:
    "Promogranade is a senior team of designers, engineers, and marketers building web applications, AI systems, and growth engines. Meet the studio behind the work.",
  path: "/about",
  socialDescription: "Obsessed with outcomes, not optics. Meet the senior team behind Promogranade.",
});

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
