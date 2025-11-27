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
 * Generate comprehensive SEO metadata for pages
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
    authors: authors ? authors.map(name => ({ name })) : undefined,
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
 * Generate metadata for blog posts
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
  const description = content.length > 160 ? content.substring(0, 157) + "..." : content;
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
