"use client";

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

        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Built to ship. Engineered to win.
            </TextReveal>
          </div>

          <FadeUp delay={0.2} className="lg:col-span-5">
            <p className="text-lg md:text-xl leading-relaxed text-[color:var(--section-muted)] max-w-md">
              Promogranade is the senior team behind the products, websites, and
              AI systems that quietly out-build the competition. No handoffs, no
              juniors learning on your budget — just seasoned designers and
              engineers who own the outcome from first sketch to final ship. We
              move fast, write every line in-house, and treat your launch like
              our own reputation depends on it. Because, honestly, it does.
            </p>
            <Link href="/about" data-cursor="discover" className="inline-block mt-8">
              <MagneticButton className="inline-flex items-center gap-3 rounded-full border border-[color:var(--section-border)] px-6 py-3 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                Our story
                <span>→</span>
              </MagneticButton>
            </Link>
          </FadeUp>
        </div>

        <FadeUp delay={0.3} className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-12">
            {/* accent glow — subtle red wash that highlights the panel on both themes */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.16] blur-3xl"
            />
            {/* accent edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
            />

            {/* header */}
            <div className="relative mb-10 flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Track record
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
                Small team · outsized output
              </p>
            </div>

            {/* stats */}
            <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-0">
              {[
                { n: 12, accent: "+", unit: "", label: "Projects shipped" },
                { n: 5, accent: "+", unit: "", label: "Industries served" },
                { n: 4, accent: "+", unit: "yrs", label: "Avg. experience" },
                { n: 100, accent: "%", unit: "", label: "On-time delivery" },
              ].map((s) => (
                <div
                  key={s.label}
                  data-cursor="stat"
                  className="group/stat md:border-l md:border-[color:var(--section-border)] md:pl-8 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="mb-4 block h-1 w-8 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover/stat:w-16" />
                  <div className="flex items-baseline gap-0.5 font-display text-5xl md:text-6xl font-black tracking-tight tabular-nums">
                    <Counter value={s.n} />
                    <span className="text-[var(--accent)]">{s.accent}</span>
                    {s.unit && (
                      <span className="ml-1.5 text-base md:text-lg font-bold text-[color:var(--section-muted)]">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-widest text-[color:var(--section-muted)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
