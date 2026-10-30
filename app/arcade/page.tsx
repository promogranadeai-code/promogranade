import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { ArcadePrinciples } from "@/components/arcade/ArcadePrinciples";
import { PageHero } from "@/components/ui/PageHero";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Arcade: The Tools, Prompts & Workflows We Use",
  description:
    "The tools, prompt patterns, and orchestration layer behind every Promogranade project — the editors, AI models and automations we use daily.",
  path: "/arcade",
});

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
