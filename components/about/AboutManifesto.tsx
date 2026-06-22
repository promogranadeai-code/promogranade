"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { ShieldCheck, Zap, Gem, Eye } from "lucide-react";

const PRINCIPLES = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Ownership",
    blurb: "We treat your roadmap like our own startup. No tickets thrown over a wall, no \"that's a different team.\"",
  },
  {
    n: "02",
    icon: Zap,
    title: "Speed",
    blurb: "Senior people make decisions fast. We ship in weeks, not quarters — and we tell you the moment something's blocked.",
  },
  {
    n: "03",
    icon: Gem,
    title: "Craft",
    blurb: "Every pixel, every query, every funnel — built like it's going on our own portfolio, because eventually it does.",
  },
  {
    n: "04",
    icon: Eye,
    title: "Transparency",
    blurb: "Weekly updates, real numbers, no spin when something's behind. You'll never have to chase us for status.",
  },
];

export function AboutManifesto() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: "var(--accent)", color: "#fff" }}
    >
      {/* high-contrast texture — diagonal hairlines + a soft dark vignette so the
          panel reads as a deliberate "wow" beat rather than a flat color block */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(0,0,0,0.25) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.25) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70 mb-12">
          <span className="h-px w-12 bg-white/30" />
          <span>How we work</span>
        </div>

        {/* Big mission statement */}
        <TextReveal
          as="h2"
          className="font-display text-[clamp(2.25rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.035em] max-w-5xl"
        >
          Good enough is the enemy of great.
        </TextReveal>
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-white/85">
            Four rules we don&apos;t bend on, no matter how small the project or how
            tight the deadline.
          </p>
        </FadeUp>

        {/* Principle grid */}
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-white/20 bg-white/10 p-7 overflow-hidden backdrop-blur-sm hover:bg-white/15 transition-colors duration-300"
            >
              <span className="absolute top-5 right-6 font-display text-4xl font-black text-white/15 select-none">
                {p.n}
              </span>
              <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <p.icon className="h-5 w-5 text-white" strokeWidth={1.8} />
              </div>
              <p className="relative font-display text-xl font-bold tracking-tight mb-2.5">
                {p.title}
              </p>
              <p className="relative text-sm leading-relaxed text-white/80">
                {p.blurb}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement ribbon */}
        <FadeUp delay={0.3}>
          <div className="mt-16 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 border-t border-white/20 pt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            <span>Zero account managers</span>
            <span className="hidden md:inline text-white/40">·</span>
            <span>Zero missed deadlines</span>
            <span className="hidden md:inline text-white/40">·</span>
            <span>Zero excuses</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default AboutManifesto;
