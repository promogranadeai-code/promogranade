"use client";

/**
 * Ambient backdrop for non-hero sections.
 *
 * Slow-morphing organic blobs that feel like an extension of the hero
 * liquid animation — same accent palette, same fluid character, but
 * CSS-driven and much cheaper than WebGL. Shape-morphing via
 * border-radius keyframes gives the blobs a living, breathing quality.
 */

import { motion, useReducedMotion } from "framer-motion";

/* Each blob has a base position, two alternating border-radius shapes,
   a drift path, and an opacity level. */
const blobs = [
  {
    size: "56rem",
    pos: "-left-48 -top-32",
    accent: true,
    opacity: 0.20,
    duration: 38,
    drift: { x: [0, 80, -30, 0], y: [0, -60, 50, 0] },
    r1: "62% 38% 46% 54% / 60% 44% 56% 40%",
    r2: "44% 56% 60% 40% / 38% 62% 42% 58%",
  },
  {
    size: "44rem",
    pos: "right-[-8rem] top-[18%]",
    accent: false,
    opacity: 0.13,
    duration: 52,
    drift: { x: [0, -60, 40, 0], y: [0, 40, -50, 0] },
    r1: "38% 62% 54% 46% / 48% 52% 44% 56%",
    r2: "60% 40% 38% 62% / 54% 46% 60% 40%",
  },
  {
    size: "50rem",
    pos: "left-[12%] bottom-[-10rem]",
    accent: true,
    opacity: 0.16,
    duration: 46,
    drift: { x: [0, 50, -60, 0], y: [0, -40, 30, 0] },
    r1: "54% 46% 38% 62% / 42% 58% 50% 50%",
    r2: "40% 60% 54% 46% / 58% 42% 38% 62%",
  },
  {
    size: "36rem",
    pos: "right-[6%] bottom-[8%]",
    accent: false,
    opacity: 0.10,
    duration: 60,
    drift: { x: [0, -40, 30, 0], y: [0, 50, -40, 0] },
    r1: "48% 52% 62% 38% / 56% 44% 52% 48%",
    r2: "62% 38% 44% 56% / 40% 60% 48% 52%",
  },
  {
    size: "32rem",
    pos: "left-[40%] top-[-6rem]",
    accent: true,
    opacity: 0.11,
    duration: 44,
    drift: { x: [0, -50, 40, 0], y: [0, 60, -30, 0] },
    r1: "56% 44% 40% 60% / 44% 56% 62% 38%",
    r2: "38% 62% 56% 44% / 60% 40% 44% 56%",
  },
];

export function AmbientField() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -2 }}
      aria-hidden
    >
      {/* Shape-morphing organic blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute blur-[100px] ${b.pos}`}
          style={{
            width: b.size,
            height: b.size,
            background: b.accent
              ? "radial-gradient(circle at 40% 40%, var(--accent) 0%, transparent 65%)"
              : "radial-gradient(circle at 60% 60%, var(--foreground) 0%, transparent 65%)",
            opacity: b.opacity,
            borderRadius: b.r1,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: b.drift.x,
                  y: b.drift.y,
                  borderRadius: [b.r1, b.r2, b.r1],
                  scale: [1, 1.06, 0.97, 1],
                }
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}

      {/* Subtle slow-rotating conic gradient — very faint depth layer */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[90rem] w-[90rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--accent) 15%, transparent 35%, transparent 55%, var(--foreground) 72%, transparent 88%)",
          opacity: 0.045,
          filter: "blur(160px)",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      />

      {/* Fine noise grain for a premium, textured finish */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.028,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default AmbientField;
