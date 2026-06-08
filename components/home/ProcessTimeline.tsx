"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "../ui/TextReveal";

const steps = [
  { n: "01", title: "Discover", blurb: "Goals, constraints, real users." },
  { n: "02", title: "Design", blurb: "Brand, flow, prototype." },
  { n: "03", title: "Build", blurb: "Senior team, weekly demos." },
  { n: "04", title: "Grow", blurb: "Measure. Iterate. Scale." },
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
          <div className="flex flex-wrap items-center justify-between gap-6 mb-20 lg:mb-28">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
              <span className="h-px w-12 bg-[color:var(--section-border)]" />
              <span>How we work</span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
              Typical engagement: 4–12 weeks
            </p>
          </div>
        </FadeUp>

        <div ref={trackRef} className="relative">
          {/* base track */}
          <div className="absolute left-6 top-2 bottom-2 w-px bg-[color:var(--section-border)]" />
          {/* scroll-filled progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 top-2 bottom-2 w-px origin-top bg-[var(--accent)]"
          />

          <div className="space-y-20 lg:space-y-32">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-8 md:gap-14"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                    delay: 0.1,
                  }}
                  className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-display text-base font-bold text-white"
                >
                  {s.n}
                </motion.span>

                <div className="pt-1">
                  <p className="font-display text-3xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-[-0.03em] mb-3">
                    {s.title}
                  </p>
                  <p className="text-base md:text-lg text-[color:var(--section-muted)] leading-relaxed max-w-md">
                    {s.blurb}
                  </p>
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
