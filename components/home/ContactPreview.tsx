"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowUpRight, Mail, Phone, MessageCircle } from "lucide-react";

const PHONE_DISPLAY = "+91 95117 84952";
const PHONE_TEL = "+919511784952";
const WA_NUMBER = "919511784952"; // wa.me requires no '+' prefix

export function ContactPreview() {
  return (
    <section
      id="contact"
      className="section-a relative overflow-hidden py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>06 — Let&apos;s talk</span>
          </div>
        </FadeUp>

        <TextReveal
          as="h2"
          className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] max-w-5xl"
        >
          Have a project?
        </TextReveal>
        <TextReveal
          as="h2"
          delay={0.15}
          className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] text-[var(--accent)] max-w-5xl"
        >
          Tell us everything.
        </TextReveal>

        <FadeUp delay={0.25}>
          <div className="mt-16 grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <Link href="/contact" data-cursor="start">
                <MagneticButton className="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] text-white px-8 py-5 text-base md:text-lg font-semibold hover:bg-[color:var(--sec-a-fg)] hover:text-[color:var(--sec-a-bg)] transition-colors">
                  Start a project
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </MagneticButton>
              </Link>
              <p className="text-sm text-[color:var(--section-muted)] max-w-md pl-2">
                We reply within one business day. Expect questions before
                quotes — we cost projects only when we&apos;ve understood them.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  href: "mailto:hello@promogranade.com",
                  cursor: "copy email",
                  Icon: Mail,
                  label: "Email",
                  value: "hello@promogranade.com",
                  target: undefined,
                  rel: undefined,
                },
                {
                  href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Promogranade, I'd like to talk about a project.")}`,
                  cursor: "whatsapp",
                  Icon: MessageCircle,
                  label: "WhatsApp",
                  value: PHONE_DISPLAY,
                  target: "_blank",
                  rel: "noreferrer",
                },
                {
                  href: `tel:${PHONE_TEL}`,
                  cursor: "call",
                  Icon: Phone,
                  label: "Call",
                  value: PHONE_DISPLAY,
                  target: undefined,
                  rel: undefined,
                },
              ].map(({ href, cursor, Icon, label, value, target, rel }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  data-cursor={cursor}
                  target={target}
                  rel={rel}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 rounded-2xl border border-[color:var(--section-border)] px-5 py-4 hover:border-[var(--accent)] hover:bg-[color:var(--section-surface)] transition-colors"
                >
                  <Icon className="h-5 w-5 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-[color:var(--section-muted)]">
                      {label}
                    </p>
                    <p className="text-base font-medium">{value}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
