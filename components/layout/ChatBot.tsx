"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────── */

type Msg = { role: "user" | "assistant"; content: string };

/* ─── Message renderer — handles \n and [text](url) links ── */

function MessageContent({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-0.5" />;

        // Full-line link: [label](url) — render as a CTA chip
        const fullLink = line.match(/^\[(.+)\]\((.+)\)$/);
        if (fullLink) {
          return (
            <Link
              key={i}
              href={fullLink[2]}
              onClick={onNavigate}
              className="group flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "rgba(224,20,44,0.14)", color: "#e0142c" }}
            >
              <span>{fullLink[1]}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </Link>
          );
        }

        // Inline links within a line — render as underlined accent text
        const inlineLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts: React.ReactNode[] = [];
        let last = 0;
        let m: RegExpExecArray | null;
        while ((m = inlineLinkRegex.exec(line)) !== null) {
          if (m.index > last) parts.push(line.slice(last, m.index));
          parts.push(
            <Link key={m.index} href={m[2]} onClick={onNavigate}
              className="underline underline-offset-2 hover:no-underline"
              style={{ color: "#e0142c" }}>
              {m[1]}
            </Link>
          );
          last = m.index + m[0].length;
        }
        if (last < line.length) parts.push(line.slice(last));

        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.length ? parts : line}
          </p>
        );
      })}
    </div>
  );
}

/* ─── Quick-start suggestions ───────────────────────────── */

const SUGGESTIONS = [
  "What services do you offer?",
  "How do I start a project?",
  "What is Promogranade?",
  "How can I contact you?",
];

/* ─── Greeting ──────────────────────────────────────────── */

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm Promo, Promogranade's AI assistant. Ask me anything about our services, team, or how to kick off a project.",
};

/* ─── Component ─────────────────────────────────────────── */

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nudge, setNudge] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to newest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
    if (open) setNudge(false);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter((m) => m !== GREETING)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong on my end. Reach us at hello@promogranade.com or WhatsApp +91 95117 84952.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isInitial = messages.length === 1;

  return (
    <>
      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes cb-bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-5px); }
        }
        @keyframes cb-ping {
          75%,100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════ */}
      {/*  CHAT PANEL                                        */}
      {/* ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[9989] flex flex-col w-[calc(100vw-2rem)] sm:w-[380px] max-h-[560px] rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 24px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(128,128,128,0.12)",
              background: "var(--background)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: "var(--accent)" }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2"
                    style={{ borderColor: "var(--accent)" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">Promo</p>
                  <p className="text-[10px] text-white/65 tracking-wide">
                    Promogranade · Always online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 ${
                      m.role === "user" ? "text-white rounded-br-sm text-sm leading-relaxed" : "rounded-bl-sm"
                    }`}
                    style={
                      m.role === "user"
                        ? { background: "var(--accent)" }
                        : { background: "var(--foreground)", color: "var(--background)", opacity: 0.9 }
                    }
                  >
                    {m.role === "assistant" ? (
                      <MessageContent text={m.content} onNavigate={() => setOpen(false)} />
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-3"
                    style={{
                      background: "var(--foreground)",
                      opacity: 0.9,
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: "var(--background)",
                            animation: `cb-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions — only on first open */}
            <AnimatePresence>
              {isInitial && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3 flex flex-wrap gap-2 shrink-0"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--accent)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--border)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--muted-foreground)";
                      }}
                    >
                      {s}
                      <ArrowUpRight className="h-3 w-3 shrink-0" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div
              className="px-4 py-3 flex gap-2 shrink-0 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none border transition-colors"
                style={{
                  background: "var(--muted)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLElement).style.borderColor = "var(--accent)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLElement).style.borderColor = "var(--border)")
                }
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-35 hover:opacity-85"
                style={{ background: "var(--accent)" }}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════ */}
      {/*  FLOATING BUTTON                                   */}
      {/* ══════════════════════════════════════════════════ */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-4 sm:right-6 z-[9990] h-14 w-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "var(--accent)" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {/* Nudge ping — shown until first open */}
        {nudge && !open && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "var(--accent)",
              animation: "cb-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

export default ChatBot;
