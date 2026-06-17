import type { MetadataRoute } from "next";

// AI crawlers explicitly allowed so the site can be cited by ChatGPT,
// Claude, Perplexity, and Google's generative surfaces (GEO/AEO).
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "CCBot",
  "Applebot-Extended",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: "https://promogranade.com/sitemap.xml",
    host: "https://promogranade.com",
  };
}
