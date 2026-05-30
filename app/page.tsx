import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CareerPreview } from "@/components/home/CareerPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ArcadeShowcase } from "@/components/home/ArcadeShowcase";
import { ContactPreview } from "@/components/home/ContactPreview";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <CareerPreview />
      <BlogPreview />
      <ArcadeShowcase />
      <ContactPreview />
      <Footer />
    </>
  );
}
