import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
