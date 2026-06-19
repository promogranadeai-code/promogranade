"use client";

import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { Sparkles, Users, Rocket, GraduationCap } from "lucide-react";

const VALUES = [
  {
    Icon: Users,
    title: "No juniors handed your account",
    body: "Every person you work with is senior. You'll never be the practice project for someone's first year on the job.",
  },
  {
    Icon: Rocket,
    title: "Ship real things, fast",
    body: "Work goes from idea to production in weeks, not quarters. You'll see your output live, not stuck in a backlog.",
  },
  {
    Icon: Sparkles,
    title: "Own outcomes, not tickets",
    body: "We hire people who want to solve the problem, not just close the ticket. You'll have real say in how things get built.",
  },
  {
    Icon: GraduationCap,
    title: "Work across the stack",
    body: "Engineers talk to designers talk to marketers — daily. You'll learn how the whole business works, not just your slice of it.",
  },
];

export function CareerCulture() {
  return (
    <section className="section-b relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>Why Promogranade</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start mb-16">
          <div className="lg:col-span-6">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.03em]"
            >
              Small team. Real ownership.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-6">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              We're a lean, senior team of developers, AI engineers, and marketing
              operators — not an agency with layers of management between you and
              the work. If you want your name on things that actually ship, and a
              say in how they get built, this is built for you.
            </p>
          </FadeUp>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={0.1 + i * 0.06}>
              <div className="h-full rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <v.Icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--section-muted)]">
                  {v.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
