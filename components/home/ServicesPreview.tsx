"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "../ui/TextReveal";

const services = [
  {
    n: "01",
    title: "Website Development",
    blurb:
      "Conversion-focused websites built on WordPress, Shopify, or fully custom Next.js — pixel-perfect, blazing fast, and built to grow.",
    tags: ["WordPress", "Shopify", "Next.js"],
    slug: "/services/web-development",
  },
  {
    n: "02",
    title: "Custom Applications",
    blurb:
      "Bespoke web apps, SaaS platforms, ERP systems, and agentic dashboards engineered exactly to your specification.",
    tags: ["SaaS", "ERP", "Dashboards"],
    slug: "/services/web-development",
  },
  {
    n: "03",
    title: "AI Agentic Development",
    blurb:
      "Intelligent agents that plan, act, and self-correct — from single-model tools to full multi-agent orchestration systems.",
    tags: ["LangGraph", "Claude", "Multi-agent"],
    slug: "/services/ai-automations",
  },
  {
    n: "04",
    title: "SEO / GEO / AEO",
    blurb:
      "Get found by people and AI alike. Search, generative engine, and answer engine optimisation that compounds every month.",
    tags: ["SEO", "GEO", "AEO"],
    slug: "/services/marketing",
  },
  {
    n: "05",
    title: "Social Media Marketing",
    blurb:
      "Content strategy, creative production, and community management across every platform that matters to your audience.",
    tags: ["Instagram", "LinkedIn", "YouTube"],
    slug: "/services/marketing",
  },
  {
    n: "06",
    title: "Meta & Google Ads",
    blurb:
      "Performance campaigns with sharp targeting, rigorous A/B testing, and media spend that scales proportionally with results.",
    tags: ["Meta Ads", "Google Ads", "Performance"],
    slug: "/services/marketing",
  },
  {
    n: "07",
    title: "Workflow Automation",
    blurb:
      "Make.com, n8n, and custom integrations that eliminate manual work from your operations — running reliably, 24/7.",
    tags: ["n8n", "Make.com", "Zapier"],
    slug: "/services/ai-automations",
  },
  {
    n: "08",
    title: "Custom AI Systems",
    blurb:
      "Full-stack AI builds — RAG pipelines, fine-tuned models, vector databases, and production-grade inference infrastructure.",
    tags: ["RAG", "Fine-tuning", "LLMs"],
    slug: "/services/ai-automations",
  },
];

export function ServicesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragRange, setDragRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDragRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -dragRange]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative section-a"
      style={{ height: `calc(100vh + ${dragRange}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-6 lg:px-10 pt-20 pb-6 shrink-0">
          <FadeUp>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
                <span className="h-px w-12 bg-[color:var(--section-border)]" />
                <span>02 — What we do</span>
              </div>
              <p className="hidden md:block text-xs uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
                scroll to explore →
              </p>
            </div>
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.03em] mt-4"
          >
            What we do.
          </TextReveal>
        </div>

        {/* Horizontal cards track */}
        <div className="flex-1 overflow-hidden min-h-0">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full gap-4 pl-6 lg:pl-10 pr-24"
          >
            {services.map((s, i) => (
              <ServiceCard key={s.n} service={s} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[var(--accent)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <Link
      href={service.slug}
      data-cursor="open"
      className="group relative flex flex-col w-[280px] md:w-[360px] lg:w-[380px] h-full flex-shrink-0 rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-7 md:p-8 hover:border-[var(--accent)]/60 transition-all duration-500 overflow-hidden"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.03] transition-colors duration-500 pointer-events-none rounded-3xl" />

      {/* Top row */}
      <div className="flex items-start justify-between shrink-0">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
          {service.n}
        </span>
        <div className="h-10 w-10 rounded-full border border-[color:var(--section-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white transition-colors duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Title + content — pushed to bottom */}
      <div className="mt-auto">
        <h3 className="font-display text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
          {service.title}
        </h3>
        <p className="text-sm text-[color:var(--section-muted)] leading-relaxed mb-6">
          {service.blurb}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
