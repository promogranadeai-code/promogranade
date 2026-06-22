"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "What surprised us most was how little hand-holding it needed. We gave them the problem, not a spec, and they came back with a better solution than the one we asked for.",
    author: "Co-founder",
    company: "D2C brand, Delhi",
    rating: 5,
  },
  {
    quote:
      "We've worked with three agencies before this. Promogranade is the first one where the person who scoped the project was still the person writing the code six months later.",
    author: "VP Product",
    company: "HealthTech platform, Chennai",
    rating: 5,
  },
  {
    quote:
      "They pushed back on two things we asked for and were right both times. That's rare — most vendors just say yes and build whatever you tell them, even when it's the wrong call.",
    author: "Head of Growth",
    company: "EdTech startup, Bengaluru",
    rating: 5,
  },
  {
    quote:
      "Weekly updates, no chasing for status, no surprises at handover. The project management was honestly as impressive as the actual build.",
    author: "Founder",
    company: "Professional services firm, Gurugram",
    rating: 5,
  },
];

export function AboutTestimonials() {
  return (
    <section className="section-b relative overflow-hidden py-24 lg:py-36">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-12">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>What clients say</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Proof over promise.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              We let the work and the people who've lived it do the talking.
            </p>
          </FadeUp>
        </div>

        {/* Testimonial grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <FadeUp delay={0.3}>
          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-[color:var(--section-border)] pt-8">
            <p className="text-sm text-[color:var(--section-muted)] max-w-md">
              Ready to add your name to this list?
            </p>
            <a
              href="mailto:hello@promogranade.com"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-sm font-semibold hover:bg-[color:var(--sec-b-fg)] hover:text-[color:var(--sec-b-bg)] transition-colors"
            >
              Start a project →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-8 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.04] transition-colors duration-500 rounded-3xl pointer-events-none" />

      {/* Quote icon */}
      <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
        <Quote className="h-4 w-4" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 12 12"
            className="h-3 w-3 fill-[var(--accent)]"
            aria-hidden
          >
            <path d="M6 0l1.5 4H12L8.5 6.5 9.8 11 6 8.3 2.2 11l1.3-4.5L0 4h4.5z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="text-base leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className="h-px bg-[color:var(--section-border)] mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #dc1428, #7a0014)",
          }}
        >
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.author}</p>
          <p className="text-xs text-[color:var(--section-muted)]">
            {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
