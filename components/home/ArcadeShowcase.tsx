"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Sparkles, Workflow as WorkflowIcon, ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { arcadeCategories, type ArcadeCategory } from "@/lib/arcade-data";

const ICONS: Record<ArcadeCategory["id"], typeof Wrench> = {
  tools: Wrench,
  prompts: Sparkles,
  workflows: WorkflowIcon,
};

export function ArcadeShowcase({ tone = "b" }: { tone?: "a" | "b" }) {
  return (
    <section
      id="arcade"
      className={`${tone === "a" ? "section-a" : "section-b"} relative overflow-hidden py-24 lg:py-36 isolate`}
      style={{ zIndex: 1 }}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow */}
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>Arcade · The stack</span>
          </div>
        </FadeUp>

        {/* Header row */}
        <div className="grid gap-10 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.03em]"
            >
              What we build with.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              No mystery, no secret sauce. Here&apos;s the toolkit, the prompt
              patterns, and the orchestration layer behind every Promogranade
              project.
            </p>
          </FadeUp>
        </div>

        {/* Three stack columns */}
        <div className="grid gap-6 md:grid-cols-3">
          {arcadeCategories.map((stack, i) => (
            <StackColumn key={stack.id} stack={stack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackColumn({ stack, index }: { stack: ArcadeCategory; index: number }) {
  const { label, blurb, items, id } = stack;
  const Icon = ICONS[id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/arcade/${id}`}
        data-cursor="visit"
        className="arc-card group relative flex h-full flex-col rounded-3xl p-7 md:p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      >
        {/* Header row: icon + index number */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-[0_8px_20px_-8px_rgba(220,20,40,0.6)]">
            <Icon className="h-5 w-5" />
          </span>
          <span className="arc-card-muted text-[10px] font-bold uppercase tracking-[0.25em] pt-1">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <p className="font-display text-3xl font-bold tracking-tight leading-tight">
            {label}
          </p>
          <ArrowUpRight className="h-4 w-4 text-[var(--accent)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>

        {/* Blurb */}
        <p className="arc-card-muted text-sm leading-relaxed mb-6">{blurb}</p>

        {/* Divider */}
        <div className="arc-card-divider h-px mb-6" />

        {/* Items */}
        <ul className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.2 + idx * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="arc-chip">
                <span className="arc-chip-dot" />
                {item.name}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* View details affordance — mt-auto anchors it to the bottom so all
            three cards line up evenly regardless of how many items/how much
            text wrapping each category's chip list has. */}
        <p className="relative mt-auto pt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          View details
          <ArrowUpRight className="h-3 w-3" />
        </p>
      </Link>
    </motion.div>
  );
}
