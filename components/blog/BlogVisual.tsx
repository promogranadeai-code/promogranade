"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   BlogVisual — topic-specific animated SVG infographics.

   One distinct, hand-built scene per post (keyed by slug, with a
   category fallback). Every scene renders white/light geometry on the
   post's own colored gradient panel, so it reads identically in both
   the light and dark site themes — the panel is self-contained.

   Variants:
     hero  — large featured card / article hero (shows the scene tag)
     card  — grid + related cards
     mini  — tiny decorative swatch (home "Field notes" list)
   ──────────────────────────────────────────────────────────────── */

type Variant = "hero" | "card" | "mini";

type SceneKind =
  | "agents"
  | "retrieval"
  | "search"
  | "automation"
  | "devCompare"
  | "adsCompare"
  | "social"
  | "saasStack";

const SLUG_SCENE: Record<string, SceneKind> = {
  "ai-agents-business-2025": "agents",
  "rag-pipelines-business-guide": "retrieval",
  "geo-aeo-seo-2025-guide": "search",
  "workflow-automation-business-growth": "automation",
  "nextjs-vs-wordpress-2025": "devCompare",
  "meta-ads-vs-google-ads-2025": "adsCompare",
  "social-media-marketing-2025-playbook": "social",
  "building-saas-product-2025": "saasStack",
};

const CAT_SCENE: Record<string, SceneKind> = {
  AI: "agents",
  SEO: "search",
  Automation: "automation",
  Development: "devCompare",
  Marketing: "adsCompare",
  Engineering: "saasStack",
};

const TAG: Record<SceneKind, string> = {
  agents: "MULTI-AGENT ORCHESTRATION",
  retrieval: "RETRIEVAL-AUGMENTED GENERATION",
  search: "ANSWER ENGINE RANKING",
  automation: "WORKFLOW PIPELINE",
  devCompare: "PLATFORM BENCHMARK",
  adsCompare: "BUDGET ALLOCATION",
  social: "ENGAGEMENT GROWTH",
  saasStack: "SYSTEM ARCHITECTURE",
};

/* Palette — white structure + a brightened accent that pops on the
   dark gradient panels (the site accent #e0142c reads muddy on red). */
const W = "rgba(255,255,255,0.92)";
const Wf = "rgba(255,255,255,0.34)";
const Wff = "rgba(255,255,255,0.16)";
const NODE = "rgba(255,255,255,0.08)";
const A = "#ff5168";

/* ── Motion variants ─────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const drawV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 },
      opacity: { duration: 0.01, delay: 0.15 + i * 0.1 },
    },
  }),
};

const popV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 16, delay: 0.3 + i * 0.08 },
  }),
};

const riseV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 },
  }),
};

const growV: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: (i = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.25 + i * 0.1 },
  }),
};

/* ── Reusable bits ───────────────────────────────────────────────── */

function Flow({
  from,
  to,
  delay = 0,
  reduce,
  dur = 2,
}: {
  from: [number, number];
  to: [number, number];
  delay?: number;
  reduce: boolean;
  dur?: number;
}) {
  if (reduce) {
    return <circle cx={(from[0] + to[0]) / 2} cy={(from[1] + to[1]) / 2} r={2.4} fill={A} opacity={0.9} />;
  }
  return (
    <motion.circle
      r={2.6}
      fill={A}
      initial={{ cx: from[0], cy: from[1], opacity: 0 }}
      animate={{ cx: [from[0], to[0]], cy: [from[1], to[1]], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.15, 0.85, 1] }}
    />
  );
}

function Pulse({ cx, cy, reduce, r = 10 }: { cx: number; cy: number; reduce: boolean; r?: number }) {
  if (reduce) return null;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      stroke={A}
      strokeWidth={1.2}
      initial={{ r, opacity: 0.55 }}
      animate={{ r: [r, r + 18], opacity: [0.55, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* ── Scenes ──────────────────────────────────────────────────────── */

function Scene({ kind, reduce }: { kind: SceneKind; reduce: boolean }) {
  switch (kind) {
    /* AI agents — orchestrator with satellite tools + data pulses */
    case "agents": {
      const sat: [number, number][] = [
        [70, 58],
        [250, 58],
        [70, 142],
        [250, 142],
      ];
      return (
        <>
          {sat.map((s, i) => (
            <motion.line
              key={`l${i}`}
              x1={160}
              y1={100}
              x2={s[0]}
              y2={s[1]}
              stroke={Wf}
              strokeWidth={1.3}
              variants={drawV}
              custom={i}
            />
          ))}
          {sat.map((s, i) => (
            <Flow key={`f${i}`} from={[160, 100]} to={s} delay={0.3 + i * 0.35} reduce={reduce} />
          ))}
          {sat.map((s, i) => (
            <motion.g key={`n${i}`} variants={popV} custom={i}>
              <circle cx={s[0]} cy={s[1]} r={13} fill={NODE} stroke={W} strokeWidth={1.4} />
              <circle cx={s[0]} cy={s[1]} r={3} fill={A} />
            </motion.g>
          ))}
          <Pulse cx={160} cy={100} reduce={reduce} r={22} />
          <motion.g variants={popV} custom={-1.5}>
            <circle cx={160} cy={100} r={23} fill={NODE} stroke={W} strokeWidth={1.8} />
            <circle cx={160} cy={100} r={5} fill={A} />
            <path d="M160 84 v8 M160 108 v8 M144 100 h8 M168 100 h8" stroke={W} strokeWidth={1.6} strokeLinecap="round" />
          </motion.g>
        </>
      );
    }

    /* RAG — documents → vector grid → grounded answer */
    case "retrieval": {
      const grid: [number, number][] = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push([142 + c * 16, 84 + r * 16]);
      return (
        <>
          {/* document stack */}
          <motion.g variants={riseV} custom={0}>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={34 + i * 5}
                y={72 - i * 5}
                width={42}
                height={54}
                rx={4}
                fill={NODE}
                stroke={W}
                strokeWidth={1.3}
              />
            ))}
            <path d="M44 88 h26 M44 98 h26 M44 108 h18" stroke={Wf} strokeWidth={1.4} strokeLinecap="round" />
          </motion.g>
          {/* arrows */}
          <motion.line x1={84} y1={100} x2={128} y2={100} stroke={Wf} strokeWidth={1.4} variants={drawV} custom={1} />
          <motion.line x1={196} y1={100} x2={240} y2={100} stroke={Wf} strokeWidth={1.4} variants={drawV} custom={2} />
          <Flow from={[86, 100]} to={[126, 100]} reduce={reduce} delay={0.4} />
          <Flow from={[198, 100]} to={[238, 100]} reduce={reduce} delay={1.1} />
          {/* vector grid */}
          {grid.map((g, i) => (
            <motion.circle key={i} cx={g[0]} cy={g[1]} r={3.4} fill={i % 4 === 0 ? A : W} variants={popV} custom={i * 0.4} />
          ))}
          {/* answer card */}
          <motion.g variants={riseV} custom={2}>
            <rect x={244} y={74} width={48} height={52} rx={6} fill={NODE} stroke={W} strokeWidth={1.5} />
            <path d="M254 90 h28 M254 100 h28 M254 110 h18" stroke={Wf} strokeWidth={1.4} strokeLinecap="round" />
            <circle cx={285} cy={110} r={3} fill={A} />
          </motion.g>
        </>
      );
    }

    /* SEO / GEO — answer card with ranked, cited results */
    case "search": {
      const bars = [
        { y: 96, w: 150, cite: false },
        { y: 120, w: 196, cite: true },
        { y: 144, w: 116, cite: false },
      ];
      return (
        <>
          {/* search bar */}
          <motion.g variants={riseV} custom={0}>
            <rect x={62} y={50} width={196} height={28} rx={14} fill={NODE} stroke={W} strokeWidth={1.5} />
            <circle cx={82} cy={64} r={6} fill="none" stroke={W} strokeWidth={1.6} />
            <line x1={86} y1={68} x2={91} y2={73} stroke={W} strokeWidth={1.6} strokeLinecap="round" />
            <rect x={102} y={60} width={70} height={8} rx={4} fill={Wf} />
            <rect className={reduce ? undefined : "cursor-blink"} x={176} y={57} width={2} height={14} fill={A} />
          </motion.g>
          {/* ranked result bars */}
          {bars.map((b, i) => (
            <motion.g key={i} variants={riseV} custom={i + 1}>
              <rect x={62} y={b.y} width={b.w} height={14} rx={7} fill={b.cite ? A : Wff} stroke={b.cite ? A : Wf} strokeWidth={1.2} />
              {b.cite && (
                <>
                  <text x={70} y={b.y + 10.5} fontSize={11} fontWeight={700} fill="#fff" fontFamily="ui-monospace, monospace">
                    &ldquo;
                  </text>
                  <circle cx={62 + b.w + 14} cy={b.y + 7} r={8} fill={NODE} stroke={A} strokeWidth={1.5} />
                  <path d={`M${62 + b.w + 10} ${b.y + 7} l3 3 l5 -6`} stroke={A} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </motion.g>
          ))}
        </>
      );
    }

    /* Automation — trigger → action pipeline with a branch + gear */
    case "automation": {
      const nodes: [number, number][] = [
        [56, 100],
        [128, 100],
        [200, 100],
        [272, 100],
      ];
      return (
        <>
          {nodes.slice(0, -1).map((n, i) => (
            <motion.line
              key={i}
              x1={n[0] + 16}
              y1={100}
              x2={nodes[i + 1][0] - 16}
              y2={100}
              stroke={Wf}
              strokeWidth={1.4}
              variants={drawV}
              custom={i}
            />
          ))}
          {/* branch */}
          <motion.path d="M200 116 v22 h-44" fill="none" stroke={Wff} strokeWidth={1.4} variants={drawV} custom={3} />
          <motion.g variants={popV} custom={3}>
            <rect x={140} y={130} width={16} height={16} rx={4} fill={NODE} stroke={W} strokeWidth={1.3} />
          </motion.g>
          {nodes.map((n, i) =>
            i < nodes.length - 1 ? <Flow key={`f${i}`} from={[n[0] + 16, 100]} to={[nodes[i + 1][0] - 16, 100]} reduce={reduce} delay={0.3 + i * 0.45} dur={1.6} /> : null
          )}
          {nodes.map((n, i) => (
            <motion.g key={`n${i}`} variants={popV} custom={i}>
              <rect x={n[0] - 16} y={84} width={32} height={32} rx={8} fill={NODE} stroke={W} strokeWidth={1.5} />
              {i === 0 && <path d="M56 92 v16 M48 100 h16" stroke={A} strokeWidth={1.8} strokeLinecap="round" />}
              {i === 1 && <circle cx={128} cy={100} r={4} fill={A} />}
              {i === 2 && (
                <motion.g
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Gear cx={200} cy={100} />
                </motion.g>
              )}
              {i === 3 && <path d="M266 100 l4 4 l8 -9" stroke={A} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            </motion.g>
          ))}
        </>
      );
    }

    /* Next.js vs WordPress — two window frames + perf gauge */
    case "devCompare": {
      const win = (x: number, lead: boolean, key: string) => (
        <motion.g key={key} variants={riseV} custom={lead ? 0 : 1}>
          <rect x={x} y={54} width={110} height={92} rx={8} fill={NODE} stroke={lead ? W : Wf} strokeWidth={1.5} />
          <line x1={x} y1={72} x2={x + 110} y2={72} stroke={lead ? W : Wf} strokeWidth={1.3} />
          <circle cx={x + 12} cy={63} r={2.4} fill={A} />
          <circle cx={x + 22} cy={63} r={2.4} fill={Wf} />
          <circle cx={x + 32} cy={63} r={2.4} fill={Wf} />
          {/* perf bars inside */}
          {[0, 1, 2].map((b) => (
            <motion.rect
              key={b}
              x={x + 16 + b * 26}
              y={132}
              width={16}
              height={lead ? [46, 34, 40][b] : [20, 14, 24][b]}
              rx={3}
              fill={lead ? A : Wff}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              variants={growV}
              custom={b + (lead ? 1 : 2)}
            />
          ))}
        </motion.g>
      );
      return (
        <>
          {win(40, true, "a")}
          {win(170, false, "b")}
          <motion.g variants={popV} custom={2}>
            <circle cx={160} cy={100} r={15} fill="rgba(10,10,10,0.5)" stroke={W} strokeWidth={1.4} />
            <text x={160} y={104} textAnchor="middle" fontSize={11} fontWeight={800} fill={W} fontFamily="ui-monospace, monospace">
              VS
            </text>
          </motion.g>
        </>
      );
    }

    /* Meta vs Google — twin donut gauges + click target */
    case "adsCompare": {
      const donut = (cx: number, pct: number, key: string, i: number) => {
        const r = 26;
        const c = 2 * Math.PI * r;
        return (
          <motion.g key={key} variants={popV} custom={i}>
            <circle cx={cx} cy={96} r={r} fill="none" stroke={Wff} strokeWidth={7} />
            <motion.circle
              cx={cx}
              cy={96}
              r={r}
              fill="none"
              stroke={A}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray={c}
              transform={`rotate(-90 ${cx} 96)`}
              initial={{ strokeDashoffset: c }}
              variants={{
                hidden: { strokeDashoffset: c },
                show: { strokeDashoffset: c * (1 - pct), transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.15 } },
              }}
            />
            <text x={cx} y={100} textAnchor="middle" fontSize={13} fontWeight={800} fill={W} fontFamily="ui-monospace, monospace">
              {Math.round(pct * 100)}
            </text>
          </motion.g>
        );
      };
      return (
        <>
          {donut(104, 0.62, "g", 0)}
          {donut(216, 0.41, "m", 1)}
          {/* baseline bars */}
          {[0, 1, 2, 3].map((b) => (
            <motion.rect
              key={b}
              x={92 + b * 34}
              y={150}
              width={20}
              height={[14, 22, 10, 18][b]}
              rx={3}
              fill={b % 2 ? Wff : Wf}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              variants={growV}
              custom={b + 2}
            />
          ))}
          {/* click target */}
          {!reduce && (
            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 1.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1 }}
            >
              <circle cx={104} cy={96} r={20} fill="none" stroke={A} strokeWidth={1.4} />
            </motion.g>
          )}
          <path d="M214 92 l0 18 l5 -5 l4 9 l4 -2 l-4 -9 l7 0 z" fill={W} stroke="rgba(10,10,10,0.6)" strokeWidth={0.8} />
        </>
      );
    }

    /* Social — rising engagement curve + floating reactions */
    case "social": {
      const pts: [number, number][] = [
        [50, 150],
        [96, 128],
        [142, 138],
        [188, 96],
        [234, 110],
        [280, 64],
      ];
      const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
      return (
        <>
          {/* baseline */}
          <line x1={44} y1={162} x2={292} y2={162} stroke={Wff} strokeWidth={1.2} />
          {/* area-ish guide */}
          <motion.path d={d} fill="none" stroke={W} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" variants={drawV} custom={0} />
          {pts.map((p, i) => (
            <motion.circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? A : W} variants={popV} custom={i * 0.6 + 1} />
          ))}
          {/* floating reactions */}
          {(
            [
              { x: 96, y: 96, t: "heart" },
              { x: 196, y: 60, t: "play" },
              { x: 252, y: 40, t: "heart" },
            ] as const
          ).map((rx, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={reduce ? { opacity: 0.9 } : { opacity: [0, 1, 1, 0], y: [8, -8, -8, -16] }}
              transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 + i * 0.7 }}
            >
              {rx.t === "heart" ? (
                <path
                  d={`M${rx.x} ${rx.y + 4} c -4 -5 -10 -1 -6 4 l6 6 l6 -6 c4 -5 -2 -9 -6 -4 z`}
                  fill={A}
                />
              ) : (
                <g>
                  <circle cx={rx.x} cy={rx.y + 2} r={7} fill="none" stroke={W} strokeWidth={1.4} />
                  <path d={`M${rx.x - 2} ${rx.y - 1} l5 3 l-5 3 z`} fill={W} />
                </g>
              )}
            </motion.g>
          ))}
        </>
      );
    }

    /* SaaS architecture — stacked, connected system layers */
    case "saasStack": {
      const layers = [
        { y: 60, label: "UI" },
        { y: 92, label: "API" },
        { y: 124, label: "DB" },
      ];
      return (
        <>
          {/* spine */}
          <motion.line x1={160} y1={72} x2={160} y2={136} stroke={Wf} strokeWidth={1.4} variants={drawV} custom={3} />
          {layers.map((l, i) => (
            <motion.g key={i} variants={riseV} custom={i}>
              <rect x={92} y={l.y} width={136} height={26} rx={6} fill={NODE} stroke={W} strokeWidth={1.5} />
              <rect x={100} y={l.y + 9} width={30} height={8} rx={4} fill={Wf} />
              <circle cx={210} cy={l.y + 13} r={4} fill={i === 2 ? A : Wf} />
              <text x={150} y={l.y + 17} textAnchor="end" fontSize={9} fontWeight={700} fill={W} fontFamily="ui-monospace, monospace">
                {l.label}
              </text>
            </motion.g>
          ))}
          {[72, 104].map((y, i) => (
            <Flow key={i} from={[160, y]} to={[160, y + 32]} reduce={reduce} delay={0.4 + i * 0.5} dur={1.5} />
          ))}
          {/* db cylinder hint */}
          <motion.g variants={popV} custom={3}>
            <ellipse cx={160} cy={150} rx={14} ry={4} fill={NODE} stroke={Wf} strokeWidth={1.2} />
          </motion.g>
        </>
      );
    }
  }
}

function Gear({ cx, cy }: { cx: number; cy: number }) {
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = cx + Math.cos(a) * 8;
    const y1 = cy + Math.sin(a) * 8;
    const x2 = cx + Math.cos(a) * 11;
    const y2 = cy + Math.sin(a) * 11;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={A} strokeWidth={1.6} strokeLinecap="round" />;
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={6.5} fill="none" stroke={A} strokeWidth={1.6} />
      {teeth}
    </>
  );
}

/* Compact, kind-agnostic motif for the tiny home swatch */
function MiniScene({ reduce }: { reduce: boolean }) {
  const dots = [40, 92, 144];
  return (
    <>
      <line x1={40} y1={50} x2={144} y2={50} stroke={Wf} strokeWidth={1.6} />
      {dots.map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={50}
          r={i === 1 ? 9 : 6}
          fill={NODE}
          stroke={W}
          strokeWidth={1.6}
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
      <circle cx={92} cy={50} r={3} fill={A} />
      {!reduce && <Flow from={[40, 50]} to={[144, 50]} reduce={false} delay={0.2} dur={2.2} />}
    </>
  );
}

/* ── Public component ────────────────────────────────────────────── */

export function BlogVisual({
  slug,
  category,
  gradient,
  variant = "card",
  transparent = false,
  className,
}: {
  slug: string;
  category: string;
  gradient: string;
  variant?: Variant;
  /** Skip drawing the gradient panel (parent already provides it). */
  transparent?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const kind = SLUG_SCENE[slug] ?? CAT_SCENE[category] ?? "agents";
  const isMini = variant === "mini";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={transparent ? undefined : { background: gradient }}
      aria-hidden
    >
      {/* hover lift — animated scene breathes when its card is hovered */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <motion.svg
          viewBox={isMini ? "0 0 184 100" : "0 0 320 200"}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
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

          {isMini ? <MiniScene reduce={reduce} /> : <Scene kind={kind} reduce={reduce} />}

          {variant === "hero" && (
            <text
              x={20}
              y={186}
              fontSize={9}
              letterSpacing={2.4}
              fontWeight={600}
              fill="rgba(255,255,255,0.6)"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
            >
              {TAG[kind]}
            </text>
          )}
        </motion.svg>
      </div>

      {/* subtle inner edge for definition on both themes */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}
