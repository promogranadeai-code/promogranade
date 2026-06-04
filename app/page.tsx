import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <BlogPreview />
      <ArcadeShowcase />
      <Footer />
    </>
  );
}
