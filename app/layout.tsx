import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteLiquid } from "@/components/layout/SiteLiquid";
import { IntroAnimation } from "@/components/layout/IntroAnimation";
import { Cursor } from "@/components/layout/Cursor";
import { ChatBot } from "@/components/layout/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${display.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Cursor />
          <ChatBot />
          <IntroAnimation />
          <SmoothScroll>
            <SiteLiquid />
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
