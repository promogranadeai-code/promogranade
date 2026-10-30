import { Footer } from "@/components/layout/Footer";
import { CareerForm } from "@/components/career/CareerForm";
import { CareerCulture } from "@/components/career/CareerCulture";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers: Join Our Senior Web & AI Team",
  description:
    "Join Promogranade. We're a lean, senior team of developers, AI engineers, and marketing operators — no juniors, no fluff. See open roles and apply.",
  path: "/career",
  socialDescription: "Join a lean, senior team building web apps, AI systems, and growth engines.",
});

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
