import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Arcade — Promogranade",
  description: "The tools, prompt patterns, and orchestration layer behind every Promogranade project.",
};

export default function ArcadePage() {
  return (
    <>
      <div className="pt-20" />
      <ArcadeShowcase tone="a" />
      <Footer />
    </>
  );
}
