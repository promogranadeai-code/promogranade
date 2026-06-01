"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const IconX = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
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
const IconGithub = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.19 1.75 1.19 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.37-5.24 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .3.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
  </svg>
);

const linkGroups = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/career", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#web", label: "Web Applications" },
      { href: "/services#ai", label: "AI Automations" },
      { href: "/services#seo", label: "SEO" },
      { href: "/services#marketing", label: "Marketing" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@promogranade.com", label: "Start a project" },
      { href: "mailto:hello@promogranade.com", label: "hello@promogranade.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative section-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Let&apos;s get
              <br />
              <span className="text-[var(--accent)]">to work.</span>
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="mailto:hello@promogranade.com"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Start a project →
              </a>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkGroups.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/55 mb-4">
                  {g.title}
                </p>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        data-cursor="open"
                        className="text-sm text-white/80 hover:text-[var(--accent)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} Promogranade. Solutions that scale businesses.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: IconX, href: "https://twitter.com" },
              { icon: IconLinkedin, href: "https://linkedin.com" },
              { icon: IconInstagram, href: "https://instagram.com" },
              { icon: IconGithub, href: "https://github.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="follow"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
