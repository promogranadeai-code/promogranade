"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextReveal, FadeUp } from "../ui/TextReveal";

export const services = [
  {
    n: "01",
    title: "Website Development",
    blurb:
      "Conversion-focused websites built on WordPress, Shopify, or fully custom Next.js — pixel-perfect, fast, and built to grow.",
    tags: ["WordPress", "Shopify", "Next.js"],
    slug: "/services/web-development",
    Art: ArtWebsite,
  },
  {
    n: "02",
    title: "Custom Applications",
    blurb:
      "Bespoke web apps, SaaS platforms, ERP systems, and agentic dashboards engineered exactly to your specification.",
    tags: ["SaaS", "ERP", "Dashboards"],
    slug: "/services/web-development",
    Art: ArtApps,
  },
  {
    n: "03",
    title: "AI Agentic Development",
    blurb:
      "Intelligent agents that plan, act, and self-correct — from single-model tools to full multi-agent orchestration.",
    tags: ["LangGraph", "Claude", "Multi-agent"],
    slug: "/services/ai-automations",
    Art: ArtAgents,
  },
  {
    n: "04",
    title: "SEO / GEO / AEO",
    blurb:
      "Get found by people and AI alike. Search, generative engine, and answer engine optimisation that compounds monthly.",
    tags: ["SEO", "GEO", "AEO"],
    slug: "/services/marketing",
    Art: ArtSEO,
  },
  {
    n: "05",
    title: "Social Media Marketing",
    blurb:
      "Content strategy, creative production, and community management across every platform that matters.",
    tags: ["Instagram", "LinkedIn", "YouTube"],
    slug: "/services/marketing",
    Art: ArtSocial,
  },
  {
    n: "06",
    title: "Meta & Google Ads",
    blurb:
      "Performance campaigns with sharp targeting, rigorous A/B testing, and spend that scales with results.",
    tags: ["Meta Ads", "Google Ads", "Performance"],
    slug: "/services/marketing",
    Art: ArtAds,
  },
  {
    n: "07",
    title: "Workflow Automation",
    blurb:
      "Make.com, n8n, and custom integrations that eliminate manual work from your business — running 24/7.",
    tags: ["n8n", "Make.com", "Zapier"],
    slug: "/services/ai-automations",
    Art: ArtWorkflow,
  },
  {
    n: "08",
    title: "Custom AI Systems",
    blurb:
      "Full-stack AI builds — RAG pipelines, fine-tuned models, vector databases, and production-grade inference.",
    tags: ["RAG", "Fine-tuning", "LLMs"],
    slug: "/services/ai-automations",
    Art: ArtAI,
  },
];

export function ServicesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragRange, setDragRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDragRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -dragRange]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative section-a"
      style={{ height: `calc(100vh + ${dragRange}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 lg:px-10 pt-20 pb-5 shrink-0">
          <FadeUp>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--section-muted)]">
                <span className="h-px w-12 bg-[color:var(--section-border)]" />
                <span>02 — What we do</span>
              </div>
              <p className="hidden md:block text-xs uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
                scroll to explore →
              </p>
            </div>
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.03em] mt-4"
          >
            What we do.
          </TextReveal>
        </div>

        {/* Horizontal cards track */}
        <div className="flex-1 overflow-hidden min-h-0">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full gap-4 pl-6 lg:pl-10 pr-24"
          >
            {services.map((s) => (
              <ServiceCard key={s.n} service={s} />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[var(--accent)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const { Art } = service;
  return (
    <Link
      href={service.slug}
      data-cursor="open"
      className="group relative flex flex-col w-[280px] md:w-[340px] lg:w-[360px] h-full flex-shrink-0 rounded-3xl border border-[color:var(--section-border)] bg-[color:var(--section-surface)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/[0.03] transition-colors duration-500 pointer-events-none" />

      {/* Illustration */}
      <div className="relative shrink-0 h-[44%] bg-[color:var(--section-surface)] border-b border-[color:var(--section-border)] overflow-hidden">
        <Art />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <div className="flex items-start justify-between mb-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--section-muted)]">
            {service.n}
          </span>
          <div className="h-8 w-8 rounded-full border border-[color:var(--section-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white transition-colors duration-300">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-2xl md:text-[1.6rem] font-bold leading-tight tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-500">
            {service.title}
          </h3>
          <p className="text-xs md:text-sm text-[color:var(--section-muted)] leading-relaxed mb-4">
            {service.blurb}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[color:var(--section-border)] text-[color:var(--section-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── SVG INFOGRAPHICS ─────────────────────────────────── */

function ArtWebsite() {
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Browser frame */}
      <rect x="28" y="20" width="304" height="168" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.18" />
      <rect x="28" y="20" width="304" height="30" rx="8" fill="currentColor" opacity="0.06" />
      <line x1="28" y1="50" x2="332" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      {/* Traffic lights */}
      <circle cx="45" cy="35" r="4.5" fill="#e0142c" opacity="0.85" />
      <circle cx="58" cy="35" r="4.5" fill="currentColor" opacity="0.18" />
      <circle cx="71" cy="35" r="4.5" fill="currentColor" opacity="0.18" />
      {/* URL bar */}
      <rect x="95" y="27" width="150" height="16" rx="4" fill="currentColor" opacity="0.07" />
      <circle cx="105" cy="35" r="3" fill="currentColor" opacity="0.12" />
      <rect x="112" y="32" width="70" height="6" rx="2" fill="currentColor" opacity="0.12" />
      {/* Hero image block */}
      <rect x="40" y="62" width="180" height="80" rx="5" fill="#e0142c" opacity="0.08" />
      <rect x="40" y="62" width="180" height="80" rx="5" stroke="#e0142c" strokeWidth="1" opacity="0.25" />
      {/* Hero text lines inside */}
      <rect x="54" y="80" width="90" height="8" rx="2" fill="#e0142c" opacity="0.3" />
      <rect x="54" y="94" width="110" height="5" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="54" y="104" width="95" height="5" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="54" y="118" width="56" height="14" rx="7" fill="#e0142c" opacity="0.6" />
      {/* Right sidebar content */}
      <rect x="234" y="66" width="84" height="72" rx="5" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
      <rect x="242" y="76" width="50" height="5" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="242" y="86" width="60" height="5" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="242" y="96" width="44" height="5" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="242" y="110" width="38" height="10" rx="5" fill="currentColor" opacity="0.1" />
      {/* Bottom cards */}
      <rect x="40" y="154" width="82" height="26" rx="5" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="0.8" />
      <rect x="130" y="154" width="82" height="26" rx="5" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="0.8" />
      <rect x="220" y="154" width="92" height="26" rx="5" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="0.8" />
      <rect x="50" y="162" width="40" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="142" y="162" width="40" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="232" y="162" width="40" height="4" rx="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function ArtApps() {
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* App window */}
      <rect x="20" y="14" width="220" height="172" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.18" />
      <rect x="20" y="14" width="220" height="26" rx="8" fill="currentColor" opacity="0.06" />
      <line x1="20" y1="40" x2="240" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      {/* Sidebar */}
      <rect x="20" y="40" width="52" height="146" fill="currentColor" opacity="0.04" />
      <line x1="72" y1="40" x2="72" y2="186" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      {/* Sidebar icons */}
      {[56, 76, 96, 116].map((y, i) => (
        <rect key={i} x="30" y={y} width="32" height="10" rx="5" fill={i === 0 ? "#e0142c" : "currentColor"} opacity={i === 0 ? 0.7 : 0.12} />
      ))}
      {/* Main content area */}
      {/* Metric cards */}
      <rect x="82" y="50" width="68" height="42" rx="5" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="0.8" />
      <rect x="160" y="50" width="68" height="42" rx="5" fill="#e0142c" opacity="0.08" stroke="#e0142c" strokeWidth="0.8" />
      <rect x="90" y="58" width="30" height="5" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="90" y="68" width="48" height="12" rx="2" fill="currentColor" opacity="0.2" />
      <rect x="168" y="58" width="30" height="5" rx="2" fill="#e0142c" opacity="0.3" />
      <rect x="168" y="68" width="48" height="12" rx="2" fill="#e0142c" opacity="0.5" />
      {/* Line chart */}
      <rect x="82" y="102" width="146" height="72" rx="5" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="0.8" />
      <polyline points="96,160 116,148 136,152 156,138 176,142 196,126 216,118" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" strokeLinejoin="round" />
      <polyline points="96,160 116,148 136,152 156,138 176,142 196,126 216,118" fill="none" stroke="#e0142c" strokeWidth="2" opacity="0.7" strokeLinejoin="round" />
      <circle cx="216" cy="118" r="4" fill="#e0142c" opacity="0.9" />
      {/* Floating panel */}
      <rect x="250" y="30" width="90" height="140" rx="8" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" />
      <rect x="260" y="44" width="50" height="5" rx="2" fill="currentColor" opacity="0.15" />
      {[60, 74, 88, 102, 116].map((y, i) => (
        <rect key={i} x="260" y={y} width={[62, 48, 56, 44, 52][i]} height="8" rx="3" fill={i === 2 ? "#e0142c" : "currentColor"} opacity={i === 2 ? 0.25 : 0.09} />
      ))}
      <rect x="260" y="144" width="62" height="14" rx="7" fill="#e0142c" opacity="0.55" />
    </svg>
  );
}

function ArtAgents() {
  const nodes = [
    { cx: 180, cy: 100, r: 14, accent: true },  // central agent
    { cx: 76,  cy: 58,  r: 9,  accent: false },
    { cx: 284, cy: 58,  r: 9,  accent: false },
    { cx: 52,  cy: 142, r: 9,  accent: false },
    { cx: 308, cy: 142, r: 9,  accent: false },
    { cx: 180, cy: 172, r: 9,  accent: false },
    { cx: 128, cy: 38,  r: 6,  accent: false },
    { cx: 232, cy: 162, r: 6,  accent: false },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[4,7],
  ];
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Subtle grid */}
      {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.05" />)}
      {[60,120,180,240,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />)}
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="currentColor" strokeWidth="1" opacity="0.18"
          strokeDasharray="4 3"
        />
      ))}
      {/* Accent orbit ring around central node */}
      <circle cx="180" cy="100" r="30" fill="none" stroke="#e0142c" strokeWidth="1" opacity="0.15" strokeDasharray="3 4" />
      <circle cx="180" cy="100" r="46" fill="none" stroke="#e0142c" strokeWidth="0.6" opacity="0.08" />
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 4} fill={n.accent ? "#e0142c" : "currentColor"} opacity={n.accent ? 0.08 : 0.05} />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.accent ? "#e0142c" : "currentColor"} opacity={n.accent ? 0.85 : 0.14} />
          {n.accent && <circle cx={n.cx} cy={n.cy} r={n.r - 4} fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />}
        </g>
      ))}
      {/* Labels */}
      <text x="170" y="104" fontSize="8" fill="white" opacity="0.9" fontFamily="monospace" fontWeight="bold">AI</text>
      {/* Data packets on edges (small circles) */}
      <circle cx="128" cy="79" r="3" fill="#e0142c" opacity="0.7" />
      <circle cx="232" cy="79" r="3" fill="#e0142c" opacity="0.5" />
      <circle cx="116" cy="121" r="3" fill="#e0142c" opacity="0.4" />
    </svg>
  );
}

function ArtSEO() {
  const bars = [38, 52, 44, 62, 70, 82, 96, 110];
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Grid lines */}
      {[50, 80, 110, 140].map(y => (
        <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="currentColor" strokeWidth="0.6" opacity="0.1" strokeDasharray="3 3" />
      ))}
      {/* Bars */}
      {bars.map((h, i) => {
        const x = 48 + i * 28;
        const isLast = i === bars.length - 1;
        const isTop3 = i >= bars.length - 3;
        return (
          <g key={i}>
            <rect x={x} y={160 - h} width="18" height={h} rx="3"
              fill={isLast ? "#e0142c" : "currentColor"}
              opacity={isLast ? 0.85 : isTop3 ? 0.2 : 0.1}
            />
            {isLast && <rect x={x} y={160 - h} width="18" height="4" rx="2" fill="#e0142c" opacity="0.4" />}
          </g>
        );
      })}
      {/* Trend line */}
      <polyline
        points={bars.map((h, i) => `${57 + i * 28},${160 - h}`).join(" ")}
        fill="none" stroke="#e0142c" strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" strokeDasharray="5 3"
      />
      {/* Magnifying glass */}
      <circle cx="306" cy="72" r="32" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <circle cx="306" cy="66" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="306" cy="66" r="22" fill="none" stroke="#e0142c" strokeWidth="1.5" opacity="0.35" />
      <line x1="321" y1="82" x2="334" y2="96" stroke="#e0142c" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      {/* #1 inside glass */}
      <text x="300" y="71" fontSize="12" fill="#e0142c" opacity="0.8" fontFamily="monospace" fontWeight="bold">#1</text>
      {/* Globe lines to suggest geo */}
      <ellipse cx="306" cy="66" rx="22" ry="10" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.12" />
      <line x1="284" y1="66" x2="328" y2="66" stroke="currentColor" strokeWidth="0.7" opacity="0.12" />
      {/* X-axis */}
      <line x1="40" y1="160" x2="280" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      {/* Up arrow at chart end */}
      <path d="M272 130 L276 120 L280 130" fill="none" stroke="#e0142c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function ArtSocial() {
  const platforms = [
    { cx: 88,  cy: 76,  label: "IG", color: "#e0142c" },
    { cx: 180, cy: 58,  label: "LI", color: "currentColor" },
    { cx: 272, cy: 76,  label: "YT", color: "currentColor" },
    { cx: 134, cy: 138, label: "TW", color: "currentColor" },
    { cx: 226, cy: 138, label: "FB", color: "currentColor" },
  ];
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Connections */}
      {[[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,4]].map(([a,b], i) => (
        <line key={i}
          x1={platforms[a].cx} y1={platforms[a].cy}
          x2={platforms[b].cx} y2={platforms[b].cy}
          stroke="currentColor" strokeWidth="1" opacity="0.12"
        />
      ))}
      {/* Engagement rings */}
      {platforms.map((p, i) => (
        <circle key={`ring-${i}`} cx={p.cx} cy={p.cy} r="30" fill="none"
          stroke={p.color === "#e0142c" ? "#e0142c" : "currentColor"}
          strokeWidth="0.5" opacity={p.color === "#e0142c" ? 0.18 : 0.06}
          strokeDasharray="2 4"
        />
      ))}
      {/* Platform nodes */}
      {platforms.map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="22"
            fill={p.color === "#e0142c" ? "#e0142c" : "currentColor"}
            opacity={p.color === "#e0142c" ? 0.12 : 0.07}
          />
          <circle cx={p.cx} cy={p.cy} r="18"
            fill={p.color === "#e0142c" ? "#e0142c" : "currentColor"}
            opacity={p.color === "#e0142c" ? 0.7 : 0.12}
            stroke={p.color === "#e0142c" ? "none" : "currentColor"}
            strokeWidth="1"
          />
          <text x={p.cx - 7} y={p.cy + 4} fontSize="9" fill={p.color === "#e0142c" ? "white" : "currentColor"} opacity="0.7" fontFamily="monospace" fontWeight="bold">{p.label}</text>
        </g>
      ))}
      {/* Floating metric pills */}
      <rect x="46" y="108" width="44" height="16" rx="8" fill="#e0142c" opacity="0.12" />
      <rect x="46" y="108" width="44" height="16" rx="8" stroke="#e0142c" strokeWidth="0.8" opacity="0.3" fill="none" />
      <text x="55" y="120" fontSize="8" fill="#e0142c" opacity="0.8" fontFamily="monospace">+4.2k</text>
      <rect x="270" y="108" width="48" height="16" rx="8" fill="currentColor" opacity="0.06" />
      <text x="279" y="120" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="monospace">12.8k</text>
      <rect x="152" y="168" width="56" height="16" rx="8" fill="currentColor" opacity="0.06" />
      <text x="161" y="180" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="monospace">98.4k</text>
    </svg>
  );
}

function ArtAds() {
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Funnel */}
      <path d="M80 30 L280 30 L230 90 L130 90 Z" fill="#e0142c" opacity="0.08" stroke="#e0142c" strokeWidth="1" />
      <path d="M130 94 L230 94 L210 138 L150 138 Z" fill="#e0142c" opacity="0.14" stroke="#e0142c" strokeWidth="1" />
      <path d="M150 142 L210 142 L200 174 L160 174 Z" fill="#e0142c" opacity="0.55" stroke="#e0142c" strokeWidth="1" />
      {/* Funnel labels */}
      <text x="164" y="65" fontSize="9" fill="currentColor" opacity="0.4" fontFamily="monospace">IMPRESSIONS</text>
      <text x="158" y="120" fontSize="9" fill="currentColor" opacity="0.4" fontFamily="monospace">CLICKS</text>
      <text x="158" y="162" fontSize="9" fill="white" opacity="0.8" fontFamily="monospace">SALES</text>
      {/* Right side ROAS metric */}
      <rect x="296" y="38" width="50" height="60" rx="6" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
      <text x="303" y="56" fontSize="7" fill="currentColor" opacity="0.3" fontFamily="monospace">ROAS</text>
      <text x="298" y="76" fontSize="16" fill="#e0142c" opacity="0.85" fontFamily="monospace" fontWeight="bold">4.8x</text>
      <text x="300" y="90" fontSize="7" fill="#e0142c" opacity="0.4" fontFamily="monospace">↑ 24%</text>
      {/* Left CTR */}
      <rect x="14" y="38" width="50" height="60" rx="6" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
      <text x="22" y="56" fontSize="7" fill="currentColor" opacity="0.3" fontFamily="monospace">CTR</text>
      <text x="18" y="76" fontSize="16" fill="currentColor" opacity="0.45" fontFamily="monospace" fontWeight="bold">3.2%</text>
      <text x="20" y="90" fontSize="7" fill="currentColor" opacity="0.3" fontFamily="monospace">↑ 0.8</text>
    </svg>
  );
}

function ArtWorkflow() {
  const nodes = [
    { x: 38,  y: 90,  w: 56, h: 28, accent: true,  label: "Trigger" },
    { x: 134, y: 68,  w: 56, h: 28, accent: false, label: "Filter" },
    { x: 134, y: 112, w: 56, h: 28, accent: false, label: "Enrich" },
    { x: 232, y: 68,  w: 56, h: 28, accent: false, label: "Notify" },
    { x: 232, y: 112, w: 56, h: 28, accent: false, label: "Log" },
    { x: 300, y: 90,  w: 42, h: 28, accent: true,  label: "Done" },
  ];
  const edges: [number, number][] = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]];
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Background dots */}
      {Array.from({length: 8}).map((_,r) => Array.from({length:14}).map((_,c) => (
        <circle key={`${r}-${c}`} cx={16+c*24} cy={16+r*24} r="1" fill="currentColor" opacity="0.06" />
      )))}
      {/* Edges */}
      {edges.map(([a,b], i) => {
        const na = nodes[a]; const nb = nodes[b];
        const x1 = na.x + na.w; const y1 = na.y + na.h/2;
        const x2 = nb.x;       const y2 = nb.y + nb.h/2;
        const mx = (x1+x2)/2;
        return (
          <path key={i} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
            fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" strokeLinecap="round"
          />
        );
      })}
      {/* Arrow heads */}
      {edges.map(([,b], i) => {
        const nb = nodes[b];
        const x = nb.x; const y = nb.y + nb.h/2;
        return <path key={`a${i}`} d={`M${x-7},${y-4} L${x},${y} L${x-7},${y+4}`}
          fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6"
            fill={n.accent ? "#e0142c" : "currentColor"}
            opacity={n.accent ? 0.85 : 0.08}
            stroke={n.accent ? "#e0142c" : "currentColor"}
            strokeWidth={n.accent ? "0" : "0.8"}
            strokeOpacity="0.2"
          />
          <text x={n.x + n.w/2 - n.label.length*2.6} y={n.y + n.h/2 + 3.5}
            fontSize="8.5" fontFamily="monospace"
            fill={n.accent ? "white" : "currentColor"}
            opacity={n.accent ? 0.95 : 0.45}
          >{n.label}</text>
        </g>
      ))}
      {/* n8n watermark */}
      <text x="28" y="170" fontSize="9" fill="currentColor" opacity="0.1" fontFamily="monospace">n8n · make.com · zapier</text>
    </svg>
  );
}

function ArtAI() {
  const layers = [
    { y: 26,  nodes: 3, label: "Input" },
    { y: 72,  nodes: 5, label: "Embed" },
    { y: 118, nodes: 5, label: "Retrieval" },
    { y: 164, nodes: 3, label: "Output" },
  ];
  return (
    <svg viewBox="0 0 360 200" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Layer connections */}
      {layers.slice(0,-1).map((layer, li) => {
        const next = layers[li+1];
        const spacing = (n: number) => Array.from({length:n}).map((_,i) => 60 + i * (240/(n-1||1)));
        return spacing(layer.nodes).flatMap((x1, ni) =>
          spacing(next.nodes).map((x2, nj) => (
            <line key={`${li}-${ni}-${nj}`}
              x1={x1} y1={layer.y + 8} x2={x2} y2={next.y - 8}
              stroke="currentColor" strokeWidth="0.5" opacity="0.08"
            />
          ))
        );
      })}
      {/* Highlighted path (inference) */}
      {[
        [180, 26+8, 180, 72-8],
        [180, 72+8, 180, 118-8],
        [180, 118+8, 180, 164-8],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={`h${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#e0142c" strokeWidth="1.5" opacity="0.5"
        />
      ))}
      {/* Nodes */}
      {layers.map((layer) => {
        const spacing = Array.from({length:layer.nodes}).map((_,i) => 60 + i*(240/(layer.nodes-1||1)));
        return spacing.map((cx, ni) => {
          const isCentral = Math.abs(cx - 180) < 10;
          return (
            <g key={`${layer.y}-${ni}`}>
              <circle cx={cx} cy={layer.y} r={isCentral ? 11 : 8}
                fill={isCentral ? "#e0142c" : "currentColor"}
                opacity={isCentral ? 0.8 : 0.12}
              />
              {isCentral && <circle cx={cx} cy={layer.y} r={5} fill="white" opacity="0.4" />}
            </g>
          );
        });
      })}
      {/* Layer labels */}
      {layers.map((l, i) => (
        <text key={i} x="14" y={l.y + 4} fontSize="7.5" fill="currentColor" opacity="0.25" fontFamily="monospace">{l.label}</text>
      ))}
      {/* RAG badge */}
      <rect x="270" y="78" width="72" height="44" rx="6" fill="#e0142c" opacity="0.08" stroke="#e0142c" strokeWidth="0.8" />
      <text x="278" y="96" fontSize="7" fill="#e0142c" opacity="0.5" fontFamily="monospace">RAG Pipeline</text>
      <rect x="278" y="102" width="48" height="5" rx="2" fill="#e0142c" opacity="0.2" />
      <rect x="278" y="110" width="36" height="5" rx="2" fill="#e0142c" opacity="0.12" />
    </svg>
  );
}
