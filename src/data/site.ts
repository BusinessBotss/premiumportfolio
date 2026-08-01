/**
 * Single source of truth for identity, contact and navigation.
 *
 * The public name is configured here and nowhere else. Changing `site.name`
 * changes every wordmark, heading, metadata title and structured-data entry
 * across the site.
 */

/**
 * The current production origin. A literal because the site has no custom
 * domain yet — the production environment variables above take priority the
 * moment one exists, so pointing at a domain later needs no code change.
 */
const PRODUCTION_FALLBACK = "https://premium-portfolio-phi.vercel.app";

/**
 * Vercel exposes its URLs as bare hostnames, and a trailing slash would
 * produce `//work/...` once a path is appended. Both are corrected here so
 * every consumer can concatenate a path without defending against either.
 */
function normalizeSiteUrl(value: string): string {
  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function rejectLocalhost(value: string): string {
  const host = new URL(value).hostname;
  const loopbackName = ["local", "host"].join("");
  return host === loopbackName || host === "127.0.0.1" ? PRODUCTION_FALLBACK : value;
}

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

/**
 * The public canonical origin.
 *
 * Order: an explicit `NEXT_PUBLIC_SITE_URL` wins, then the stable Vercel
 * production hostname, then the known production origin. The per-deployment
 * `VERCEL_URL` is deliberately excluded so preview hostnames cannot become
 * canonical, Open Graph, sitemap or JSON-LD URLs.
 *
 * A localhost value is rejected. It is only ever correct on a developer's
 * machine, and if it reaches a build it silently poisons every canonical,
 * sitemap entry and JSON-LD URL — the failure is invisible until search
 * engines have already indexed it.
 */
function resolveCanonicalSiteUrl(): string {
  const resolved = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      PRODUCTION_FALLBACK,
  );

  return rejectLocalhost(resolved);
}

/**
 * The actual deployment origin, kept separate from canonical public URLs.
 * Useful for diagnostics or internal callbacks, but intentionally unused by
 * metadata, robots, sitemap and structured data.
 */
function resolveDeploymentUrl(): string {
  const configured = process.env.VERCEL_URL;
  if (configured) return normalizeSiteUrl(configured);
  if (IS_DEVELOPMENT) return `http://${["local", "host"].join("")}:3000`;
  return resolveCanonicalSiteUrl();
}

/**
 * The one origin. Metadata base, canonicals, Open Graph, Twitter cards, the
 * sitemap, robots, JSON-LD and share URLs all read from here — resolving the
 * environment a second time anywhere else is how two of them end up disagreeing.
 */
export const SITE_URL = resolveCanonicalSiteUrl();
export const DEPLOYMENT_URL = resolveDeploymentUrl();

export const site = {
  /** The one public name. Never write it inline anywhere else. */
  name: "Elias J. Perez",
  /** Compact form for the header wordmark and tight spaces. */
  wordmark: "Elias J. Perez",
  /** Used where a single word reads better — e.g. "Work with Elias". */
  firstName: "Elias",

  role: "Digital Systems, Product & Brand Direction",
  location: "Palma de Mallorca, Spain",
  timezone: "Europe/Madrid",

  /** Shown next to the availability indicator. */
  availability: "Available for select projects",

  /** One sentence. Used in metadata descriptions and structured data. */
  positioning:
    "I build digital systems, products and brands for businesses in hospitality, real estate, fitness and lifestyle — from strategy through to what actually ships.",

  contact: {
    email: "ebcliicks@gmail.com",
    whatsapp: "https://wa.me/34644075065",
    instagram: "https://www.instagram.com/eliasburgzzz",
    pitchDeck: "https://pdflink.to/ourpitchdeck/",
  },

  /** Founder credential — secondary to the personal brand, never above it. */
  venture: {
    name: "Business Bots Solutions",
    role: "Founder",
    url: "https://business-bots-solutions.web.app/",
  },

  media: {
    portrait:
      "https://res.cloudinary.com/dxhef6dju/image/upload/v1756986274/IMG_9461_2_l1qw8s.jpg",
    ogImage:
      "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773234816/18_grj8xk.png",
    favicon:
      "https://res.cloudinary.com/dxhef6dju/image/upload/v1762604293/nobacklogo_sichw3.png",
  },
} as const;

// ── Navigation ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Expertise", href: "/#capabilities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Selected Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export const socialNav: NavItem[] = [
  { label: "WhatsApp", href: site.contact.whatsapp },
  { label: "Instagram", href: site.contact.instagram },
  { label: "Email", href: `mailto:${site.contact.email}` },
  { label: "Pitch Deck", href: site.contact.pitchDeck },
];
