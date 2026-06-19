"use client";

import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { ShieldCheck, GaugeCircle, Eye } from "lucide-react";

const PRINCIPLES = [
  {
    Icon: Eye,
    title: "A human reviews everything",
    body: "AI drafts, generates, and accelerates. It never ships unsupervised. Every line of code and every piece of copy is reviewed by a senior person before it reaches you.",
  },
  {
    Icon: GaugeCircle,
    title: "Speed without sloppiness",
    body: "The same toolkit that lets us move fast is the one that lets us test thoroughly — more iterations in the same timeline, not corners cut to hit a deadline.",
  },
  {
    Icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Client code, content, and business data are never used to train external models or shared outside the project team. The tools are ours; what we build with them is entirely yours.",
  },
];

export function ArcadePrinciples() {
  return (
    <section className="section-a relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
          <span className="h-px w-12 bg-[color:var(--section-border)]" />
          <span>How we use it</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start mb-14">
          <div className="lg:col-span-6">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.03em]"
            >
              Tools, not shortcuts.
            </TextReveal>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-6">
            <p className="text-base md:text-lg leading-relaxed text-[color:var(--section-muted)]">
              A fast stack is only worth something if what comes out the other
              end is still excellent. Here's how we keep it that way.
            </p>
          </FadeUp>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <FadeUp key={p.title} delay={0.1 + i * 0.08}>
              <div className="h-full rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <p.Icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--section-muted)]">
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
