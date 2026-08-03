/**
 * Per-route metadata.
 *
 * Every route builds its own title, description, canonical URL and OG image
 * through `buildMetadata`. Nothing ships with placeholder metadata: if a page
 * has no real description, it does not get published.
 */

import type { Metadata } from "next";
import { IS_PREVIEW, SITE_URL, site } from "@/data/site";
import { locales, ogLocales, type Locale } from "@/i18n/config";
import { withLocale } from "@/i18n/routing";
import { cld } from "@/lib/cloudinary";

interface BuildMetadataArgs {
  /** Final page title. Omit on the home page. */
  title?: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/work/hybryd-mallorca". */
  path: string;
  locale?: Locale;
  /** Full Cloudinary URL. Falls back to the personal-brand portrait. */
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
  locale = "en",
  image,
  imageFit = "cover",
  imageBackground,
  type = "website",
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const fullTitle =
    title ?? `${site.firstName} — Digital Systems, Creative Direction & Hospitality Intelligence`;
  const localizedPath = withLocale(locale, path);
  const url = `${SITE_URL}${localizedPath}`;
  const shouldNoindex = IS_PREVIEW || noindex;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}${withLocale(l, path)}`]),
  );

  const ogImage = cld(image ?? site.media.portrait, {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    crop: imageFit === "contain" ? "pad" : "fill",
    background: imageBackground ?? (imageFit === "contain" ? "f4f2ec" : undefined),
    gravity: imageFit === "cover" ? "auto" : undefined,
  });

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}${withLocale("en", path)}`,
      },
    },
    ...(shouldNoindex && { robots: { index: false, follow: false } }),
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
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
export function personSchema(locale: Locale = "en", sameAs: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${SITE_URL}${withLocale(locale)}`,
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
  locale?: Locale;
  /** Omitted entirely when unverified — an absent field beats a wrong date. */
  year?: string;
  client?: string;
}) {
  const locale = input.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.summary,
    url: `${SITE_URL}${withLocale(locale, `/work/${input.slug}`)}`,
    ...(input.year && { dateCreated: input.year }),
    creator: { "@type": "Person", name: site.name, url: `${SITE_URL}${withLocale(locale)}` },
    ...(input.client && { about: input.client }),
  };
}
