"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   SectionVisual — theme-aware animated infographic shown ABOVE each
   article heading.

   Unlike BlogVisual (which paints white geometry on a coloured
   gradient panel), these sit inline on the article background. So all
   structure is drawn in `currentColor` — it inherits the article's
   foreground and therefore flips automatically between the light and
   dark themes — while highlights use the theme-constant `var(--accent)`.

   One motif per section, chosen to match the heading's intent. The
   slug → motif[] map lives here so the blog data stays clean; the page
   just passes (slug, index).
   ──────────────────────────────────────────────────────────────── */

type Kind =
  | "shift"
  | "contrast"
  | "grid"
  | "flow"
  | "layers"
  | "checklist"
  | "branch"
  | "growth"
  | "ranking"
  | "gauge"
  | "network"
  | "caution";

/* Per-post motif sequence — one entry per article section, in order. */
const SECTION_VISUALS: Record<string, Kind[]> = {
  "ai-agents-business-2025": ["shift", "contrast", "grid", "network", "caution", "flow"],
  "geo-aeo-seo-2025-guide": ["shift", "ranking", "checklist", "network", "gauge"],
  "workflow-automation-business-growth": ["caution", "flow", "grid", "checklist", "layers"],
  "nextjs-vs-wordpress-2025": ["contrast", "checklist", "growth", "ranking", "branch"],
  "rag-pipelines-business-guide": ["caution", "network", "flow", "layers", "branch"],
  "meta-ads-vs-google-ads-2025": ["contrast", "ranking", "growth", "gauge", "grid"],
  "social-media-marketing-2025-playbook": ["caution", "grid", "layers", "network", "gauge"],
  "building-saas-product-2025": ["growth", "layers", "branch", "caution", "flow"],
};

/* Fallback rotation, keyed by category, when a slug isn't mapped. */
const CAT_CYCLE: Record<string, Kind[]> = {
  AI: ["network", "flow", "grid", "layers", "caution"],
  SEO: ["ranking", "checklist", "growth", "network", "gauge"],
  Automation: ["flow", "grid", "checklist", "layers", "caution"],
  Development: ["contrast", "growth", "layers", "ranking", "branch"],
  Marketing: ["contrast", "growth", "gauge", "grid", "ranking"],
  Engineering: ["layers", "branch", "flow", "growth", "caution"],
};

const DEFAULT_CYCLE: Kind[] = ["flow", "grid", "layers", "growth", "checklist", "network"];

/* Short editorial caption per motif. */
const LABEL: Record<Kind, string> = {
  shift: "Paradigm shift",
  contrast: "Head to head",
  grid: "In practice",
  flow: "Pipeline",
  layers: "Architecture",
  checklist: "Key moves",
  branch: "Decision path",
  growth: "Trajectory",
  ranking: "Ranked results",
  gauge: "By the numbers",
  network: "System map",
  caution: "Watch-outs",
};

/* Structure inherits the article text colour; highlight is the theme
   token (constant red across both themes). */
const STRUCT = "currentColor";
const ACCENT = "var(--accent)";

/* ── Motion variants ─────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const drawV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.09 },
      opacity: { duration: 0.01, delay: 0.1 + i * 0.09 },
    },
  }),
};

const popV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 230, damping: 17, delay: 0.2 + i * 0.07 },
  }),
};

const riseV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: 0.12 + i * 0.1 },
  }),
};

const growV: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: (i = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE, delay: 0.2 + i * 0.09 },
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
    return <circle cx={(from[0] + to[0]) / 2} cy={(from[1] + to[1]) / 2} r={3} style={{ fill: ACCENT }} />;
  }
  return (
    <motion.circle
      r={3}
      style={{ fill: ACCENT }}
      initial={{ opacity: 0 }}
      animate={{ cx: [from[0], to[0]], cy: [from[1], to[1]], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.15, 0.85, 1] }}
    />
  );
}

function Pulse({ cx, cy, r = 18, reduce }: { cx: number; cy: number; r?: number; reduce: boolean }) {
  if (reduce) return null;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      style={{ stroke: ACCENT }}
      strokeWidth={1.2}
      initial={{ r, opacity: 0.5 }}
      animate={{ r: [r, r + 22], opacity: [0.5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* A small window-chrome dot triplet for "panel" motifs. */
function Chrome({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={2.6} style={{ fill: ACCENT }} />
      <circle cx={x + 10} cy={y} r={2.6} fill={STRUCT} fillOpacity={0.35} />
      <circle cx={x + 20} cy={y} r={2.6} fill={STRUCT} fillOpacity={0.35} />
    </>
  );
}

/* ── Scenes (drawn in a 600×150 strip) ───────────────────────────── */

function Scene({ kind, reduce }: { kind: Kind; reduce: boolean }) {
  switch (kind) {
    /* Old single tool → new autonomous agent */
    case "shift": {
      return (
        <>
          {/* left: a plain "tool" box */}
          <motion.g variants={riseV} custom={0}>
            <rect x={70} y={52} width={92} height={46} rx={8} fill={STRUCT} fillOpacity={0.05} stroke={STRUCT} strokeOpacity={0.45} strokeWidth={1.4} />
            <path d="M88 70 h56 M88 80 h36" stroke={STRUCT} strokeOpacity={0.4} strokeWidth={1.6} strokeLinecap="round" />
          </motion.g>
          {/* arrow */}
          <motion.line x1={186} y1={75} x2={376} y2={75} stroke={STRUCT} strokeOpacity={0.4} strokeWidth={1.5} variants={drawV} custom={1} />
          <motion.path d="M370 69 l8 6 l-8 6" fill="none" stroke={STRUCT} strokeOpacity={0.5} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" variants={drawV} custom={2} />
          <Flow from={[190, 75]} to={[372, 75]} reduce={reduce} delay={0.5} dur={2.2} />
          {/* right: agent node with satellites */}
          {([[470, 40], [538, 75], [470, 110]] as [number, number][]).map((s, i) => (
            <g key={i}>
              <motion.line x1={440} y1={75} x2={s[0]} y2={s[1]} stroke={STRUCT} strokeOpacity={0.3} strokeWidth={1.2} variants={drawV} custom={3 + i} />
              <motion.circle cx={s[0]} cy={s[1]} r={9} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeOpacity={0.55} strokeWidth={1.3} variants={popV} custom={3 + i} />
            </g>
          ))}
          <Pulse cx={440} cy={75} r={26} reduce={reduce} />
          <motion.g variants={popV} custom={2}>
            <circle cx={440} cy={75} r={24} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeWidth={1.7} />
            <circle cx={440} cy={75} r={5} style={{ fill: ACCENT }} />
            <path d="M440 59 v8 M440 83 v8 M424 75 h8 M448 75 h8" stroke={STRUCT} strokeWidth={1.6} strokeLinecap="round" />
          </motion.g>
        </>
      );
    }

    /* Two panels side by side, divider + VS */
    case "contrast": {
      const panel = (x: number, lead: boolean, key: string, i: number) => (
        <motion.g key={key} variants={riseV} custom={i}>
          <rect x={x} y={28} width={210} height={94} rx={10} fill={STRUCT} fillOpacity={lead ? 0.06 : 0.03} stroke={STRUCT} strokeOpacity={lead ? 0.6 : 0.4} strokeWidth={1.5} />
          <line x1={x} y1={50} x2={x + 210} y2={50} stroke={STRUCT} strokeOpacity={lead ? 0.5 : 0.3} strokeWidth={1.2} />
          <Chrome x={x + 16} y={39} />
          {[0, 1, 2].map((b) => (
            <motion.rect
              key={b}
              x={x + 24 + b * 40}
              y={108}
              width={26}
              height={lead ? [44, 30, 38][b] : [22, 14, 26][b]}
              rx={4}
              fill={lead ? ACCENT : STRUCT}
              fillOpacity={lead ? 1 : 0.18}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              variants={growV}
              custom={b + (lead ? 1 : 2)}
            />
          ))}
        </motion.g>
      );
      return (
        <>
          {panel(46, true, "a", 0)}
          {panel(344, false, "b", 1)}
          <line x1={300} y1={26} x2={300} y2={124} stroke={STRUCT} strokeOpacity={0.18} strokeWidth={1.2} strokeDasharray="3 5" />
          <motion.g variants={popV} custom={2}>
            <circle cx={300} cy={75} r={18} fill={STRUCT} fillOpacity={0.08} stroke={STRUCT} strokeWidth={1.5} />
            <text x={300} y={79} textAnchor="middle" fontSize={12} fontWeight={800} fill={STRUCT} fontFamily="ui-monospace, monospace">
              VS
            </text>
          </motion.g>
        </>
      );
    }

    /* Row of four cards, one highlighted */
    case "grid": {
      const cards = [35, 178, 321, 464];
      return (
        <>
          {cards.map((x, i) => {
            const lead = i === 2;
            return (
              <motion.g key={i} variants={popV} custom={i}>
                <rect x={x} y={38} width={101} height={74} rx={10} fill={STRUCT} fillOpacity={lead ? 0.07 : 0.035} stroke={lead ? ACCENT : STRUCT} strokeOpacity={lead ? 1 : 0.4} strokeWidth={1.5} />
                <circle cx={x + 18} cy={58} r={5} fill={lead ? ACCENT : STRUCT} fillOpacity={lead ? 1 : 0.4} />
                <path d={`M${x + 16} 84 h64 M${x + 16} 96 h40`} stroke={STRUCT} strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" />
              </motion.g>
            );
          })}
        </>
      );
    }

    /* Four-step pipeline with a travelling pulse */
    case "flow": {
      const nodes = [90, 230, 370, 510];
      return (
        <>
          {nodes.slice(0, -1).map((x, i) => (
            <motion.line key={i} x1={x + 22} y1={75} x2={nodes[i + 1] - 22} y2={75} stroke={STRUCT} strokeOpacity={0.35} strokeWidth={1.5} variants={drawV} custom={i} />
          ))}
          {nodes.slice(0, -1).map((x, i) => (
            <Flow key={`f${i}`} from={[x + 22, 75]} to={[nodes[i + 1] - 22, 75]} reduce={reduce} delay={0.4 + i * 0.45} dur={1.7} />
          ))}
          {nodes.map((x, i) => (
            <motion.g key={`n${i}`} variants={popV} custom={i}>
              <rect x={x - 22} y={53} width={44} height={44} rx={11} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeOpacity={0.55} strokeWidth={1.5} />
              {i === 0 && <path d="M90 65 v20 M80 75 h20" style={{ stroke: ACCENT }} strokeWidth={2} strokeLinecap="round" />}
              {i === 1 && <circle cx={230} cy={75} r={5} style={{ fill: ACCENT }} />}
              {i === 2 && (
                <motion.g
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                >
                  <Gear cx={370} cy={75} />
                </motion.g>
              )}
              {i === 3 && <path d="M498 75 l6 6 l12 -14" fill="none" style={{ stroke: ACCENT }} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />}
            </motion.g>
          ))}
        </>
      );
    }

    /* Stacked layers joined by a spine */
    case "layers": {
      const rows = [
        { y: 20, label: "UI" },
        { y: 60, label: "API" },
        { y: 100, label: "DB" },
      ];
      return (
        <>
          <motion.line x1={300} y1={36} x2={300} y2={116} stroke={STRUCT} strokeOpacity={0.35} strokeWidth={1.4} variants={drawV} custom={3} />
          {rows.map((r, i) => (
            <motion.g key={i} variants={riseV} custom={i}>
              <rect x={150} y={r.y} width={300} height={30} rx={8} fill={STRUCT} fillOpacity={0.05} stroke={STRUCT} strokeOpacity={0.55} strokeWidth={1.5} />
              <rect x={166} y={r.y + 11} width={42} height={8} rx={4} fill={STRUCT} fillOpacity={0.35} />
              <text x={290} y={r.y + 20} textAnchor="end" fontSize={11} fontWeight={700} fill={STRUCT} fontFamily="ui-monospace, monospace">
                {r.label}
              </text>
              <circle cx={426} cy={r.y + 15} r={4.5} fill={i === 2 ? ACCENT : STRUCT} fillOpacity={i === 2 ? 1 : 0.4} />
            </motion.g>
          ))}
          {[36, 76].map((y, i) => (
            <Flow key={i} from={[300, y]} to={[300, y + 40]} reduce={reduce} delay={0.5 + i * 0.5} dur={1.6} />
          ))}
        </>
      );
    }

    /* Two columns of checked-off items */
    case "checklist": {
      const cols = [88, 332];
      const ys = [38, 72, 106];
      return (
        <>
          {cols.map((x, c) =>
            ys.map((y, r) => {
              const idx = c * 3 + r;
              return (
                <motion.g key={`${c}-${r}`} variants={riseV} custom={idx}>
                  <rect x={x} y={y} width={20} height={20} rx={5} fill={STRUCT} fillOpacity={0.05} stroke={STRUCT} strokeOpacity={0.5} strokeWidth={1.4} />
                  <motion.path
                    d={`M${x + 5} ${y + 10} l4 4 l7 -8`}
                    fill="none"
                    style={{ stroke: ACCENT }}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={drawV}
                    custom={idx + 1}
                  />
                  <rect x={x + 32} y={y + 4} width={148} height={5} rx={2.5} fill={STRUCT} fillOpacity={0.32} />
                  <rect x={x + 32} y={y + 13} width={108 - r * 18} height={5} rx={2.5} fill={STRUCT} fillOpacity={0.18} />
                </motion.g>
              );
            })
          )}
        </>
      );
    }

    /* One input forks into two outcomes; the chosen path is accented */
    case "branch": {
      return (
        <>
          <motion.line x1={146} y1={75} x2={250} y2={75} stroke={STRUCT} strokeOpacity={0.4} strokeWidth={1.5} variants={drawV} custom={0} />
          <motion.path d="M250 75 H300 V40 H392" fill="none" style={{ stroke: ACCENT }} strokeOpacity={0.85} strokeWidth={1.6} variants={drawV} custom={1} />
          <motion.path d="M250 75 H300 V112 H392" fill="none" stroke={STRUCT} strokeOpacity={0.3} strokeWidth={1.5} variants={drawV} custom={2} />
          <Flow from={[150, 75]} to={[250, 75]} reduce={reduce} delay={0.4} dur={1.5} />
          {/* input node */}
          <motion.g variants={popV} custom={0}>
            <circle cx={128} cy={75} r={18} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeWidth={1.6} />
            <path d="M120 75 h16 M128 67 v16" stroke={STRUCT} strokeOpacity={0.6} strokeWidth={1.6} strokeLinecap="round" />
          </motion.g>
          {/* chosen (top) */}
          <motion.g variants={popV} custom={2}>
            <circle cx={410} cy={40} r={16} fill={STRUCT} fillOpacity={0.06} stroke={ACCENT} strokeWidth={1.7} />
            <path d="M402 40 l5 5 l9 -10" fill="none" style={{ stroke: ACCENT }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
          {/* rejected (bottom) */}
          <motion.g variants={popV} custom={3}>
            <circle cx={410} cy={112} r={16} fill={STRUCT} fillOpacity={0.03} stroke={STRUCT} strokeOpacity={0.4} strokeWidth={1.5} />
            <path d="M404 106 l12 12 M416 106 l-12 12" stroke={STRUCT} strokeOpacity={0.45} strokeWidth={1.7} strokeLinecap="round" />
          </motion.g>
        </>
      );
    }

    /* Rising line chart */
    case "growth": {
      const pts: [number, number][] = [
        [60, 120],
        [148, 96],
        [236, 104],
        [324, 70],
        [412, 82],
        [500, 48],
        [560, 28],
      ];
      const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
      const area = `${line} L560 130 L60 130 Z`;
      return (
        <>
          <line x1={50} y1={130} x2={566} y2={130} stroke={STRUCT} strokeOpacity={0.2} strokeWidth={1.2} />
          {[40, 70, 100].map((y) => (
            <line key={y} x1={50} y1={y} x2={566} y2={y} stroke={STRUCT} strokeOpacity={0.06} strokeWidth={1} />
          ))}
          <motion.path d={area} style={{ fill: ACCENT }} fillOpacity={0.08} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9, duration: 0.6 } } }} />
          <motion.path d={line} fill="none" stroke={STRUCT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" variants={drawV} custom={0} />
          {pts.map((p, i) => {
            const last = i === pts.length - 1;
            return (
              <motion.circle key={i} cx={p[0]} cy={p[1]} r={last ? 5.5 : 3.5} fill={last ? ACCENT : STRUCT} fillOpacity={last ? 1 : 0.7} variants={popV} custom={i * 0.6 + 1} />
            );
          })}
          <Pulse cx={560} cy={28} r={9} reduce={reduce} />
        </>
      );
    }

    /* Ranked result bars — one cited (accent) with a check badge */
    case "ranking": {
      const bars = [
        { y: 30, w: 360, cite: false },
        { y: 66, w: 420, cite: true },
        { y: 102, w: 300, cite: false },
      ];
      return (
        <>
          {bars.map((b, i) => (
            <motion.g key={i} variants={riseV} custom={i}>
              <rect x={110} y={b.y} width={b.w} height={20} rx={10} fill={b.cite ? ACCENT : STRUCT} fillOpacity={b.cite ? 1 : 0.1} stroke={b.cite ? ACCENT : STRUCT} strokeOpacity={b.cite ? 1 : 0.4} strokeWidth={1.3} />
              <circle cx={94} cy={b.y + 10} r={8} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeOpacity={0.45} strokeWidth={1.3} />
              <text x={94} y={b.y + 14} textAnchor="middle" fontSize={10} fontWeight={700} fill={STRUCT} fillOpacity={0.7} fontFamily="ui-monospace, monospace">
                {i + 1}
              </text>
              {b.cite && (
                <motion.g variants={popV} custom={3}>
                  <circle cx={110 + b.w + 18} cy={b.y + 10} r={11} fill={STRUCT} fillOpacity={0.06} stroke={ACCENT} strokeWidth={1.6} />
                  <path d={`M${110 + b.w + 12} ${b.y + 10} l4 4 l7 -8`} fill="none" style={{ stroke: ACCENT }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
              )}
            </motion.g>
          ))}
        </>
      );
    }

    /* Two donut dials */
    case "gauge": {
      const dial = (cx: number, pct: number, key: string, i: number) => {
        const r = 42;
        const c = 2 * Math.PI * r;
        return (
          <motion.g key={key} variants={popV} custom={i}>
            <circle cx={cx} cy={75} r={r} fill="none" stroke={STRUCT} strokeOpacity={0.14} strokeWidth={9} />
            <motion.circle
              cx={cx}
              cy={75}
              r={r}
              fill="none"
              style={{ stroke: ACCENT }}
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={c}
              transform={`rotate(-90 ${cx} 75)`}
              initial={{ strokeDashoffset: c }}
              variants={{
                hidden: { strokeDashoffset: c },
                show: { strokeDashoffset: c * (1 - pct), transition: { duration: 1.1, ease: EASE, delay: 0.3 + i * 0.2 } },
              }}
            />
            <text x={cx} y={81} textAnchor="middle" fontSize={20} fontWeight={800} fill={STRUCT} fontFamily="ui-monospace, monospace">
              {Math.round(pct * 100)}
            </text>
          </motion.g>
        );
      };
      return (
        <>
          {dial(210, 0.62, "a", 0)}
          {dial(390, 0.41, "b", 1)}
        </>
      );
    }

    /* Central orchestrator + satellites */
    case "network": {
      const sat: [number, number][] = [
        [150, 38],
        [150, 112],
        [450, 38],
        [450, 112],
      ];
      return (
        <>
          {sat.map((s, i) => (
            <motion.line key={`l${i}`} x1={300} y1={75} x2={s[0]} y2={s[1]} stroke={STRUCT} strokeOpacity={0.3} strokeWidth={1.3} variants={drawV} custom={i} />
          ))}
          {sat.map((s, i) => (
            <Flow key={`f${i}`} from={[300, 75]} to={s} delay={0.4 + i * 0.3} reduce={reduce} dur={2} />
          ))}
          {sat.map((s, i) => (
            <motion.g key={`n${i}`} variants={popV} custom={i}>
              <circle cx={s[0]} cy={s[1]} r={15} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeOpacity={0.55} strokeWidth={1.4} />
              <circle cx={s[0]} cy={s[1]} r={3.5} style={{ fill: ACCENT }} />
            </motion.g>
          ))}
          <Pulse cx={300} cy={75} r={28} reduce={reduce} />
          <motion.g variants={popV} custom={-1}>
            <circle cx={300} cy={75} r={27} fill={STRUCT} fillOpacity={0.06} stroke={STRUCT} strokeWidth={1.8} />
            <circle cx={300} cy={75} r={6} style={{ fill: ACCENT }} />
            <path d="M300 56 v9 M300 85 v9 M281 75 h9 M310 75 h9" stroke={STRUCT} strokeWidth={1.7} strokeLinecap="round" />
          </motion.g>
        </>
      );
    }

    /* Warning triangle flanked by crossed-out fragments */
    case "caution": {
      return (
        <>
          {/* faded broken connections on the sides */}
          {([100, 470] as const).map((x, i) => (
            <g key={i}>
              <line x1={x} y1={75} x2={x + 30} y2={75} stroke={STRUCT} strokeOpacity={0.25} strokeWidth={1.4} strokeDasharray="4 5" />
              <rect x={x - 26} y={60} width={28} height={30} rx={6} fill={STRUCT} fillOpacity={0.03} stroke={STRUCT} strokeOpacity={0.3} strokeWidth={1.3} />
              <path d={`M${x + 36} 66 l12 18 M${x + 48} 66 l-12 18`} stroke={STRUCT} strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" />
            </g>
          ))}
          <Pulse cx={300} cy={82} r={30} reduce={reduce} />
          <motion.g variants={popV} custom={0}>
            <path
              d="M300 30 L356 116 a8 8 0 0 1 -7 12 H251 a8 8 0 0 1 -7 -12 Z"
              fill={STRUCT}
              fillOpacity={0.05}
              style={{ stroke: ACCENT }}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <rect x={296} y={62} width={8} height={30} rx={4} style={{ fill: ACCENT }} />
            <circle cx={300} cy={106} r={4.5} style={{ fill: ACCENT }} />
          </motion.g>
        </>
      );
    }
  }
}

function Gear({ cx, cy }: { cx: number; cy: number }) {
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * 8}
        y1={cy + Math.sin(a) * 8}
        x2={cx + Math.cos(a) * 11.5}
        y2={cy + Math.sin(a) * 11.5}
        style={{ stroke: ACCENT }}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    );
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={6.5} fill="none" style={{ stroke: ACCENT }} strokeWidth={1.7} />
      {teeth}
    </>
  );
}

/* ── Public component ────────────────────────────────────────────── */

function resolveKind(slug: string, category: string, index: number): Kind {
  const mapped = SECTION_VISUALS[slug]?.[index];
  if (mapped) return mapped;
  const cat = CAT_CYCLE[category];
  if (cat) return cat[index % cat.length];
  return DEFAULT_CYCLE[index % DEFAULT_CYCLE.length];
}

export function SectionVisual({
  slug,
  category,
  index,
  className,
}: {
  slug: string;
  category: string;
  index: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const kind = resolveKind(slug, category, index);

  return (
    <figure
      className={cn(
        "group not-prose relative mb-7 overflow-hidden rounded-2xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)]",
        className
      )}
    >
      <motion.svg
        viewBox="0 0 600 150"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        aria-hidden
      >
        <defs>
          <pattern id={`sgrid-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0 H0 V26" fill="none" stroke={STRUCT} strokeOpacity={0.05} strokeWidth="1" />
          </pattern>
          <radialGradient id={`sglow-${uid}`} cx="50%" cy="46%" r="60%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity={0.07} />
            <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width="100%" height="100%" fill={`url(#sgrid-${uid})`} />
        <rect x={0} y={0} width="100%" height="100%" fill={`url(#sglow-${uid})`} />

        <Scene kind={kind} reduce={reduce} />
      </motion.svg>

      {/* editorial figure caption */}
      <figcaption className="pointer-events-none absolute left-4 top-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
        <span>FIG.{String(index + 1).padStart(2, "0")}</span>
        <span className="h-3 w-px bg-[color:var(--section-border)]" />
        <span>{LABEL[kind]}</span>
      </figcaption>
    </figure>
  );
}
