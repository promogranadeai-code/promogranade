"use client";

const ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "AI Agents", "LangGraph",
  "Claude API", "RAG Pipelines", "Fine-tuning", "n8n", "Make.com",
  "WordPress", "Shopify", "SEO", "GEO", "AEO", "Meta Ads", "Google Ads",
  "Social Media",
];

export function MarqueeTicker() {
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--section-border)] py-[18px] section-a">
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: ticker 55s linear infinite; }
      `}</style>
      <div className="ticker-track flex w-max">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="shrink-0 px-6 text-[10px] uppercase tracking-[0.38em] text-[color:var(--section-muted)]"
          >
            {item}
            <span className="mx-4 opacity-60 text-[var(--accent)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeTicker;
