import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { BlogVisual } from "@/components/blog/BlogVisual";
import { SectionVisual } from "@/components/blog/SectionVisual";
import { allPosts, getPost } from "@/lib/blog";

/* ─── Static params (pre-render all post pages at build time) ── */

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

/* ─── Per-post SEO metadata ────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: "Promogranade" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `https://promogranade.com/blog/${post.slug}`,
      publishedTime: post.dateISO,
      authors: ["Promogranade"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  /* JSON-LD structured data for Google rich results */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { "@type": "Organization", name: "Promogranade", url: "https://promogranade.com" },
    publisher: {
      "@type": "Organization",
      name: "Promogranade",
      url: "https://promogranade.com",
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  /* Related posts — same category, excluding current */
  const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: post.categoryColor }}
      >
        {/* Animated topic infographic, faded behind the headline */}
        <BlogVisual
          slug={post.slug}
          category={post.category}
          gradient={post.categoryColor}
          variant="hero"
          transparent
          className="absolute inset-0 opacity-50"
        />
        {/* Legibility scrim — darkens the left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold px-3 py-1.5 rounded-full bg-white/20 text-white">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="h-3.5 w-3.5" /> {post.read} read
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
          </div>
          <h1 className="font-display text-[clamp(1.8rem,4.5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-white mb-6">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────── */}
      <div className="section-a py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <article className="prose-custom">
            {post.content.map((section, i) => (
              <div key={i} className="mb-14">
                <SectionVisual
                  slug={post.slug}
                  category={post.category}
                  index={i}
                />
                <h2 className="font-display text-2xl md:text-3xl font-black leading-tight tracking-tight mb-5 text-[color:var(--sec-a-fg)]">
                  {section.heading}
                </h2>
                <div className="text-base md:text-lg leading-[1.85] text-[color:var(--section-muted)] space-y-4">
                  {section.body.split("\n\n").map((para, pi) => {
                    /* Bold: **text** */
                    const rendered = para.split(/(\*\*[^*]+\*\*)/).map((part, idx) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={idx} className="font-semibold text-[color:var(--sec-a-fg)]">
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        part
                      )
                    );
                    return (
                      <p key={pi} className="leading-[1.85]">
                        {rendered}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-16 rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
                Want help applying this to your business?
              </p>
              <p className="text-sm text-[color:var(--section-muted)] max-w-md">
                We build custom AI systems, automate workflows, and run growth engines for
                ambitious businesses. Let&apos;s scope your project.
              </p>
            </div>
            <a
              href="mailto:hello@promogranade.com"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[var(--accent)]/90 transition-colors shrink-0"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Related posts ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="section-a pb-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
              <span className="h-px w-12 bg-[color:var(--section-border)]" />
              <span>More in {post.category}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
                >
                  <BlogVisual
                    slug={rp.slug}
                    category={rp.category}
                    gradient={rp.categoryColor}
                    variant="card"
                    className="h-24 shrink-0"
                  />
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                      {rp.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[color:var(--section-border)]">
                      <span className="text-[10px] uppercase tracking-widest text-[color:var(--section-muted)]">
                        {rp.date} · {rp.read}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
