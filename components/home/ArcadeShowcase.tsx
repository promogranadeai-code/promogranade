"use client";

import { motion } from "framer-motion";
import { Wrench, Sparkles, Workflow as WorkflowIcon } from "lucide-react";
import { TextReveal, FadeUp } from "../ui/TextReveal";

interface Stack {
  id: string;
  label: string;
  Icon: typeof Wrench;
  blurb: string;
  items: string[];
}

const stacks: Stack[] = [
  {
    id: "tools",
    label: "Tools",
    Icon: Wrench,
    blurb:
      "The everyday kit. The editors, copilots, design boards and infra we reach for on every project.",
    items: [
      "Cursor",
      "Claude Code",
      "ChatGPT",
      "GitHub Copilot",
      "Figma",
      "Linear",
      "Vercel",
      "Supabase",
      "PostgreSQL",
      "Notion",
    ],
  },
  {
    id: "prompts",
    label: "Prompts",
    Icon: Sparkles,
    blurb:
      "Battle-tested prompt patterns we use to steer models — from research to code generation to copy.",
    items: [
      "Chain-of-thought",
      "Few-shot examples",
      "Role priming",
      "ReAct",
      "Self-critique",
      "Plan-and-execute",
      "Structured output",
      "RAG context-fill",
      "Tree-of-thought",
      "Reflexion",
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    Icon: WorkflowIcon,
    blurb:
      "How work gets stitched together — orchestration tools that turn agents and APIs into running systems.",
    items: [
      "n8n",
      "Zapier",
      "Make",
      "LangChain",
      "LangGraph",
      "Temporal",
      "Inngest",
      "Trigger.dev",
      "Airflow",
      "Pipedream",
    ],
  },
];

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
          {stacks.map((stack, i) => (
            <StackColumn key={stack.id} stack={stack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackColumn({ stack, index }: { stack: Stack; index: number }) {
  const { Icon, label, blurb, items } = stack;

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
      className="arc-card group relative rounded-3xl p-7 md:p-8 overflow-hidden"
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
      <p className="font-display text-3xl font-bold tracking-tight leading-tight mb-3">
        {label}
      </p>

      {/* Blurb */}
      <p className="arc-card-muted text-sm leading-relaxed mb-6">{blurb}</p>

      {/* Divider */}
      <div className="arc-card-divider h-px mb-6" />

      {/* Items */}
      <ul className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <motion.li
            key={item}
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
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
