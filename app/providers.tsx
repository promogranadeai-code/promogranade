"use client";

import { ThemeProvider } from "next-themes";
import { LayoutGroup } from "framer-motion";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Lets components/intro/PromoGrenadeIntro.tsx and the navbar logo
          (both layoutId="promogranade-logo") share a layout animation. */}
      <LayoutGroup>{children}</LayoutGroup>
    </ThemeProvider>
  );
}
