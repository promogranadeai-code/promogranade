"use client";

/**
 * Place this file at: components/intro/PromoGrenadeIntro.tsx
 *
 * Cinematic one-time intro: a laptop materializes in 3D, lid opens, a
 * terminal boot sequence runs, five system nodes appear and send energy
 * lines inward, the energy resolves into /public/logo.png, the logo
 * pulses, then flies into the navbar via a shared layoutId transition.
 *
 * Already wired in via components/layout/DeferredShell.tsx. Requires the
 * navbar logo to carry layoutId="promogranade-logo" (see
 * components/layout/Navigation.tsx) and the app to be wrapped in
 * Framer Motion's <LayoutGroup> (see app/providers.tsx) so the two
 * components — mounted in different trees — can resolve the shared
 * layout animation.
 *
 * Hero.tsx and HeroLiquid.tsx are untouched; this overlay only sits in
 * front of them until it unmounts.
 */

import { useEffect, useState } from "react";
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
  | "enter"
  | "opening"
  | "boot"
  | "nodes"
  | "converge"
  | "logo"
  | "pulse"
  | "fly"
  | "done";

const SESSION_KEY = "pg-intro-cinematic-v1";

const EASE = [0.22, 1, 0.36, 1] as const;

const BOOT_LINES = [
  "PROMOGRENADE OS",
  "Booting Growth Engine...",
  "Loading AI Systems...",
  "Loading Marketing Systems...",
  "Loading Automation Systems...",
  "Loading Development Systems...",
  "Loading Analytics Systems...",
];

// Stage is a fixed 560x460 design; scaled responsively via the wrapper.
const STAGE_W = 560;
const STAGE_H = 460;
const CENTER = { x: STAGE_W / 2, y: 198 };

const NODES: { label: string; icon: LucideIcon; x: number; y: number }[] = [
  { label: "AI", icon: Sparkles, x: 96, y: 96 },
  { label: "Marketing", icon: Megaphone, x: STAGE_W - 96, y: 96 },
  { label: "Development", icon: Code2, x: 48, y: CENTER.y },
  { label: "Automation", icon: Workflow, x: STAGE_W - 48, y: CENTER.y },
  { label: "Analytics", icon: BarChart3, x: STAGE_W / 2, y: 396 },
];

// Timeline (ms from mount). Total ~6.6s.
const T = {
  opening: 500,
  boot: 1300,
  nodes: 3500,
  converge: 4200,
  logo: 4950,
  pulse: 5550,
  fly: 6100,
  done: 6800,
};

export default function PromoGrenadeIntro() {
  const [phase, setPhase] = useState<Phase>("enter");
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(SESSION_KEY)) {
      setSkip(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setPhase("opening"), T.opening),
      setTimeout(() => setPhase("boot"), T.boot),
      setTimeout(() => setPhase("nodes"), T.nodes),
      setTimeout(() => setPhase("converge"), T.converge),
      setTimeout(() => setPhase("logo"), T.logo),
      setTimeout(() => setPhase("pulse"), T.pulse),
      setTimeout(() => setPhase("fly"), T.fly),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
      }, T.done),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || skip) return null;

  const laptopVisible = phase !== "logo" && phase !== "pulse" && phase !== "fly";
  const screenOpen = phase !== "enter";
  const showBoot = phase === "boot" || phase === "nodes" || phase === "converge";
  const showNodes = phase === "nodes" || phase === "converge";
  const showLines = phase === "converge";
  const showLogo = phase === "logo" || phase === "pulse";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="pg-intro-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#070707]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* ambient red vignette, very subtle — Apple-keynote restraint */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,0,0,0.10) 0%, transparent 55%)",
            }}
          />

          {/* responsive scale wrapper around the fixed-size stage */}
          <div className="scale-[0.5] sm:scale-[0.75] md:scale-[0.92] lg:scale-100">
            <div
              className="relative"
              style={{ width: STAGE_W, height: STAGE_H, perspective: 1600 }}
            >
              {laptopVisible && (
                <motion.div
                  className="absolute left-1/2 top-[150px] -translate-x-1/2"
                  initial={{ opacity: 0, y: 24, rotateX: 14, rotateY: -16, scale: 0.92 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 8,
                    rotateY: -12,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Laptop screenOpen={screenOpen} showBoot={showBoot} />
                </motion.div>
              )}

              {showNodes && (
                <>
                  {NODES.map((node, i) => (
                    <Node key={node.label} node={node} index={i} active={phase === "nodes"} />
                  ))}
                  <EnergyLines show={showLines} />
                </>
              )}

              {showLogo && (
                <motion.div
                  layoutId="promogranade-logo"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    phase === "pulse"
                      ? { opacity: 1, scale: [1, 1.16, 0.94, 1] }
                      : { opacity: 1, scale: [0.6, 1.08, 1] }
                  }
                  transition={
                    phase === "pulse"
                      ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
                      : { duration: 0.6, ease: EASE }
                  }
                  className="absolute h-28 w-28"
                  style={{ left: CENTER.x - 56, top: CENTER.y - 56 }}
                >
                  <Image
                    src="/logo.png"
                    alt="PromoGrenade"
                    fill
                    sizes="112px"
                    priority
                    className="object-contain drop-shadow-[0_0_40px_rgba(255,0,0,0.35)]"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Laptop({
  screenOpen,
  showBoot,
}: {
  screenOpen: boolean;
  showBoot: boolean;
}) {
  return (
    <div className="flex flex-col items-center select-none">
      {/* SCREEN / LID */}
      <motion.div
        className="relative w-[360px] overflow-hidden rounded-t-xl border border-[#262626] bg-gradient-to-b from-[#1c1c1e] to-[#0d0d0e]"
        style={{ transformOrigin: "bottom center" }}
        initial={{ height: 10, rotateX: -90 }}
        animate={screenOpen ? { height: 226, rotateX: 0 } : { height: 10, rotateX: -90 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <div className="absolute top-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#333]" />
        <div className="absolute inset-[5px] overflow-hidden rounded-t-lg bg-[#050505]">
          {/* power-on glow wash */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: screenOpen ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,0,0,0.16) 0%, transparent 65%)",
            }}
          />
          {/* terminal boot text */}
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-1.5 px-7 font-mono">
            <AnimatePresence>
              {showBoot &&
                BOOT_LINES.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.26, ease: EASE }}
                    className={
                      i === 0
                        ? "text-[11px] font-bold tracking-[0.2em] text-[#FF2424]"
                        : "text-[10px] tracking-wide text-white/70"
                    }
                  >
                    {i === 0 ? line : `> ${line}`}
                  </motion.p>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* HINGE */}
      <div className="h-[3px] w-[372px] rounded-full bg-[#1a1a1a]" />

      {/* BASE */}
      <div
        className="h-[16px] w-[380px] rounded-b-2xl border-x border-b border-[#222] bg-gradient-to-b from-[#1c1c1e] to-[#101012]"
        style={{ transform: "rotateX(-8deg)", transformOrigin: "top center" }}
      />

      {/* desk shadow */}
      <div
        className="mt-3 h-3 w-48 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Node({
  node,
  index,
  active,
}: {
  node: { label: string; icon: LucideIcon; x: number; y: number };
  index: number;
  active: boolean;
}) {
  const Icon = node.icon;
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-2"
      style={{ left: node.x, top: node.y, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5, delay: active ? index * 0.1 : 0, ease: EASE }}
    >
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 18px rgba(255,0,0,0.25)" }}
        />
        <Icon className="relative h-4 w-4 text-[#FF3030]" strokeWidth={1.75} />
      </div>
      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/50">
        {node.label}
      </span>
    </motion.div>
  );
}

function EnergyLines({ show }: { show: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width={STAGE_W}
      height={STAGE_H}
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
    >
      <defs>
        <linearGradient id="pg-energy" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF0000" stopOpacity="0" />
          <stop offset="100%" stopColor="#FF3B3B" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {NODES.map((node) => (
        <motion.line
          key={node.label}
          x1={node.x}
          y1={node.y}
          x2={CENTER.x}
          y2={CENTER.y}
          stroke="url(#pg-energy)"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,0,0,0.6))" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        />
      ))}
    </svg>
  );
}
