import type { MetadataRoute } from "next";
import { indexableProjects } from "@/data/projects";
import { IS_PREVIEW, SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];

  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/archive`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];

  /** Only indexable work. Drafts and projects under review never appear here. */
  const caseStudies: MetadataRoute.Sitemap = indexableProjects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p.tier === "featured" ? 0.8 : 0.6,
  }));

  return [...routes, ...caseStudies];
}
