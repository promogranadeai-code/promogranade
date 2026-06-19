import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 — Lost in the build"
        title="This page didn't ship."
        description="The link you followed is broken, moved, or never existed. Let's get you back to something that actually works."
      />
      <section className="section-a relative overflow-hidden py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/"
              data-cursor="home"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--accent)] text-white px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <a
              href="mailto:hello@promogranade.com"
              data-cursor="email"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--section-border)] px-7 py-4 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Tell us it's broken
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mt-14 pt-10 border-t border-[color:var(--section-border)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-6">
              Or try one of these
            </p>
            <div className="flex flex-wrap gap-3">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--section-border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
