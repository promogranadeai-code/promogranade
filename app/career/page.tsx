import { Footer } from "@/components/layout/Footer";
import { CareerForm } from "@/components/career/CareerForm";

export const metadata = {
  title: "Career — Promogranade",
};

export default function CareerPage() {
  return (
    <>
      {/* spacer so the form clears the fixed nav */}
      <div className="pt-24" />
      <CareerForm />
      <Footer />
    </>
  );
}
