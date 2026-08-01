/**
 * Per-route metadata.
 *
 * Every route builds its own title, description, canonical URL and OG image
 * through `buildMetadata`. Nothing ships with placeholder metadata: if a page
 * has no real description, it does not get published.
 */

import type { Metadata } from "next";
import { IS_PREVIEW, SITE_URL, site } from "@/data/site";
import { cld } from "@/lib/cloudinary";

interface BuildMetadataArgs {
  /** Final page title. Omit on the home page. */
  title?: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/work/hybryd-mallorca". */
  path: string;
  /** Full Cloudinary URL. Falls back to the site OG image. */
  image?: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  type?: "website" | "article";
  /**
   * Keeps the page out of search results. The single place the robots rule is
   * expressed, so no route can half-apply it.
   */
  noindex?: boolean;
}

const OG_SIZE = { width: 1200, height: 630 };

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageFit = "cover",
  imageBackground,
  type = "website",
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const fullTitle =
    title ?? `${site.firstName} — Digital Systems, Creative Direction & Hospitality Intelligence`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const shouldNoindex = IS_PREVIEW || noindex;

  const ogImage = cld(image ?? site.media.ogImage, {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    crop: imageFit === "contain" ? "pad" : "fill",
    background: imageBackground ?? (imageFit === "contain" ? "f4f2ec" : undefined),
    gravity: imageFit === "cover" ? "auto" : undefined,
  });

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    ...(shouldNoindex && { robots: { index: false, follow: false } }),
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: ogImage, ...OG_SIZE, alt: title ?? site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// ── Structured data ───────────────────────────────────────────────────────

/** Person schema for the home and about pages. */
export function personSchema(sameAs: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: SITE_URL,
    jobTitle: site.role,
    description: site.positioning,
    image: site.media.portrait,
    email: `mailto:${site.contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palma de Mallorca",
      addressCountry: "ES",
    },
    worksFor: {
      "@type": "Organization",
      name: site.venture.name,
      url: site.venture.url,
    },
    sameAs: [site.contact.instagram, ...sameAs],
  };
}

/** CreativeWork schema for a case study. */
export function projectSchema(input: {
  title: string;
  summary: string;
  slug: string;
  /** Omitted entirely when unverified — an absent field beats a wrong date. */
  year?: string;
  image: string;
  client?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.summary,
    url: `${SITE_URL}/work/${input.slug}`,
    ...(input.year && { dateCreated: input.year }),
    image: input.image,
    creator: { "@type": "Person", name: site.name, url: SITE_URL },
    ...(input.client && { about: input.client }),
  };
}
