"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/MagneticButton";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60 mb-8"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>Promogranade</span>
          <span className="text-foreground/30">/</span>
          <span>AI agency · Est. 2026</span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.75rem,9vw,9.5rem)] font-black leading-[0.88] tracking-[-0.045em] text-balance">
          <SplitLine delay={0.1}>Solutions</SplitLine>
          <br />
          <SplitLine delay={0.25}>
            that <span className="text-[var(--accent)]">scale</span>
          </SplitLine>
          <br />
          <SplitLine delay={0.4}>businesses.</SplitLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            We build web applications, ship AI automations, and run growth
            engines for ambitious teams. One studio for the entire stack — from
            first pixel to first paying customer.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:hello@promogranade.com">
              <MagneticButton className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors">
                Start a project
                <span>→</span>
              </MagneticButton>
            </a>
            <Link href="/services">
              <MagneticButton className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-4 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                Explore services
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/55"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function SplitLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="reveal-mask">
      <motion.span
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
