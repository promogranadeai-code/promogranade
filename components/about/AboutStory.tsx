"use client";

import { FadeUp } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { TextReveal } from "@/components/ui/TextReveal";

const stats = [
  { n: 12, suffix: "+", label: "Projects served" },
  { n: 5,  suffix: "+", label: "Industries served" },
  { n: 4,  suffix: "+ yrs", label: "Avg. experience" },
  { n: 100, suffix: "%", label: "On-time delivery" },
];

export function AboutStory() {
  return (
    <section className="section-b relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-12">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>Our story</span>
        </div>

        {/* Headline + body copy */}
        <div className="grid gap-14 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Why we built this.
            </TextReveal>
          </div>

          <FadeUp delay={0.15} className="lg:col-span-7 space-y-5">
            <p className="text-lg md:text-xl leading-relaxed">
              We started Promogranade because we kept seeing the same gap: great
              ideas slowed down by fragmented teams. A design studio here, an
              engineering shop there, a separate agency on top. Each owned a
              slice, none owned the outcome.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              So we built the studio we wished existed — a single tight team
              that ships your web app, automates your back office, earns your
              rankings, and runs your growth experiments. Same people, every
              step of the way.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              We are a lean, senior team of developers, AI engineers, and
              marketing operators. No juniors handed your account once you sign.
              The people you meet are the people who build.
            </p>
          </FadeUp>
        </div>

        {/* Stats row */}
        <FadeUp delay={0.25} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[color:var(--section-border)] pt-10">
          {stats.map((s) => (
            <div key={s.label}>
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
      </div>
    </section>
  );
}
