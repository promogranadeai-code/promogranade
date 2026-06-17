"use client";

/**
 * Aurora ambient backdrop — pure CSS keyframe animations (GPU-accelerated
 * transforms only) with 7 large radial-gradient orbs in the brand red spectrum.
 * Replaces the framer-motion blob approach for better visual impact and lower
 * CPU overhead. The conic sweep layer stays as a framer-motion rotation since
 * it needs a continuous rotate, which CSS `animation` handles just as well.
 */

import { useReducedMotion } from "framer-motion";

type Orb = {
  size: string;
  pos: { top?: string; left?: string; right?: string; bottom?: string };
  color: string;
  opacity: number;
  blur: string;
  animation: string;
};

const ORBS: Orb[] = [
  /* 1 — large primary red, top-left anchor */
  {
    size: "72rem",
    pos: { top: "-18rem", left: "-20rem" },
    color: "radial-gradient(circle at 40% 40%, #e0142c 0%, #a00020 40%, transparent 72%)",
    opacity: 0.22,
    blur: "blur(150px)",
    animation: "aurora-a 40s ease-in-out infinite",
  },
  /* 2 — deep crimson, top-right */
  {
    size: "56rem",
    pos: { top: "5rem", right: "-14rem" },
    color: "radial-gradient(circle at 60% 35%, #b8001e 0%, #6e000f 45%, transparent 72%)",
    opacity: 0.20,
    blur: "blur(140px)",
    animation: "aurora-b 53s ease-in-out infinite",
  },
  /* 3 — brand red, bottom-center */
  {
    size: "66rem",
    pos: { bottom: "-20rem", left: "15%" },
    color: "radial-gradient(circle at 50% 55%, #e0142c 0%, #900018 42%, transparent 70%)",
    opacity: 0.20,
    blur: "blur(160px)",
    animation: "aurora-c 47s ease-in-out infinite",
  },
  /* 4 — very dark wine, mid-right (adds dark mass) */
  {
    size: "50rem",
    pos: { top: "35%", right: "-8rem" },
    color: "radial-gradient(circle at 55% 45%, #5a000e 0%, #320007 50%, transparent 72%)",
    opacity: 0.28,
    blur: "blur(120px)",
    animation: "aurora-d 61s ease-in-out infinite",
  },
  /* 5 — bright rose highlight, center */
  {
    size: "36rem",
    pos: { top: "20%", left: "38%" },
    color: "radial-gradient(circle at 50% 50%, #ff3254 0%, #cc0030 40%, transparent 70%)",
    opacity: 0.13,
    blur: "blur(110px)",
    animation: "aurora-e 44s ease-in-out infinite",
  },
  /* 6 — medium crimson, left-center */
  {
    size: "48rem",
    pos: { top: "45%", left: "-10rem" },
    color: "radial-gradient(circle at 45% 50%, #c0001a 0%, #780010 48%, transparent 72%)",
    opacity: 0.18,
    blur: "blur(130px)",
    animation: "aurora-f 57s ease-in-out infinite",
  },
  /* 7 — dark accent, bottom-right corner */
  {
    size: "44rem",
    pos: { bottom: "-12rem", right: "2%" },
    color: "radial-gradient(circle at 55% 60%, #8a0014 0%, #4a0009 50%, transparent 72%)",
    opacity: 0.22,
    blur: "blur(140px)",
    animation: "aurora-b 49s ease-in-out infinite 8s",
  },
];

export function AmbientField() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none aurora-grid"
      style={{ zIndex: -2 }}
      aria-hidden
    >
      {/* Aurora orbs — pure CSS transforms, GPU-accelerated */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            ...orb.pos,
            background: orb.color,
            opacity: orb.opacity,
            filter: orb.blur,
            borderRadius: "50%",
            willChange: "transform",
            animation: reduceMotion ? "none" : orb.animation,
          }}
        />
      ))}

      {/* Slow-rotating conic sweep — adds angular directional depth */}
      {!reduceMotion && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "100rem",
            height: "100rem",
            transform: "translate(-50%, -50%)",
            background:
              "conic-gradient(from 0deg, transparent 0%, #e0142c 12%, transparent 30%, transparent 52%, #7a000c 68%, transparent 85%)",
            opacity: 0.03,
            filter: "blur(180px)",
            animation: "aurora-spin 200s linear infinite",
            willChange: "transform",
          }}
        />
      )}

      {/* Fine film-grain for physical texture — fixed, cheap SVG noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.032,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default AmbientField;
