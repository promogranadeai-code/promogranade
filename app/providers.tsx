"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { GestureControlProvider } from "@/lib/gesture-control-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <GestureControlProvider>{children}</GestureControlProvider>
    </ThemeProvider>
  );
}
