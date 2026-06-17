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

const SITE_URL = "https://promogranade.com";
const SITE_NAME = "Promogranade";
const SITE_TITLE = "Promogranade — Solutions that scale businesses";
const SITE_DESCRIPTION =
  "We build web applications, ship AI automations, and run growth engines for ambitious teams. One studio for the entire stack — web development, custom apps, AI agents, SEO/GEO/AEO, social media, and paid ads.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "web development agency", "AI agent development", "custom software development",
    "SEO GEO AEO services", "Meta ads agency", "Google ads agency",
    "workflow automation", "AI systems development", "Promogranade",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "Web applications, AI automations, SEO and marketing. One senior team, end to end.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Promogranade — Solutions that scale businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  description: SITE_DESCRIPTION,
  email: "hello@promogranade.com",
  sameAs: [
    "https://www.instagram.com/promogranade",
    "https://linkedin.com/in/abhinandanjain-dubai/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
