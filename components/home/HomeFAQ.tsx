"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TextReveal, FadeUp } from "@/components/ui/TextReveal";
import { homeFaqs as FAQS } from "@/lib/home-faqs";

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-b relative overflow-hidden py-24 lg:py-36">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3 mb-12">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
              Frequently asked
            </span>
          </div>
        </FadeUp>

        <TextReveal
          as="h2"
          className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.92] tracking-[-0.03em] mb-16"
        >
          Questions, answered.
        </TextReveal>

        <div className="divide-y divide-[color:var(--section-border)] border-y border-[color:var(--section-border)]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-2xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[color:var(--section-muted)] transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--accent)]" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base md:text-lg leading-relaxed text-[color:var(--section-muted)] max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

