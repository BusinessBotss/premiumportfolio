import type { MetadataRoute } from "next";
import { indexableProjects } from "@/data/projects";
import { IS_PREVIEW, SITE_URL } from "@/data/site";
import { locales } from "@/i18n/config";
import { withLocale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];

  const lastModified = new Date();

  const basePaths = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/archive", changeFrequency: "monthly", priority: 0.4 },
  ] as const;

  const routes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    basePaths.map((route) => ({
      url: `${SITE_URL}${withLocale(locale, route.path)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  /** Only indexable work. Drafts and projects under review never appear here. */
  const caseStudies: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    indexableProjects.map((p) => ({
      url: `${SITE_URL}${withLocale(locale, `/work/${p.slug}`)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: p.tier === "featured" ? 0.8 : 0.6,
    })),
  );

  return [...routes, ...caseStudies];
}
