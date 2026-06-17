"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Snappy cinematic ease — same curve used in Remotion's premium transitions
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transKey, setTransKey] = useState(0);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setTransKey((k) => k + 1);
      // Swap content at the mid-point when panels are fully closed
      const t = setTimeout(() => setDisplayChildren(children), 560);
      return () => clearTimeout(t);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <>
      {/* Page content fades in after panels open */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.72, ease: "easeOut" }}
      >
        {displayChildren}
      </motion.div>

      {transKey > 0 && <SplitWipeTransition key={transKey} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────
// SplitWipeTransition
//
// Phase 1 (0 → 0.42s): Two black panels slide in from top + bottom
// Phase 2 (0.42 → 0.68s): Panels hold, logo glows in center seam
// Phase 3 (0.68 → 1.1s): Both panels slide OUT in opposite directions
//
// A 2px red seam line animates at the join point.
// ─────────────────────────────────────────────────────────
const DURATION = 1.12;
// keyframe time positions: [start, close, hold, open, end]
const T = [0, 0.40, 0.52, 0.64, 1] as const;

function SplitWipeTransition() {
  return (
    <>
      {/* ── RED FLASH — fires instantly, very short ── */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9988,
          background: "#dc1428",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 0.18, times: [0, 0.4, 1], ease: "easeOut" }}
      />

      {/* ── TOP PANEL ── slides down from above ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "50vh",
          background: "#080808",
          zIndex: 9990,
          overflow: "hidden",
          willChange: "transform",
        }}
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-101%"] }}
        transition={{ duration: DURATION, times: [0, T[1], T[2], 1], ease: EASE }}
      >
        {/* subtle grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
        {/* red seam at bottom edge */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, #dc1428 20%, #ff4560 50%, #dc1428 80%, transparent 100%)",
            transformOrigin: "left",
          }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: DURATION, times: [0, T[1], T[3], 1], ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── BOTTOM PANEL ── slides up from below ── */}
      <motion.div
        style={{
          position: "fixed",
          top: "50vh",
          left: 0,
          right: 0,
          height: "50vh",
          background: "#080808",
          zIndex: 9990,
          overflow: "hidden",
          willChange: "transform",
        }}
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "101%"] }}
        transition={{ duration: DURATION, times: [0, T[1], T[2], 1], ease: EASE }}
      >
        {/* subtle grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
        {/* red seam at top edge */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, #dc1428 20%, #ff4560 50%, #dc1428 80%, transparent 100%)",
            transformOrigin: "right",
          }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: DURATION, times: [0, T[1], T[3], 1], ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── CENTER LOGO — appears at the seam during hold ── */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9991,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: DURATION,
          times: [0, T[1] - 0.02, T[1] + 0.06, T[2], T[2] + 0.1],
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{ scale: [0.7, 1, 1, 0.85] }}
          transition={{
            duration: DURATION,
            times: [0, T[1] + 0.04, T[2], T[2] + 0.1],
            ease: EASE,
          }}
        >
          <Image src="/logo-mark.png" alt="" width={36} height={36} aria-hidden className="object-contain" />
        </motion.div>
      </motion.div>

      {/* ── HORIZONTAL SCAN LINE — sweeps left→right across mid ── */}
      <motion.div
        style={{
          position: "fixed",
          top: "calc(50vh - 1px)",
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(220,20,44,0.35)",
          zIndex: 9992,
          pointerEvents: "none",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
        transition={{
          duration: DURATION,
          times: [0, T[1], T[3], 1],
          ease: "linear",
        }}
      />
    </>
  );
}
