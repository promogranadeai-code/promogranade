"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { Counter } from "../ui/Counter";

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="about"
      className="section-b relative overflow-hidden py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>01 — About us</span>
          </div>
        </FadeUp>

        <div className="grid gap-16 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              A studio built to ship.
            </TextReveal>
          </div>

          <FadeUp delay={0.2} className="lg:col-span-5">
            <p className="text-lg md:text-xl leading-relaxed text-[color:var(--section-muted)] max-w-md">
              Promogranade is a tight, senior team that pairs design intuition
              with engineering depth. We move fast, write everything in-house,
              and treat your launch like our own.
            </p>
            <Link href="/about" data-cursor="discover" className="inline-block mt-8">
              <MagneticButton className="inline-flex items-center gap-3 rounded-full border border-[color:var(--section-border)] px-6 py-3 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                Our story
                <span>→</span>
              </MagneticButton>
            </Link>
          </FadeUp>
        </div>

        <FadeUp delay={0.3} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 12, suffix: "+", label: "Projects served" },
            { n: 5, suffix: "+", label: "Industries served" },
            { n: 4, suffix: "+ yrs", label: "Avg. experience" },
            { n: 100, suffix: "%", label: "On-time delivery" },
          ].map((s) => (
            <div
              key={s.label}
              className="border-t border-[color:var(--section-border)] pt-5"
              data-cursor="stat"
            >
              <Counter
                value={s.n}
                suffix={s.suffix}
                className="font-display text-4xl md:text-6xl font-bold tracking-tight tabular-nums"
              />
              <p className="mt-2 text-xs uppercase tracking-widest text-[color:var(--section-muted)]">
                {s.label}
              </p>
            </div>
          ))}
        </FadeUp>

        <ProcessDiagram />
      </div>
    </section>
  );
}

function ProcessDiagram() {
  const steps = [
    { n: "01", title: "Discover", blurb: "Goals, constraints, real users." },
    { n: "02", title: "Design", blurb: "Brand, flow, prototype." },
    { n: "03", title: "Build", blurb: "Senior team, weekly demos." },
    { n: "04", title: "Grow", blurb: "Measure. Iterate. Scale." },
  ];

  return (
    <div className="mt-32 lg:mt-40 mx-auto max-w-4xl">
      <FadeUp>
        <div className="flex items-center justify-between gap-6 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
            How we work
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] hidden md:block">
            Typical engagement: 4–12 weeks
          </p>
        </div>
      </FadeUp>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: i * 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                  delay: i * 0.25 + 0.05,
                }}
                className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white font-display font-bold text-lg shrink-0"
              >
                {s.n}
              </motion.span>
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.25 + 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="hidden md:inline-block flex-1 h-px bg-[color:var(--section-border)] origin-left"
                />
              )}
            </div>
            <p className="font-display text-2xl font-bold tracking-tight mb-1">
              {s.title}
            </p>
            <p className="text-sm text-[color:var(--section-muted)] leading-relaxed">
              {s.blurb}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
