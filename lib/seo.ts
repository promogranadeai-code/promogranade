import type { Metadata } from "next";

export const SITE_URL = "https://promogranade.com";
export const SITE_NAME = "Promogranade";

/** Shared social image. A page-level `openGraph` replaces the layout's
 *  entirely (Next.js merges metadata shallowly), so every page must repeat it. */
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Promogranade — Solutions that scale businesses",
};

interface PageMetaInput {
  /** Page title without the brand; the root layout appends " — Promogranade". Keep ≤ 45 chars. */
  title: string;
  /** Search snippet, 70–160 chars. */
  description: string;
  /** Route path, e.g. "/about". */
  path: string;
  /** Optional shorter/punchier copy for social shares. */
  socialDescription?: string;
  type?: "website" | "article";
  extra?: Omit<Metadata, "title" | "description" | "alternates" | "openGraph" | "twitter">;
  openGraphExtra?: Record<string, unknown>;
}

export function pageMetadata({ title, description, path, socialDescription, type = "website", extra, openGraphExtra }: PageMetaInput): Metadata {
  const socialTitle = `${title} — ${SITE_NAME}`;
  const social = socialDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: social,
      type,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [OG_IMAGE],
      ...openGraphExtra,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: social,
      images: [OG_IMAGE.url],
    },
    ...extra,
  };
}
