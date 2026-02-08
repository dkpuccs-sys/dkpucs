import { MetadataRoute } from "next";
import { getAllBlogs, getAllLabManuals } from "@/lib/data";

/**
 * Generate the site's sitemap entries.
 *
 * Produces an array that combines static routes with dynamically generated entries
 * for all blogs and lab manuals; each entry includes `url`, `lastModified`,
 * `changeFrequency`, and `priority`.
 *
 * @returns An array of sitemap entries for the site combining static routes, blog pages, and lab manual pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dkpucs.vercel.app";

  let blogs: any[] = [];
  let labManuals: any[] = [];

  try {
    blogs = await getAllBlogs();
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  try {
    labManuals = await getAllLabManuals();
  } catch (error) {
    console.error("Error fetching lab manuals for sitemap:", error);
  }

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: blog.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const labManualUrls = labManuals.map((manual: any) => ({
    url: `${baseUrl}/lab-manuals/${manual.id}`,
    lastModified: manual.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/announcements`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lab-manuals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/qps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/syllabus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/textbooks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/runner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...blogUrls, ...labManualUrls];
}
