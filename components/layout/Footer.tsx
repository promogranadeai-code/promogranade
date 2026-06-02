"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Constants ────────────────────────────────────────────── */

const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "AI Agents", "LangGraph",
  "Claude API", "RAG Pipelines", "Fine-tuning", "n8n", "Make.com",
  "WordPress", "Shopify", "SEO", "GEO", "AEO", "Meta Ads", "Google Ads",
  "Social Media",
];

const WA_LINK = `https://wa.me/919511784952?text=${encodeURIComponent(
  "Hi Promogranade, I'd like to talk about a project."
)}`;

type FooterLink = { href: string; label: string; target?: string; rel?: string };

const linkGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about",   label: "About"   },
      { href: "/career",  label: "Careers" },
      { href: "/blog",    label: "Blog"    },
      { href: "/arcade",  label: "Arcade"  },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Website Development" },
      { href: "/services", label: "Custom Applications" },
      { href: "/services", label: "AI Development"      },
      { href: "/services", label: "SEO / GEO / AEO"     },
      { href: "/services", label: "Social Media"        },
      { href: "/services", label: "Workflow Automation" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@promogranade.com", label: "hello@promogranade.com" },
      { href: WA_LINK, label: "WhatsApp", target: "_blank", rel: "noreferrer" },
      { href: "tel:+919511784952",             label: "+91 95117 84952"        },
    ],
  },
];

/* ─── Social icons ─────────────────────────────────────────── */

const IconLinkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0z" />
  </svg>
);
const IconInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconWhatsApp = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socials = [
  { Icon: IconLinkedin,  href: "https://linkedin.com/in/abhinandanjain-dubai/", label: "LinkedIn"  },
  { Icon: IconInstagram, href: "https://www.instagram.com/promogranade",        label: "Instagram" },
  { Icon: IconWhatsApp,  href: WA_LINK,                                         label: "WhatsApp"  },
];

/* ─── Component ────────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "#070707" }}>
      {/* Marquee keyframe */}
      <style>{`
        @keyframes fm { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .fm-track { animation: fm 65s linear infinite; }
      `}</style>

      {/* ── Red gradient top border ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(224,20,44,0.75) 50%, transparent 100%)" }}
      />

      {/* ── Pulsing glow orb ── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center">
        <motion.div
          className="h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(224,20,44,0.1) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Secondary orb, bottom right ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(224,20,44,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Dot-grid texture ── */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: 0.032 }}>
        <defs>
          <pattern id="fp-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fp-dots)" />
      </svg>

      {/* ── Giant watermark text ── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden">
        <p
          className="font-display font-black leading-none text-white"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", opacity: 0.015, letterSpacing: "-0.04em" }}
        >
          PROMOGRANADE
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  MAIN GRID: CTA left  ·  Links right                 */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10" style={{ zIndex: 1 }}>
        <div className="grid gap-12 pt-24 pb-20 lg:grid-cols-12">

          {/* ── LEFT: headline + CTAs ── */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-white/30">
                Ready to scale?
              </p>
              <h2
                className="font-display font-black leading-[0.88] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }}
              >
                Let&apos;s get
                <br />
                <span style={{ color: "var(--accent)" }}>to work.</span>
              </h2>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="mailto:hello@promogranade.com"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Start a project
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/55 transition-all duration-300 hover:border-white/35 hover:text-white"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: link columns ── */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-10 md:grid-cols-3">
            {linkGroups.map((g, gi) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Column heading with accent dot */}
                <div className="mb-6 flex items-center gap-2.5">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <p className="text-[9px] uppercase tracking-[0.45em] text-white/30">
                    {g.title}
                  </p>
                </div>

                <ul className="space-y-[14px]">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        target={l.target}
                        rel={l.rel}
                        data-cursor="open"
                        className="group flex items-center gap-2.5 text-sm text-white/42 transition-all duration-200 hover:text-white"
                      >
                        {/* Red dot that pops in on hover */}
                        <span
                          className="h-[5px] w-[5px] shrink-0 rounded-full opacity-0 scale-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100"
                          style={{ background: "var(--accent)" }}
                        />
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                          {l.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  MARQUEE STRIP  (full-width)                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden border-y py-[18px]"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="fm-track flex w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="shrink-0 px-6 text-[10px] uppercase tracking-[0.38em] text-white/20"
            >
              {item}
              <span className="mx-4 opacity-45" style={{ color: "var(--accent)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  BOTTOM BAR                                           */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10" style={{ zIndex: 1 }}>
        <div
          className="flex flex-col-reverse gap-6 py-8 border-t md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {/* Logo + wordmark */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <FooterLogo />
            <div>
              <p className="text-sm font-bold tracking-[0.14em] text-white">PROMOGRANADE</p>
              <p className="mt-0.5 text-[10px] tracking-wide text-white/28">
                © {year} · Solutions that scale businesses.
              </p>
            </div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-2.5"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor="follow"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
              >
                <s.Icon className="h-[15px] w-[15px] text-white/38 transition-colors duration-300 group-hover:text-white" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

    </footer>
  );
}

/* ─── Logo mark ────────────────────────────────────────────── */

function FooterLogo() {
  return (
    <span className="relative inline-flex h-9 w-9 flex-shrink-0 items-center justify-center">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="#dc1428" />
        <g transform="rotate(-30, 32, 32)" fill="#0a0a0a">
          <rect x="28.5" y="12" width="7" height="40" rx="3.5" />
          <rect x="12" y="28.5" width="40" height="7" rx="3.5" />
        </g>
      </svg>
    </span>
  );
}
