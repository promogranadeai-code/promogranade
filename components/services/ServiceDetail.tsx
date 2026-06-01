"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { ReactNode } from "react";

export interface ServiceItem {
  title: string;
  blurb: string;
  tags?: string[];
}

export interface ServiceGroup {
  label: string;
  intro?: string;
  items: ServiceItem[];
}

interface ServiceDetailProps {
  eyebrow: string;
  title: string;
  description: string;
  /** A pre-rendered icon JSX node (so this client component receives a node,
      not a function reference, which would break across the RSC boundary). */
  icon: ReactNode;
  groups: ServiceGroup[];
  /** Override the visual tone — defaults to "a" (alternates with theme). */
  tone?: "a" | "b";
}

export function ServiceDetail({
  eyebrow,
  title,
  description,
  icon,
  groups,
  tone = "a",
}: ServiceDetailProps) {
  const sectionClass = tone === "a" ? "section-a" : "section-b";

  return (
    <>
      {/* HERO */}
      <section className={`${sectionClass} relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28`}>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          {/* Back link */}
          <FadeUp>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--section-muted)] hover:text-[var(--accent)] transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All services
            </Link>
          </FadeUp>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-8">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>{eyebrow}</span>
          </div>

          {/* Title + icon */}
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-9">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black leading-[0.92] tracking-[-0.04em]"
              >
                {title}
              </TextReveal>
            </div>
            <FadeUp delay={0.2} className="lg:col-span-3 flex lg:justify-end">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-[0_24px_60px_-20px_rgba(220,20,40,0.65)]">
                {icon}
              </div>
            </FadeUp>
          </div>

          {/* Description */}
          <FadeUp delay={0.3} className="mt-10 max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed text-[color:var(--section-muted)]">
              {description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* GROUPS — each rendered as an alternating section */}
      {groups.map((group, i) => (
        <GroupSection
          key={group.label}
          group={group}
          index={i}
          /* alternate tones so adjacent sections contrast */
          tone={i % 2 === 0 ? (tone === "a" ? "b" : "a") : tone}
        />
      ))}

      {/* CTA */}
      <CtaStrip />
    </>
  );
}

function GroupSection({
  group,
  index,
  tone,
}: {
  group: ServiceGroup;
  index: number;
  tone: "a" | "b";
}) {
  const sectionClass = tone === "a" ? "section-a" : "section-b";

  return (
    <section className={`${sectionClass} relative overflow-hidden py-20 lg:py-32`}>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Group header */}
        <div className="grid gap-10 lg:grid-cols-12 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-6">
              <span className="h-px w-10 bg-[color:var(--section-border)]" />
              <span>0{index + 1} — {group.label}</span>
            </div>
            <TextReveal
              as="h2"
              className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.03em]"
            >
              {`${group.label}.`}
            </TextReveal>
          </div>
          {group.intro && (
            <FadeUp delay={0.15} className="lg:col-span-5">
              <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
                {group.intro}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Items grid */}
        <div
          className={`grid gap-5 ${
            group.items.length >= 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2"
          }`}
        >
          {group.items.map((item, idx) => (
            <ItemCard key={item.title} item={item} index={idx} groupIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ItemCard({
  item,
  index,
  groupIndex,
}: {
  item: ServiceItem;
  index: number;
  groupIndex: number;
}) {
  const letter = String.fromCharCode(97 + index); // a, b, c, ...

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-7 md:p-8 overflow-hidden hover:border-[var(--accent)]/60 transition-colors duration-500"
    >
      {/* corner accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px right-10 h-px w-16 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50"
      />

      {/* Letter prefix */}
      <div className="flex items-start justify-between mb-5">
        <span className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg bg-[var(--accent)]/12 text-[var(--accent)] text-xs font-bold uppercase tracking-widest px-2">
          {letter}
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--section-muted)] pt-1">
          0{groupIndex + 1}.{index + 1}
        </span>
      </div>

      <p className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-3">
        {item.title}
      </p>
      <p className="text-sm md:text-base leading-relaxed text-[color:var(--section-muted)]">
        {item.blurb}
      </p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CtaStrip() {
  return (
    <section className="section-b relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <p className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-tight">
              Have a project in mind?
            </p>
            <p className="mt-2 text-sm md:text-base text-[color:var(--section-muted)] max-w-xl">
              Tell us the outcome — we&apos;ll scope the shortest path to it.
            </p>
          </div>
          <Link
            href="mailto:hello@promogranade.com"
            className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[color:var(--sec-b-fg)] hover:text-[color:var(--sec-b-bg)] transition-colors"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
