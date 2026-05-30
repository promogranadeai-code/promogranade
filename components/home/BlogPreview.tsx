"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    date: "May 2026",
    category: "AI",
    title: "We replaced 6 SDR seats with one agent. Here's the architecture.",
    read: "8 min",
    accent: "linear-gradient(135deg, #e0142c, #7a0014)",
  },
  {
    date: "Apr 2026",
    category: "SEO",
    title: "AEO is the new SEO. The five passages that get cited by ChatGPT.",
    read: "6 min",
    accent: "linear-gradient(135deg, #1a1a1a, #444)",
  },
  {
    date: "Apr 2026",
    category: "Engineering",
    title: "Why we ditched our component library and built our own primitives.",
    read: "10 min",
    accent: "linear-gradient(135deg, #e0142c, #1a1a1a)",
  },
];

export function BlogPreview() {
  return (
    <section
      id="blog"
      className="section-a relative overflow-hidden py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
              <span className="h-px w-12 bg-[color:var(--section-border)]" />
              <span>04 — Field notes</span>
            </div>
            <Link
              href="/blog"
              data-cursor="all posts"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--accent)] transition-colors"
            >
              All posts <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>

        <TextReveal
          as="h2"
          className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em] mb-20"
        >
          Notes from the build.
        </TextReveal>

        <ul className="divide-y divide-[color:var(--section-border)] border-y border-[color:var(--section-border)]">
          {posts.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href="/blog"
                data-cursor="read"
                className="group grid grid-cols-12 items-center gap-4 py-8 md:py-10"
              >
                <span className="col-span-3 md:col-span-2 text-xs uppercase tracking-widest text-[color:var(--section-muted)]">
                  {p.date}
                </span>
                <span className="col-span-3 md:col-span-2 text-[10px] uppercase tracking-widest">
                  <span className="rounded-full border border-[color:var(--section-border)] px-3 py-1 text-[color:var(--section-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                    {p.category}
                  </span>
                </span>
                <span className="col-span-6 md:col-span-7 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="hidden md:block h-14 w-20 rounded-lg shrink-0 opacity-90"
                    style={{ background: p.accent }}
                  />
                  <p className="font-display text-xl md:text-3xl font-bold leading-snug tracking-tight group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-500">
                    {p.title}
                  </p>
                </span>
                <span className="hidden md:flex col-span-1 justify-end items-center text-xs text-[color:var(--section-muted)]">
                  {p.read}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
