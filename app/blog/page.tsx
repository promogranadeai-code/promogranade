import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { allPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Promogranade",
  description:
    "Field notes from Promogranade. In-depth articles on AI agents, SEO, workflow automation, web development, and digital marketing.",
  keywords: [
    "AI blog 2025", "digital marketing blog", "web development blog",
    "SEO tips 2025", "workflow automation guide", "Promogranade blog",
  ],
  openGraph: {
    title: "Blog — Promogranade",
    description: "Field notes on AI, SEO, automation, and growth from the Promogranade team.",
    type: "website",
  },
};

export default function BlogPage() {
  const [hero, ...rest] = allPosts;

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="pt-32 pb-20 section-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-8">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>Field notes</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] text-[color:var(--sec-b-fg)] mb-6">
            The Build Log.
          </h1>
          <p className="text-base md:text-lg text-[color:var(--section-muted)] max-w-2xl leading-relaxed">
            Real-world notes on AI systems, performance marketing, web architecture, and
            growth — written by the team that builds and ships these things every day.
          </p>
        </div>
      </div>

      {/* ── Featured post ──────────────────────────────────────── */}
      <div className="section-a py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href={`/blog/${hero.slug}`}
            className="group block rounded-3xl overflow-hidden border border-[color:var(--section-border)] hover:border-[var(--accent)] transition-colors duration-300"
          >
            <div className="grid lg:grid-cols-2">
              {/* Gradient thumbnail */}
              <div
                className="h-56 lg:h-auto min-h-[280px]"
                style={{ background: hero.categoryColor }}
              />
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-between bg-[color:var(--section-surface)]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      {hero.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[color:var(--section-muted)]">
                      Featured
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl font-black leading-tight tracking-tight mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {hero.title}
                  </h2>
                  <p className="text-sm md:text-base text-[color:var(--section-muted)] leading-relaxed mb-8">
                    {hero.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[color:var(--section-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {hero.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {hero.read} read
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                    Read
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ── All remaining posts grid ───────────────────────────── */}
      <div className="section-a pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-12">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>All articles</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Mini gradient */}
                <div
                  className="h-36 shrink-0"
                  style={{ background: post.categoryColor }}
                />
                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-[9px] uppercase tracking-[0.3em] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-display text-lg md:text-xl font-bold leading-snug tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors duration-200 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[color:var(--section-muted)] leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[color:var(--section-border)]">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[color:var(--section-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.read}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
