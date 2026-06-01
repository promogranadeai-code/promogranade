"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";

import { services } from "@/components/home/ServicesPreview";

export function ServicesGrid() {
  return (
    <section className="section-a relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow + heading */}
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-8">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>Full service offering</span>
          </div>
        </FadeUp>

        <div className="grid gap-10 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Everything you need to grow.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              Eight focused disciplines. One senior team. Whether you need one
              service or the full stack, you get the same people start to finish.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const { Art } = s;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={s.slug}
                  data-cursor="open"
                  className="group relative flex flex-col h-full rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.03] transition-colors duration-500 pointer-events-none" />

                  {/* Illustration */}
                  <div className="relative h-44 shrink-0 border-b border-[color:var(--section-border)] overflow-hidden bg-[color:var(--section-surface)]">
                    <Art />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
                        {s.n}
                      </span>
                      <div className="h-8 w-8 rounded-full border border-[color:var(--section-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white transition-colors duration-300 shrink-0">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-500">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[color:var(--section-muted)] leading-relaxed mb-5 flex-1">
                      {s.blurb}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
