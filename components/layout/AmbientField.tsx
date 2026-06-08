"use client";

/**
 * Mild ambient backdrop for everything OUTSIDE the hero sections.
 *
 * The heavy WebGL liquid (`SiteLiquid`) is now scoped to hero sections only —
 * everywhere else gets this much lighter, CSS-driven drift of soft blurred
 * glows. Cheap (no WebGL, no per-frame JS), theme-aware via CSS variables,
 * and subtle enough not to compete with foreground content or look gaudy.
 */

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  { className: "h-[34rem] w-[34rem] -left-40 -top-32", duration: 46, accent: true },
  { className: "h-[28rem] w-[28rem] right-[-8rem] top-[32%]", duration: 54, accent: false },
  { className: "h-[30rem] w-[30rem] left-[18%] bottom-[-10rem]", duration: 60, accent: true },
];

export function AmbientField() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -2 }}
      aria-hidden
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${o.className}`}
          style={{
            background: o.accent
              ? "radial-gradient(circle, var(--accent) 0%, transparent 70%)"
              : "radial-gradient(circle, var(--foreground) 0%, transparent 70%)",
            opacity: o.accent ? 0.07 : 0.045,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 60, -40, 0],
                  y: [0, -50, 40, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: o.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default AmbientField;
