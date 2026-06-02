"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/blog", label: "Blog" },
  { href: "/arcade", label: "Arcade" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-5 lg:px-10 transition-all duration-500",
            scrolled
              ? "max-w-[95%] rounded-full border border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl py-2"
              : "max-w-full bg-transparent"
          )}
        >
          <Link
            href="/"
            data-cursor="home"
            className="flex items-center gap-2 group"
          >
            <Logo />
            <span className={cn(
              "font-display text-lg font-bold tracking-tight transition-colors duration-500",
              scrolled ? "text-foreground" : "text-white"
            )}>
              PROMOGRANADE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor="visit"
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-500 group",
                  scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/80 hover:text-white"
                )}
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-[var(--accent)]/10 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="mailto:hello@promogranade.com"
              data-cursor="hire"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--accent)]/90 transition-colors"
            >
              Let&apos;s talk
              <span className="inline-block">→</span>
            </Link>
            <ThemeToggle forceWhite={!scrolled} />
            <button
              type="button"
              aria-label="Toggle menu"
              data-cursor="menu"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "lg:hidden h-10 w-10 rounded-full border flex items-center justify-center transition-colors duration-500",
                scrolled
                  ? "border-[var(--nav-border)] text-foreground"
                  : "border-white/30 text-white"
              )}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--background)] lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-6 px-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-bold tracking-tight hover:text-[var(--accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-10 w-10 items-center justify-center flex-shrink-0">
      {/*
        Exact recreation of the Promogranade logo mark:
        Red circle + black 4-arm rounded asterisk rotated ~30° CCW.
        SVG so it works on any background color with no white-bg hack.
      */}
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full"
        aria-label="Promogranade logo mark"
        role="img"
      >
        {/* Red circle background */}
        <circle cx="32" cy="32" r="30" fill="#dc1428" />

        {/* Black 4-arm asterisk — two rounded rectangles crossing at centre,
            rotated 30° counter-clockwise to match the actual logo */}
        <g transform="rotate(-30, 32, 32)" fill="#0a0a0a">
          {/* vertical arm */}
          <rect x="28.5" y="12" width="7" height="40" rx="3.5" />
          {/* horizontal arm */}
          <rect x="12" y="28.5" width="40" height="7" rx="3.5" />
        </g>
      </svg>
    </span>
  );
}
