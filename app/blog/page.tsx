import { Footer } from "@/components/layout/Footer";
import { BlogPreview } from "@/components/home/BlogPreview";

export const metadata = {
  title: "Blog — Promogranade",
};

export default function BlogPage() {
  return (
    <>
      {/* spacer so the first section clears the fixed nav */}
      <div className="pt-24" />
      <BlogPreview />
      <Footer />
    </>
  );
}
