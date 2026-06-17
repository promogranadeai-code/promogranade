"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp } from "../ui/TextReveal";

const testimonials = [
  {
    quote:
      "Promogranade took our vague idea and turned it into a live product in six weeks. Every deadline was hit, every suggestion was thoughtful. Honestly felt like working with co-founders, not an agency.",
    author: "Founder",
    company: "SaaS startup, Bangalore",
    initials: "F",
  },
  {
    quote:
      "The AI automation they built cut our manual data entry by 80%. I expected a chatbot. I got a proper workflow that actually understands our business logic. Night and day from every other agency we tried.",
    author: "Operations Head",
    company: "E-commerce brand, Mumbai",
    initials: "O",
  },
  {
    quote:
      "Our organic traffic tripled in four months. They didn't just do SEO — they built a content system that keeps compounding. Clean strategy, zero fluff.",
    author: "Marketing Director",
    company: "B2B services firm, Pune",
    initials: "M",
  },
  {
    quote:
      "What sets them apart is they speak both design and engineering. No lost-in-translation moments. The final product looked exactly like the designs and worked exactly as scoped.",
    author: "CTO",
    company: "Fintech startup, Hyderabad",
    initials: "C",
  },
];

export function HomeTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="section-a relative overflow-hidden py-28 lg:py-40">
      {/* subtle accent mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)", opacity: 0.05, filter: "blur(60px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-6">
              <span className="h-px w-12 bg-[color:var(--section-border)]" />
              <span>Client voices</span>
            </div>
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
            >
              Proof over promise.
            </TextReveal>
          </div>
          <FadeUp delay={0.15}>
            <div className="flex items-center gap-3 rounded-full border border-[color:var(--section-border)] px-5 py-2.5">
              <div className="flex -space-x-2">
                {["F","O","M","C"].map((l, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-[color:var(--section-surface)] flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#e0142c,#7a0014)", zIndex: 4 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-[color:var(--section-muted)]">
                <span className="text-foreground font-bold">4.9★</span>&nbsp;across all projects
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Masonry-style two-column layout with parallax offset */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {/* Left col — slightly offset up */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-5">
            {[testimonials[0], testimonials[2]].map((t, i) => (
              <TestimonialCard key={i} t={t} delay={i * 0.08} />
            ))}
          </motion.div>
          {/* Right col — slightly offset down */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-5 md:mt-10">
            {[testimonials[1], testimonials[3]].map((t, i) => (
              <TestimonialCard key={i} t={t} delay={i * 0.08 + 0.1} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-7 overflow-hidden"
    >
      {/* top edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"
      />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-[var(--accent)]" aria-hidden>
            <path d="M6 0l1.5 4H12L8.5 6.5 9.8 11 6 8.3 2.2 11l1.3-4.5L0 4h4.5z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-base leading-relaxed text-[color:var(--section-muted)] mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className="h-px bg-[color:var(--section-border)] mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: "linear-gradient(135deg,#e0142c,#7a0014)" }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.author}</p>
          <p className="text-xs text-[color:var(--section-muted)]">{t.company}</p>
        </div>
      </div>
    </motion.div>
  );
}
