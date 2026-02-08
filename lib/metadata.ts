import { Metadata } from "next";

const SITE_URL = "https://dkpucs.vercel.app";
const SITE_NAME = "DKPUCS";
const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;

interface MetadataParams {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
}

/**
 * Builds a Metadata object containing SEO, Open Graph, Twitter, robots, alternates, and application metadata for a page.
 *
 * @param keywords - Additional keywords to include; omitted if the array is empty
 * @param path - Path relative to the site base URL used to construct the canonical URL
 * @param image - URL for the Open Graph / Twitter image
 * @param type - Open Graph content type (for example, "website" or "article")
 * @param publishedTime - ISO 8601 publication timestamp; included in Open Graph when `type` is "article"
 * @param modifiedTime - ISO 8601 modification timestamp; included in Open Graph when `type` is "article"
 * @param authors - List of author names; converted to author objects when provided
 * @param section - Article section or category; included in Open Graph when `type` is "article"
 * @param noIndex - When true, configures robots to prevent indexing and following
 * @returns A Metadata object populated with title, description, optional keywords and authors, creator and publisher, robots configuration, Open Graph and Twitter data, canonical alternate, and additional application metadata
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  noIndex = false,
}: MetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: authors ? authors.map((name) => ({ name })) : undefined,
    creator: SITE_NAME,
    publisher: SITE_NAME,

    // Robots and indexing
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    // Open Graph
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
      locale: "en_US",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        section,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@dkpucs",
      site: "@dkpucs",
    },

    // Alternative languages
    alternates: {
      canonical: url,
    },

    // Additional metadata
    other: {
      "application-name": SITE_NAME,
    },
  };

  return metadata;
}

/**
 * Generate metadata for a blog post including SEO, Open Graph, Twitter, and article-specific fields.
 *
 * @param title - The blog post title
 * @param content - Full post content used to derive the meta description (trimmed to 160 characters)
 * @param author - The post author's display name (defaults to "DKPUCS Team")
 * @param level - Topic/section or difficulty level used as the article section and a keyword
 * @param createdAt - Publication date used as the article's publishedTime
 * @param updatedAt - Optional last-modified date used as the article's modifiedTime
 * @param id - Identifier used to construct the canonical path for the post (`/blogs/{id}`)
 * @returns Metadata object containing description, keywords, canonical URL, article fields (publishedTime, modifiedTime, authors, section), and social/Open Graph data
 */
export function generateBlogMetadata({
  title,
  content,
  author = "DKPUCS Team",
  level,
  createdAt,
  updatedAt,
  id,
}: {
  title: string;
  content: string;
  author?: string;
  level?: string;
  createdAt: Date;
  updatedAt?: Date;
  id: string;
}): Metadata {
  const description =
    content.length > 160 ? content.substring(0, 157) + "..." : content;
  const keywords = [
    "DKPUCS",
    "blog",
    "programming",
    "coding",
    "tutorial",
    author,
    level,
  ].filter(Boolean) as string[];

  return generateMetadata({
    title,
    description,
    keywords,
    path: `/blogs/${id}`,
    type: "article",
    publishedTime: createdAt.toISOString(),
    modifiedTime: updatedAt?.toISOString(),
    authors: [author],
    section: level || "Technology",
  });
}

/**
 * Generate metadata for lab manuals
 */
export function generateLabManualMetadata({
  title,
  description,
  language,
  difficulty,
  level,
  id,
}: {
  title: string;
  description: string;
  language?: string;
  difficulty?: string;
  level?: string;
  id: string;
}): Metadata {
  const keywords = [
    "DKPUCS",
    "lab manual",
    "programming exercises",
    "coding practice",
    language,
    difficulty,
    level,
  ].filter(Boolean) as string[];

  return generateMetadata({
    title,
    description,
    keywords,
    path: `/lab-manuals/${id}`,
    type: "article",
    section: `${language} Programming`,
  });
}

/**
 * Generate metadata for question papers
 */
export function generateQPMetadata({
  subject,
  semester,
  year,
  university,
}: {
  subject: string;
  semester: string;
  year: string;
  university?: string;
}): Metadata {
  const title = `${subject} - ${semester} (${year})`;
  const description = `Previous year question paper for ${subject}, ${semester}, ${year}${university ? ` - ${university}` : ""}. Download and practice for your exams.`;
  const keywords = [
    "DKPUCS",
    "question papers",
    "previous year papers",
    "exam papers",
    subject,
    semester,
    year,
    university,
  ].filter(Boolean) as string[];

  return generateMetadata({
    title,
    description,
    keywords,
    path: "/qps",
  });
}
