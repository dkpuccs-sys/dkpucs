import { MetadataRoute } from "next";

/**
 * Provides the site's robots configuration for Next.js metadata routing.
 *
 * @returns The `MetadataRoute.Robots` object with rules that allow all user agents to access the site root while disallowing `/admin/` and `/api/`, and a `sitemap` URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://dkpucs.vercel.app/sitemap.xml",
  };
}
