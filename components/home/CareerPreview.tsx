"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

const roles = [
  { title: "Senior Full-Stack Engineer", location: "Remote", type: "Full-time" },
  { title: "AI / ML Engineer", location: "Remote", type: "Full-time" },
  { title: "Performance Marketer", location: "Remote", type: "Full-time" },
  { title: "Brand Designer", location: "Hybrid", type: "Contract" },
];

export function CareerPreview() {
  return (
    <section
      id="career"
      className="section-b relative overflow-hidden py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>03 — Career</span>
          </div>
        </FadeUp>

        <div className="grid gap-12 lg:grid-cols-12 items-end mb-16">
          <div className="lg:col-span-8">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
            >
              Build with us.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-4">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              Small team, big surface area. We look for sharp generalists who
              ship and stay curious.
            </p>
          </FadeUp>
        </div>

        <ul className="divide-y divide-[color:var(--section-border)] border-y border-[color:var(--section-border)]">
          {roles.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href="/career"
                data-cursor="apply"
                className="group flex items-center justify-between gap-6 py-7 md:py-9"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-display text-2xl md:text-4xl font-bold tracking-tight group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all duration-500">
                    {r.title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--section-muted)]">
                    {r.location} · {r.type}
                  </p>
                </div>
                <span className="hidden md:inline-block text-sm text-[color:var(--section-muted)] group-hover:text-[var(--accent)] transition-colors">
                  Apply
                </span>
                <ArrowUpRight className="h-6 w-6 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <FadeUp delay={0.2}>
          <div className="mt-12 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <p className="text-sm text-[color:var(--section-muted)] max-w-md">
              Don&apos;t see your role? We always make space for exceptional
              people.
            </p>
            <Link href="/career" data-cursor="all roles">
              <MagneticButton className="inline-flex items-center gap-3 rounded-full bg-[color:var(--sec-b-fg)] text-[color:var(--sec-b-bg)] px-6 py-3 text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors">
                See all roles
                <span>→</span>
              </MagneticButton>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
