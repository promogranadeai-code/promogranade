"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import type { ServicePage } from "@/lib/services-data";

/* ─── Icon map ─────────────────────────────────────────────── */

const icons: Record<string, React.ReactNode> = {
  web: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="8" width="32" height="24" rx="3" />
      <line x1="4" y1="14" x2="36" y2="14" />
      <circle cx="9" cy="11" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="11" r="1.2" fill="currentColor" stroke="none" />
      <rect x="10" y="19" width="10" height="7" rx="1.5" />
      <line x1="24" y1="20" x2="32" y2="20" />
      <line x1="24" y1="23" x2="30" y2="23" />
      <line x1="24" y1="26" x2="32" y2="26" />
      <line x1="10" y1="29" x2="20" y2="29" />
      <line x1="10" y1="32" x2="16" y2="32" />
    </svg>
  ),
  apps: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="14" height="14" rx="3" />
      <rect x="22" y="4" width="14" height="14" rx="3" />
      <rect x="4" y="22" width="14" height="14" rx="3" />
      <rect x="22" y="22" width="14" height="14" rx="3" />
    </svg>
  ),
  agents: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="20" cy="20" r="5" />
      <circle cx="7" cy="10" r="3" />
      <circle cx="33" cy="10" r="3" />
      <circle cx="7" cy="30" r="3" />
      <circle cx="33" cy="30" r="3" />
      <circle cx="20" cy="5" r="3" />
      <line x1="10" y1="11" x2="16" y2="17" />
      <line x1="30" y1="11" x2="24" y2="17" />
      <line x1="10" y1="29" x2="16" y2="23" />
      <line x1="30" y1="29" x2="24" y2="23" />
      <line x1="20" y1="8" x2="20" y2="15" />
    </svg>
  ),
  seo: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="18" r="10" />
      <line x1="26" y1="26" x2="36" y2="36" />
      <line x1="10" y1="22" x2="26" y2="22" />
      <line x1="8" y1="18" x2="10" y2="18" />
      <line x1="12" y1="14" x2="26" y2="14" />
    </svg>
  ),
  social: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="20" r="4" />
      <circle cx="32" cy="10" r="4" />
      <circle cx="32" cy="30" r="4" />
      <line x1="12" y1="18" x2="28" y2="12" />
      <line x1="12" y1="22" x2="28" y2="28" />
    </svg>
  ),
  ads: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 30 L14 14 L22 22 L30 10 L34 30" />
      <path d="M14 14 L14 30" />
      <path d="M22 22 L22 30" />
    </svg>
  ),
  workflow: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="16" width="10" height="8" rx="2" />
      <rect x="30" y="16" width="10" height="8" rx="2" />
      <rect x="15" y="8" width="10" height="8" rx="2" />
      <rect x="15" y="24" width="10" height="8" rx="2" />
      <line x1="14" y1="20" x2="15" y2="20" />
      <line x1="25" y1="12" x2="30" y2="20" />
      <line x1="25" y1="28" x2="30" y2="20" />
      <line x1="15" y1="20" x2="14" y2="20" />
    </svg>
  ),
  ai: (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="20" cy="8" r="3" />
      <circle cx="20" cy="20" r="3" />
      <circle cx="20" cy="32" r="3" />
      <circle cx="8" cy="14" r="3" />
      <circle cx="32" cy="14" r="3" />
      <circle cx="8" cy="26" r="3" />
      <circle cx="32" cy="26" r="3" />
      <line x1="11" y1="14" x2="17" y2="20" />
      <line x1="29" y1="14" x2="23" y2="20" />
      <line x1="11" y1="26" x2="17" y2="20" />
      <line x1="29" y1="26" x2="23" y2="20" />
      <line x1="20" y1="11" x2="20" y2="17" />
      <line x1="20" y1="23" x2="20" y2="29" />
    </svg>
  ),
};

/* ─── Main component ───────────────────────────────────────── */

export function ServicePageClient({ service }: { service: ServicePage }) {
  const icon = icons[service.iconKey] ?? icons.web;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section-a relative overflow-hidden">
        <HeroBackdrop />

        {/* spacer behind nav */}
        <div className="pt-16" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-24 lg:pt-20 lg:pb-36">

          {/* Back + eyebrow */}
          <FadeUp>
            <div className="flex items-center gap-6 mb-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[color:var(--section-muted)] hover:text-[var(--accent)] transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                All services
              </Link>
              <span className="h-px w-8 bg-[color:var(--section-border)]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
                {service.eyebrow}
              </span>
            </div>
          </FadeUp>

          {/* Icon + title */}
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-10">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.75rem,8vw,8.5rem)] font-black leading-[0.88] tracking-[-0.045em]"
              >
                {service.title}
              </TextReveal>
            </div>
            <FadeUp delay={0.15} className="lg:col-span-2 flex lg:justify-end">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-[0_24px_60px_-16px_rgba(224,20,44,0.55)]">
                {icon}
              </div>
            </FadeUp>
          </div>

          {/* Description + CTA */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <FadeUp delay={0.2} className="lg:col-span-8">
              <p className="text-lg md:text-xl leading-relaxed text-[color:var(--section-muted)]">
                {service.description}
              </p>
            </FadeUp>
            <FadeUp delay={0.3} className="lg:col-span-4 flex lg:justify-end items-start">
              <a
                href="mailto:hello@promogranade.com"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── GROUPS ─────────────────────────────────────────── */}
      {service.groups.map((group, gi) => (
        <GroupSection key={group.label} group={group} index={gi} />
      ))}

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FaqSection faqs={service.faqs} />

      {/* ── CTA STRIP ──────────────────────────────────────── */}
      <CtaSection serviceName={service.title} />
    </>
  );
}

/* ─── Group section ────────────────────────────────────────── */

function GroupSection({ group, index }: { group: ServicePage["groups"][0]; index: number }) {
  return (
    <section className="section-a relative overflow-hidden py-20 lg:py-32">
      {/* accent stripe */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(to bottom, transparent, var(--accent) 30%, var(--accent) 70%, transparent)`, opacity: 0.35 }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Group header */}
        <div className="grid gap-8 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[color:var(--section-border)]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--section-muted)]">
                0{index + 1} — {group.label}
              </span>
            </div>
            <TextReveal
              as="h2"
              className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.035em]"
            >
              {`${group.label}.`}
            </TextReveal>
          </div>
          {group.intro && (
            <FadeUp delay={0.1} className="lg:col-span-6">
              <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
                {group.intro}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Cards grid */}
        <div
          className={`grid gap-5 ${
            group.items.length >= 5
              ? "md:grid-cols-2 lg:grid-cols-3"
              : group.items.length === 4
              ? "md:grid-cols-2 lg:grid-cols-2"
              : group.items.length === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2"
          }`}
        >
          {group.items.map((item, idx) => (
            <ServiceCard key={item.title} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Service card ─────────────────────────────────────────── */

function ServiceCard({ item, index }: { item: ServicePage["groups"][0]["items"][0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-7 overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500"
    >
      {/* top edge glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"
      />

      <div className="flex items-start gap-4 mb-4">
        <span className="mt-0.5 shrink-0 text-[var(--accent)]">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight leading-tight">
          {item.title}
        </h3>
      </div>

      <p className="text-sm md:text-base leading-relaxed text-[color:var(--section-muted)] ml-9">
        {item.blurb}
      </p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 ml-9">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── FAQ section ──────────────────────────────────────────── */

function FaqSection({ faqs }: { faqs: ServicePage["faqs"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-b relative overflow-hidden py-20 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-10 bg-[color:var(--section-border)]" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--section-muted)]">
            Frequently asked
          </span>
        </div>
        <TextReveal
          as="h2"
          className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-black leading-[0.92] tracking-[-0.035em] mb-12"
        >
          Questions, answered.
        </TextReveal>

        <div className="divide-y divide-[color:var(--section-border)] border-y border-[color:var(--section-border)]">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[color:var(--section-muted)] transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--accent)]" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base leading-relaxed text-[color:var(--section-muted)]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA section ──────────────────────────────────────────── */

function CtaSection({ serviceName }: { serviceName: string }) {
  const WA = `https://wa.me/919511784952?text=${encodeURIComponent(
    `Hi Promogranade, I'd like to talk about ${serviceName}.`
  )}`;

  return (
    <section className="section-a relative overflow-hidden py-24 lg:py-36">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-10 md:p-16">
          {/* background accent orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", opacity: 0.06 }}
          />

          <div className="relative grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--section-muted)] mb-4">
                Ready to start?
              </p>
              <p className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[0.92] tracking-[-0.035em]">
                Let&apos;s talk about your project.
              </p>
              <p className="mt-5 text-base text-[color:var(--section-muted)] max-w-lg leading-relaxed">
                We&apos;ll ask the right questions, scope it honestly, and tell you exactly what it takes to hit your goal — before you commit to anything.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <a
                href="mailto:hello@promogranade.com"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Email us
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[color:var(--section-border)] px-8 py-4 text-sm font-semibold text-[color:var(--section-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                WhatsApp us
              </a>
              <p className="text-[10px] text-[color:var(--section-muted)] text-right">
                We reply within one business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
