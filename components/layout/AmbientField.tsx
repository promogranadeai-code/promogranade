"use client";

/**
 * Premium ambient backdrop for everything OUTSIDE the hero sections.
 *
 * The heavy WebGL liquid (`SiteLiquid`) is scoped to hero sections only —
 * everywhere else gets this layered, CSS-driven scene: drifting gradient
 * meshes, a slow-rotating conic glow, and a sparse field of twinkling
 * particles. Cheap (no WebGL), theme-aware via CSS variables, and tuned
 * to read as quiet depth rather than compete with foreground content.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const orbs = [
  { className: "h-[38rem] w-[38rem] -left-48 -top-40", duration: 50, accent: true, opacity: 0.09 },
  { className: "h-[30rem] w-[30rem] right-[-10rem] top-[28%]", duration: 58, accent: false, opacity: 0.05 },
  { className: "h-[34rem] w-[34rem] left-[20%] bottom-[-14rem]", duration: 64, accent: true, opacity: 0.07 },
  { className: "h-[22rem] w-[22rem] right-[12%] bottom-[8%]", duration: 42, accent: false, opacity: 0.045 },
];

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        top: `${(i * 61.8) % 100}%`,
        size: 2 + ((i * 7) % 5),
        duration: 5 + ((i * 3) % 7),
        delay: (i * 0.6) % 6,
      })),
    [count]
  );
}

export function AmbientField() {
  const reduceMotion = useReducedMotion();
  const particles = useParticles(18);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -2 }}
      aria-hidden
    >
      {/* Slow-rotating conic glow — gives the scene a sense of depth and motion */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[80rem] w-[80rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--accent) 18%, transparent 38%, transparent 60%, var(--foreground) 75%, transparent 92%)",
          opacity: 0.035,
          filter: "blur(140px)",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      />

      {/* Drifting gradient meshes */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${o.className}`}
          style={{
            background: o.accent
              ? "radial-gradient(circle, var(--accent) 0%, transparent 70%)"
              : "radial-gradient(circle, var(--foreground) 0%, transparent 70%)",
            opacity: o.opacity,
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 60, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Sparse twinkling particle field — adds quiet texture/depth */}
      {!reduceMotion &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "var(--foreground)",
            }}
            animate={{ opacity: [0, 0.18, 0], scale: [0.6, 1, 0.6] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Fine grain overlay for a premium, textured finish */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default AmbientField;
