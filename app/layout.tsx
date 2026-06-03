import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { DeferredShell } from "@/components/layout/DeferredShell";

// ── Fonts: only the two actually used in globals.css ─────────────────────────
// Inter + Geist Mono were loaded before but --font-inter / --font-geist-mono
// are never referenced in the CSS — removing them saves 2 network round-trips.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promogranade — Solutions that scale businesses",
  description:
    "We build web applications, ship AI automations, and run growth engines for ambitious teams. One studio for the entire stack.",
  metadataBase: new URL("https://promogranade.com"),
  openGraph: {
    title: "Promogranade — Solutions that scale businesses",
    description:
      "Web applications, AI automations, SEO and marketing. One senior team, end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${displayFont.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {/* Three.js background, cursor, chatbot, intro — all deferred client-side */}
          <DeferredShell />
          <SmoothScroll>
            <div className="noise-overlay" aria-hidden />
            <Navigation />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
