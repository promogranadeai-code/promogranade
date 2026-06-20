"use client";

/**
 * Place this file at: components/intro/PromoGrenadeIntro.tsx
 *
 * Premium logo-drop + service-orbit intro overlay.
 * Not wired into the app yet (kept alongside the existing
 * components/layout/IntroAnimation.tsx by request) — to enable it,
 * swap the dynamic import in components/layout/DeferredShell.tsx:
 *
 *   const IntroAnimation = dynamic(() => import("@/components/intro/PromoGrenadeIntro"), { ssr: false });
 *
 * Requires the navbar logo to share `layoutId="promogranade-logo"`
 * (already added to components/layout/Navigation.tsx) so the logo can
 * fly into place via Framer Motion's shared layout animation.
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Megaphone,
  Code2,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type Phase =
  | "drop"
  | "emerge"
  | "orbit"
  | "merge"
  | "pulse"
  | "fly"
  | "done";

const SESSION_KEY = "pg-grenade-intro-v1";

const SERVICES: { label: string; icon: LucideIcon }[] = [
  { label: "AI", icon: Sparkles },
  { label: "Marketing", icon: Megaphone },
  { label: "Development", icon: Code2 },
  { label: "Automation", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
];

const ORBIT_RADIUS = 132;
const ORBIT_DURATION = 2; // seconds, per spec

export default function PromoGrenadeIntro() {
  const [phase, setPhase] = useState<Phase>("drop");
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(SESSION_KEY)) {
      setSkip(true);
      return;
    }

    document.body.style.overflow = "hidden";

    // Timeline (ms), total ~5.8s, within the 5-7s premium-intro budget.
    const timers = [
      setTimeout(() => setPhase("emerge"), 900), // logo has landed + bounced
      setTimeout(() => setPhase("orbit"), 2100), // all 5 icons have emerged
      setTimeout(() => setPhase("merge"), 2100 + ORBIT_DURATION * 1000), // after 2s orbit
      setTimeout(() => setPhase("pulse"), 2100 + ORBIT_DURATION * 1000 + 500),
      setTimeout(() => setPhase("fly"), 2100 + ORBIT_DURATION * 1000 + 1000),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
      }, 2100 + ORBIT_DURATION * 1000 + 1700),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  const showIcons = phase === "emerge" || phase === "orbit";

  const iconPositions = useMemo(
    () =>
      SERVICES.map((_, i) => {
        const angle = (360 / SERVICES.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        return {
          x: Math.cos(rad) * ORBIT_RADIUS,
          y: Math.sin(rad) * ORBIT_RADIUS,
        };
      }),
    []
  );

  if (!mounted || skip || phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="pg-intro-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* subtle radial glow behind the whole composition */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative flex items-center justify-center">
            {/* orbiting service icons */}
            <motion.div
              className="absolute inset-0"
              animate={
                phase === "orbit" ? { rotate: 360 } : { rotate: 0 }
              }
              transition={
                phase === "orbit"
                  ? {
                      duration: ORBIT_DURATION,
                      ease: "linear",
                      repeat: 0,
                    }
                  : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ width: 0, height: 0 }}
            >
              {SERVICES.map(({ label, icon: Icon }, i) => {
                const pos = iconPositions[i];
                const visible = showIcons;
                return (
                  <motion.div
                    key={label}
                    className="absolute flex flex-col items-center gap-1.5"
                    style={{ left: 0, top: 0 }}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={
                      visible
                        ? {
                            opacity: 1,
                            scale: 1,
                            x: pos.x,
                            y: pos.y,
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                          }
                    }
                    transition={
                      phase === "emerge"
                        ? {
                            duration: 0.5,
                            delay: i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : phase === "merge"
                        ? {
                            duration: 0.45,
                            delay: (SERVICES.length - i) * 0.05,
                            ease: [0.4, 0, 0.2, 1],
                          }
                        : { duration: 0 }
                    }
                  >
                    <motion.div
                      // counter-rotate so the icon glass stays upright while orbiting
                      animate={
                        phase === "orbit" ? { rotate: -360 } : { rotate: 0 }
                      }
                      transition={
                        phase === "orbit"
                          ? { duration: ORBIT_DURATION, ease: "linear" }
                          : { duration: 0.4 }
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                    >
                      <Icon className="h-5 w-5 text-[#FF0000]" strokeWidth={2} />
                    </motion.div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* the logo itself: drop + bounce, then pulse, then shared-layout fly to navbar */}
            {phase !== "fly" && (
              <motion.div
                layoutId="promogranade-logo"
                initial={{ y: -360, opacity: 0 }}
                animate={
                  phase === "pulse"
                    ? { y: 0, opacity: 1, scale: [1, 1.18, 0.92, 1] }
                    : { y: 0, opacity: 1, scale: 1 }
                }
                transition={
                  phase === "pulse"
                    ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
                    : phase === "drop"
                    ? { type: "spring", stiffness: 260, damping: 14, mass: 1 }
                    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }
                className="relative z-10 h-24 w-24"
              >
                <Image
                  src="/logo.png"
                  alt="PromoGrenade"
                  fill
                  sizes="96px"
                  priority
                  className="object-contain"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
