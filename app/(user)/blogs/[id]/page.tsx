import { getBlogById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Generate page metadata for a blog detail page.
 *
 * Populates title, description, keywords, authors, Open Graph, Twitter, and canonical URL using the blog identified by `params`. If the blog is not found, returns metadata with the title "Blog not found".
 *
 * @param params - A promise resolving to route parameters containing the blog `id`
 * @returns A Metadata object populated from the blog data; if the blog does not exist, a Metadata object with title `"Blog not found"`
 */
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const blog = await getBlogById(id);

    if (!blog) {
      return {
        title: "Blog not found",
      };
    }

    const description =
      blog.content.length > 160
        ? blog.content.substring(0, 157) + "..."
        : blog.content;

    return {
      title: blog.title,
      description,
      keywords: [
        "DKPUCS",
        "blog",
        "programming",
        "coding",
        blog.author || "DKPUCS Team",
        blog.level,
      ].filter(Boolean) as string[],
      authors: [{ name: blog.author || "DKPUCS Team" }],
      openGraph: {
        title: blog.title,
        description,
        type: "article",
        url: `https://dkpucs.vercel.app/blogs/${id}`,
        publishedTime: new Date(blog.createdAt).toISOString(),
        authors: [blog.author || "DKPUCS Team"],
        section: blog.level || "Technology",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
      },
      alternates: {
        canonical: `https://dkpucs.vercel.app/blogs/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "DKPUCS Blog",
    };
  }
}

/**
 * Render the blog detail page for the blog identified by the route `id`.
 *
 * @param params - A Promise resolving to an object with an `id` string used to load the blog
 * @returns The React element representing the blog detail page
 */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const createdAt = new Date(blog.createdAt);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {blog.title}
            </h1>
            {blog.level && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                {blog.level}
              </span>
            )}
          </div>
          <Button asChild variant="outline">
            <Link href="/blogs">← Back to Blogs</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          By {blog.author || "Anonymous"} on {createdAt.toLocaleDateString()}
        </p>
        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </div>
  );
}
