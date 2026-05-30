"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Bot, Megaphone, ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { useRef } from "react";

const services = [
  {
    n: "01",
    icon: Code2,
    title: "Web Development",
    blurb:
      "Custom websites and bespoke web applications. From WordPress and Shopify to fully custom-coded SaaS, agentic dashboards, and ERP systems.",
    slug: "/services/web-development",
    tags: ["WordPress", "Shopify", "Next.js"],
    art: <ArtCode />,
  },
  {
    n: "02",
    icon: Bot,
    title: "AI Automations",
    blurb:
      "Automate the manual. Make.com and n8n workflows, custom business automations, and full agentic systems that act, decide, and self-correct.",
    slug: "/services/ai-automations",
    tags: ["n8n", "LLM", "Agents"],
    art: <ArtAI />,
  },
  {
    n: "03",
    icon: Megaphone,
    title: "Marketing",
    blurb:
      "End-to-end growth — social, paid, creative, video, and the SEO/GEO/AEO playbook that gets you found by people and AI alike.",
    slug: "/services/marketing",
    tags: ["Paid", "Creative", "SEO"],
    art: <ArtMarketing />,
  },
];

export function ServicesPreview() {
  return (
    <section
      id="services"
      className="section-a relative overflow-hidden py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>02 — What we do</span>
          </div>
        </FadeUp>

        <div className="grid gap-12 lg:grid-cols-12 items-end mb-20">
          <div className="lg:col-span-8">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Three disciplines.
            </TextReveal>
            <TextReveal
              as="h2"
              delay={0.15}
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-[var(--accent)]"
            >
              One outcome: growth.
            </TextReveal>
          </div>
          <p className="lg:col-span-4 text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
            Pick a single service or hand us the whole funnel. Either way, you
            get the same senior team start to finish.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.n} {...s} index={i} />
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between gap-6 border-t border-[color:var(--section-border)] pt-8">
          <p className="text-sm text-[color:var(--section-muted)] max-w-md">
            Need something custom? Tell us the outcome — we&apos;ll scope the
            shortest path.
          </p>
          <Link
            href="/services"
            data-cursor="all services"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--accent)] transition-colors"
          >
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  n,
  icon: Icon,
  title,
  blurb,
  slug,
  tags,
  art,
  index,
}: {
  n: string;
  icon: typeof Code2;
  title: string;
  blurb: string;
  slug: string;
  tags: string[];
  art: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        ref={ref}
        href={slug}
        data-cursor="open"
        onPointerMove={handleMove}
        className="group relative block overflow-hidden rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-10 hover:border-[var(--accent)]/60 transition-all duration-500"
        style={{
          backgroundImage:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(224,20,44,0.16), transparent 50%)",
        }}
      >
        <div className="absolute right-0 top-0 h-full w-2/5 opacity-25 pointer-events-none">
          {art}
        </div>

        <div className="relative flex items-start justify-between mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
            {n}
          </span>
          <div className="h-12 w-12 rounded-full border border-[color:var(--section-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="relative font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
          {title}
        </h3>
        <p className="relative text-[color:var(--section-muted)] leading-relaxed mb-8 max-w-md">
          {blurb}
        </p>

        <div className="relative flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <ArrowUpRight className="absolute bottom-8 right-8 h-6 w-6 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] group-hover:rotate-45 transition-all duration-500" />
      </Link>
    </motion.div>
  );
}

function ArtCode() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 18} x2="200" y2={i * 18} opacity="0.3" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={20 + (i % 3) * 50}
            y={20 + Math.floor(i / 3) * 60}
            width={30 + (i * 7) % 25}
            height="6"
            fill="currentColor"
            opacity={0.5 - (i % 4) * 0.1}
          />
        ))}
      </g>
    </svg>
  );
}

function ArtAI() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {[...Array(6)].map((_, i) => {
          const cx = 40 + (i % 3) * 60;
          const cy = 60 + Math.floor(i / 3) * 80;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="currentColor" opacity="0.7" />
              {i < 5 && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={40 + ((i + 1) % 3) * 60}
                  y2={60 + Math.floor((i + 1) / 3) * 80}
                  opacity="0.4"
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function ArtSEO() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 200 Q60 160, 90 150 T170 60" />
        <circle cx="170" cy="60" r="6" fill="currentColor" />
        <circle cx="90" cy="150" r="4" fill="currentColor" opacity="0.7" />
        <circle cx="50" cy="180" r="3" fill="currentColor" opacity="0.5" />
      </g>
      <g fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.5">
        <text x="20" y="225">#1</text>
        <text x="175" y="60">★</text>
      </g>
    </svg>
  );
}

function ArtMarketing() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <g fill="currentColor">
        {[60, 90, 50, 110, 70, 130, 80, 150].map((h, i) => (
          <rect
            key={i}
            x={20 + i * 22}
            y={220 - h}
            width="14"
            height={h}
            opacity={0.4 + (i % 4) * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}
