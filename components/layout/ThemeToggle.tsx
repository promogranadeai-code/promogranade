"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ forceWhite = false }: { forceWhite?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      data-cursor="flip"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-10 w-10 rounded-full border flex items-center justify-center overflow-hidden group transition-all duration-500 backdrop-blur-md hover:border-[var(--accent)] ${
        forceWhite
          ? "border-white/30 bg-white/10 text-white"
          : "border-foreground/20 bg-foreground/[0.06] text-foreground"
      }`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ease-out ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ease-out ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
