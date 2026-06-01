"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "../ui/TextReveal";
import { ArrowUpRight, Phone, MessageCircle, Mail } from "lucide-react";

const EMAIL     = "hello@promogranade.com";
const PHONE_TEL = "+919511784952";
const WA_NUMBER = "919511784952";

const CONTACTS = [
  {
    label:  "Email",
    sub:    "Send us a message",
    Icon:   Mail,
    href:   `mailto:${EMAIL}`,
    cursor: "email",
    target: undefined as string | undefined,
    rel:    undefined as string | undefined,
  },
  {
    label:  "WhatsApp",
    sub:    "Chat with us",
    Icon:   MessageCircle,
    href:   `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Promogranade, I'd like to talk about a project.")}`,
    cursor: "whatsapp",
    target: "_blank",
    rel:    "noreferrer",
  },
  {
    label:  "Call",
    sub:    "Speak to us directly",
    Icon:   Phone,
    href:   `tel:${PHONE_TEL}`,
    cursor: "call",
    target: undefined as string | undefined,
    rel:    undefined as string | undefined,
  },
];

export function ContactPreview() {
  return (
    <section
      id="contact"
      className="section-a relative overflow-hidden py-28 lg:py-44"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Eyebrow */}
        <FadeUp>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-10">
            <span className="h-px w-12 bg-[color:var(--section-border)]" />
            <span>06 — Let&apos;s talk</span>
          </div>
        </FadeUp>

        {/* Heading */}
        <TextReveal
          as="h2"
          className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] max-w-5xl"
        >
          Have a project?
        </TextReveal>
        <TextReveal
          as="h2"
          delay={0.15}
          className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] text-[var(--accent)] max-w-5xl mb-14"
        >
          Tell us everything.
        </TextReveal>

        {/* Action area */}
        <FadeUp delay={0.25}>
          <div className="grid gap-5 lg:grid-cols-12">

            {/* Primary CTA card */}
            <div className="lg:col-span-7">
              <motion.a
                href={`mailto:${EMAIL}`}
                data-cursor="start"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col justify-between rounded-3xl bg-[var(--accent)] p-8 md:p-10 overflow-hidden min-h-[220px] cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-500 pointer-events-none" />
                <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
                <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

                <div className="relative flex items-start justify-between">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-medium">
                    Send us a message
                  </p>
                  <div className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-white group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                <div className="relative mt-8">
                  <p className="font-display text-4xl md:text-5xl font-black text-white leading-[0.92] tracking-tight">
                    Start a project
                  </p>
                  <p className="text-white/55 text-sm mt-3 max-w-xs leading-relaxed">
                    We reply within one business day. Expect questions before
                    quotes — we scope projects only when we understand them.
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Secondary: Email / WhatsApp / Call */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)] mb-1">
                Or reach us directly
              </p>

              {CONTACTS.map(({ label, sub, Icon, href, cursor, target, rel }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  data-cursor={cursor}
                  target={target}
                  rel={rel}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="group relative flex items-center gap-4 rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] px-6 py-4 hover:border-[var(--accent)] transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.03] transition-colors duration-300 pointer-events-none" />

                  {/* Icon badge */}
                  <div className="relative h-10 w-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors duration-300 shrink-0">
                    <Icon className="h-4 w-4 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Label only — no contact detail */}
                  <div className="relative min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--section-muted)] mb-0.5">
                      {sub}
                    </p>
                    <p className="text-base font-semibold tracking-tight">
                      {label}
                    </p>
                  </div>

                  <ArrowUpRight className="relative ml-auto h-4 w-4 text-[color:var(--section-muted)] group-hover:text-[var(--accent)] group-hover:rotate-45 transition-all duration-300 shrink-0" />
                </motion.a>
              ))}

              <p className="text-xs text-[color:var(--section-muted)] leading-relaxed pt-1">
                Available Mon – Sat, 10 AM – 8 PM IST.
              </p>
            </div>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
