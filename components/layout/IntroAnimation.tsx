"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "idle" | "opening" | "logo" | "expanding" | "exit";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("pg-intro-v2")) {
      setSkip(true);
      return;
    }

    const timers = [
      setTimeout(() => setPhase("opening"),  400),
      setTimeout(() => setPhase("logo"),    1700),
      setTimeout(() => setPhase("expanding"), 2700),
      setTimeout(() => {
        setPhase("exit");
        sessionStorage.setItem("pg-intro-v2", "1");
      }, 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!mounted || skip) return null;
  if (phase === "exit") return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        {phase !== "expanding" ? (
          <Laptop key="laptop" phase={phase} />
        ) : (
          <ExpandingScreen key="expand" />
        )}
      </AnimatePresence>
    </div>
  );
}

function Laptop({ phase }: { phase: Phase }) {
  return (
    <motion.div
      key="laptop-inner"
      className="flex flex-col items-center select-none"
      style={{ perspective: "1400px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* SCREEN / LID */}
      <motion.div
        className="relative w-[340px] overflow-hidden"
        style={{ transformOrigin: "bottom center" }}
        initial={{ height: 8, rotateX: -88 }}
        animate={
          phase === "idle"
            ? { height: 8, rotateX: -88 }
            : { height: 212, rotateX: 0 }
        }
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* outer bezel */}
        <div className="absolute inset-0 rounded-t-xl bg-[#181818] border border-[#2e2e2e]" />
        {/* camera dot */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2a2a2a]" />
        {/* screen */}
        <div className="absolute inset-[4px] rounded-t-lg bg-[#050505] overflow-hidden">
          {/* scanlines */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
            }}
          />
          {/* logo */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: phase === "logo" ? 1 : 0, y: phase === "logo" ? 0 : 6 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={phase === "logo" ? { scale: [1, 1.07, 1] } : { scale: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
            >
              <LogoMark size={44} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* HINGE */}
      <div className="w-[352px] h-[3px] bg-[#202020] rounded-full" />

      {/* BASE */}
      <div
        className="w-[358px] h-[18px] bg-[#181818] rounded-b-2xl border-x border-b border-[#252525]"
        style={{ transform: "rotateX(-8deg)", transformOrigin: "top center" }}
      />

      {/* desk shadow */}
      <div
        className="mt-2 w-44 h-2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse,rgba(0,0,0,0.65) 0%,transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function ExpandingScreen() {
  return (
    <motion.div
      key="expanding-screen"
      className="absolute flex items-center justify-center bg-[#050505]"
      initial={{ width: 332, height: 204, borderRadius: 10 }}
      animate={{ width: "100vw", height: "100vh", borderRadius: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <LogoMark size={52} />
      </motion.div>
    </motion.div>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      aria-hidden
      className="object-contain"
    />
  );
}

export default IntroAnimation;
