import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Promogranade — Solutions that scale businesses",
    short_name: "Promogranade",
    description:
      "Web applications, AI automations, SEO/GEO/AEO, and growth engines for ambitious teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0909",
    theme_color: "#e0142c",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
