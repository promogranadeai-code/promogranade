"use client";

/**
 * Per-service animated SVG infographic for the service hero's right-hand
 * column — same visual language as components/blog/BlogVisual.tsx (white
 * line-art scenes on a self-contained red/black gradient panel, so it
 * reads identically in both site themes), mapped one-to-one by service
 * category instead of by blog post.
 */
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Scene, type SceneKind } from "@/components/blog/BlogVisual";

const ICON_SCENE: Record<string, SceneKind> = {
  web: "devCompare",
  apps: "saasStack",
  agents: "agents",
  seo: "search",
  social: "social",
  ads: "adsCompare",
  workflow: "automation",
  ai: "retrieval",
};

const ICON_TAG: Record<string, string> = {
  web: "MODERN WEB STACK",
  apps: "SYSTEM ARCHITECTURE",
  agents: "MULTI-AGENT ORCHESTRATION",
  seo: "ANSWER ENGINE RANKING",
  social: "ENGAGEMENT GROWTH",
  ads: "BUDGET ALLOCATION",
  workflow: "WORKFLOW PIPELINE",
  ai: "RETRIEVAL-AUGMENTED GENERATION",
};

const ICON_GRADIENT: Record<string, string> = {
  web: "linear-gradient(135deg,#e0142c 0%,#111 100%)",
  apps: "linear-gradient(135deg,#0f0f0f 0%,#e0142c 100%)",
  agents: "linear-gradient(135deg,#e0142c 0%,#7a0014 100%)",
  seo: "linear-gradient(135deg,#111 0%,#e0142c 80%)",
  social: "linear-gradient(135deg,#e0142c 0%,#8b0000 100%)",
  ads: "linear-gradient(135deg,#e0142c 0%,#4a0010 100%)",
  workflow: "linear-gradient(135deg,#1a1a1a 0%,#3d0008 100%)",
  ai: "linear-gradient(135deg,#e0142c 0%,#0a0a0a 100%)",
};

export function ServiceVisual({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const kind = ICON_SCENE[iconKey] ?? "agents";
  const gradient = ICON_GRADIENT[iconKey] ?? ICON_GRADIENT.agents;
  const tag = ICON_TAG[iconKey] ?? ICON_TAG.agents;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{ background: gradient }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial="hidden"
        animate="show"
      >
        <defs>
          <pattern id={`grid-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0 H0 V22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="44%" r="62%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width="100%" height="100%" fill={`url(#grid-${uid})`} />
        <rect x={0} y={0} width="100%" height="100%" fill={`url(#glow-${uid})`} />

        <Scene kind={kind} reduce={reduce} />

        <text
          x={20}
          y={186}
          fontSize={9}
          letterSpacing={2.4}
          fontWeight={600}
          fill="rgba(255,255,255,0.6)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
        >
          {tag}
        </text>
      </motion.svg>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export default ServiceVisual;
