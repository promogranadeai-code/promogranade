"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "a" | "b";
}

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "a",
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* transparent spacer — keeps the area behind the fixed nav free of the
          tone overlay so the backdrop reads there exactly as it does
          on Career/Contact/Arcade, instead of looking dulled. */}
      <div className="pt-16" />
      <section
        className={cn(
          "relative pt-12 pb-24 lg:pt-20 lg:pb-32",
          tone === "a" ? "section-a" : "section-b"
        )}
      >
        <HeroBackdrop />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-8">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>{eyebrow}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.75rem,9vw,9rem)] font-black leading-[0.9] tracking-[-0.04em] text-balance max-w-5xl"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--section-muted)]"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}
