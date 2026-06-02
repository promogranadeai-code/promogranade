"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    const ringPos = { x: pos.x, y: pos.y };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (el) {
        setHover(true);
        const text = el.getAttribute("data-cursor");
        setLabel(text || null);
      } else {
        setHover(false);
        setLabel(null);
      }
    };

    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.65;
      pos.y += (target.y - pos.y) * 0.65;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Lagging ring — expands and fills grey on hover */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out ${
          hover
            ? "w-20 h-20 bg-black/[0.07] dark:bg-white/[0.15] border border-black/10 dark:border-white/25"
            : "w-9 h-9 border-2 border-black/40 dark:border-white bg-transparent"
        }`}
        style={{ willChange: "transform" }}
      >
        {label && hover && (
          <span className="text-[10px] font-medium uppercase tracking-widest text-black dark:text-white">
            {label}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block rounded-full bg-black dark:bg-white transition-[width,height,opacity] duration-200 ${
          hover ? "w-0 h-0 opacity-0" : "w-2 h-2 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
