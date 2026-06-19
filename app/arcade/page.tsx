import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { ArcadePrinciples } from "@/components/arcade/ArcadePrinciples";
import { PageHero } from "@/components/ui/PageHero";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Arcade",
  description: "The tools, prompt patterns, and orchestration layer behind every Promogranade project.",
  alternates: { canonical: "/arcade" },
  openGraph: {
    title: "Arcade — Promogranade",
    description: "The tools, prompt patterns, and orchestration layer behind every Promogranade project.",
    type: "website",
    url: "https://promogranade.com/arcade",
  },
};

export default function ArcadePage() {
  return (
    <>
      <PageHero
        eyebrow="Arcade"
        title="The stack behind the work."
        description="No mystery, no secret sauce. The toolkit, the prompt patterns, and the orchestration layer behind every Promogranade project — and the principles that keep it from cutting corners."
      />
      <ArcadeShowcase tone="b" />
      <ArcadePrinciples />
      <Footer />
    </>
  );
}
