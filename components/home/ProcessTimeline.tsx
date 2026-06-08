"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "../ui/TextReveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    blurb:
      "We sit with your team, your data, and your customers until the real problem is obvious — not the one everyone assumed.",
    points: ["Stakeholder interviews", "Market & competitor scan", "Success metrics defined"],
  },
  {
    n: "02",
    title: "Design",
    blurb:
      "Brand language, user flows, and clickable prototypes — refined in days, not months, until the direction feels inevitable.",
    points: ["Brand & visual system", "Wireframes → prototypes", "User-tested before build"],
  },
  {
    n: "03",
    title: "Build",
    blurb:
      "A senior team writes every line. Weekly demos keep you in the loop, so nothing ships that you haven't already seen and approved.",
    points: ["Senior engineers only", "Weekly live demos", "Clean, documented handoff"],
  },
  {
    n: "04",
    title: "Grow",
    blurb:
      "Launch is day one. We track what matters, run the experiments that move the needle, and scale what's working.",
    points: ["Analytics & dashboards", "Continuous experiments", "Scaling playbooks"],
  },
];

export function ProcessTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Progress line fills as the track scrolls through the viewport —
  // starts when the track enters from the bottom, finishes as it exits the top.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-b relative overflow-hidden py-32 lg:py-48">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-6">
                <span className="h-px w-12 bg-[color:var(--section-border)]" />
                <span>How we work</span>
              </div>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] max-w-2xl">
                One process. Four phases. Zero surprises.
              </h2>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] shrink-0">
              Typical engagement: 4–12 weeks
            </p>
          </div>
          <p className="text-base md:text-lg text-[color:var(--section-muted)] leading-relaxed max-w-2xl mb-20 lg:mb-28">
            Every project — big or small — runs through the same four phases.
            It's the rhythm that lets a small senior team move like a much
            bigger one, without the handoffs, delays, or guesswork.
          </p>
        </FadeUp>

        <div ref={trackRef} className="relative pl-[3.25rem] md:pl-16">
          {/* base track, centred on the badges */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-[color:var(--section-border)]" />
          {/* scroll-filled progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 md:left-8 top-2 bottom-2 w-px origin-top bg-[var(--accent)]"
          />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* badge — sits on the track line */}
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                    delay: 0.1,
                  }}
                  className="absolute -left-[3.25rem] md:-left-16 top-8 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-display text-base font-bold text-white shadow-[0_8px_24px_-8px_rgba(220,20,40,0.65)]"
                >
                  {s.n}
                </motion.span>

                {/* premium red-accented card */}
                <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-[color:var(--section-surface)] p-7 md:p-10 transition-colors duration-300 hover:border-[var(--accent)]/60">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--accent)] opacity-[0.14] blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
                  />

                  <div className="relative grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-5">
                      <p className="font-display text-3xl md:text-5xl font-black leading-[0.95] tracking-[-0.03em] mb-4">
                        {s.title}
                      </p>
                      <p className="text-base md:text-lg text-[color:var(--section-muted)] leading-relaxed">
                        {s.blurb}
                      </p>
                    </div>

                    <div className="lg:col-span-7">
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-3 rounded-xl border border-[color:var(--section-border)] bg-[color:var(--background)]/40 px-4 py-3 text-sm text-[color:var(--sec-b-fg)]"
                          >
                            <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessTimeline;
