"use client";

import { FadeUp } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { TextReveal } from "@/components/ui/TextReveal";

const stats = [
  { n: 12, suffix: "+", label: "Projects shipped" },
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

        {/* Stats panel — matches home page track-record block */}
        <FadeUp delay={0.25} className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 md:p-12">
            {/* accent glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.14] blur-3xl"
            />
            {/* accent left edge */}
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

            {/* stats grid */}
            <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-0">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-cursor="stat"
                  className="group/stat md:border-l md:border-[color:var(--section-border)] md:pl-8 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="mb-4 block h-1 w-8 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover/stat:w-16" />
                  <div className="flex items-baseline gap-0.5 font-display text-5xl md:text-6xl font-black tracking-tight tabular-nums">
                    <Counter value={s.n} />
                    <span className="text-[var(--accent)]">{s.suffix.replace(" yrs", "")}</span>
                    {s.suffix.includes("yrs") && (
                      <span className="ml-1.5 text-base md:text-lg font-bold text-[color:var(--section-muted)]">yrs</span>
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
