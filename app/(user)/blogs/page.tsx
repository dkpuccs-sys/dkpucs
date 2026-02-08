import { getBlogs, getTotalBlogsCount } from "@/lib/data";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read the latest blogs, articles, and tutorials on programming, coding, competitive programming, and computer science. Learn from the DKPUCS community.",
  keywords: [
    "DKPUCS blogs",
    "programming blogs",
    "coding tutorials",
    "computer science articles",
    "tech blogs",
    "coding tips",
    "programming tutorials",
    "student blogs",
  ],
  openGraph: {
    title: "Blogs - DKPUCS",
    description:
      "Read the latest blogs and articles on programming and computer science.",
    url: "https://dkpucs.vercel.app/blogs",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/blogs",
  },
};

interface BlogsPageProps {
  searchParams: Promise<{
    level?: string;
    page?: string;
  }>;
}

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
];

const ITEMS_PER_PAGE = 10;

/**
 * Renders the Blogs listing page with level filtering, paginated results, and navigation controls.
 *
 * @param searchParams - Object containing optional `level` and `page` query values used to derive the active filter and current page
 * @returns The JSX element for the Blogs page showing the applied filter, current page of posts (or an empty state), and pagination controls
 */
export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const para = await searchParams;
  const currentPage = Math.max(1, Number(para?.page) || 1);
  const levelFilter = para?.level || "";
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const blogs = await getBlogs(skip, ITEMS_PER_PAGE, levelFilter);
  const totalBlogs = await getTotalBlogsCount(levelFilter);
  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col grow">
      <h1 className="text-4xl font-bold mb-4">Blogs</h1>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Filter by level:
        </span>
        <div className="flex flex-wrap gap-2">
          {LEVEL_OPTIONS.map((opt) => {
            const isActive = levelFilter === opt.value;
            const href = opt.value
              ? `/blogs?level=${encodeURIComponent(opt.value)}&page=1`
              : "/blogs?page=1";
            return (
              <Link
                key={opt.value || "all"}
                href={href}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-8 grow">
        {blogs.length > 0 ? (
          blogs.map((blog: any) => {
            const createdAt = blog.createdAt
              ? new Date(blog.createdAt)
              : new Date();
            const snippet =
              typeof blog.content === "string" && blog.content.length > 400
                ? blog.content.slice(0, 400) + "..."
                : blog.content;

            return (
              <article
                key={blog.id}
                className="p-6 border rounded-lg shadow-md bg-card"
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {blog.title}
                  </h2>
                  {blog.level && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                      {blog.level}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  By {blog.author || "Anonymous"} on{" "}
                  {createdAt.toLocaleDateString()}
                </p>
                <p className="text-foreground mb-3 whitespace-pre-wrap">
                  {snippet}
                </p>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Read full blog
                </Link>
              </article>
            );
          })
        ) : (
          <EmptyState
            title="No blog posts found"
            description="Try changing the level filter or check back later for new blog content."
          />
        )}
      </div>

      {totalBlogs > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button asChild variant="outline" disabled={currentPage === 1}>
            <Link
              href={`/blogs?page=${currentPage - 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
            >
              Previous
            </Link>
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              asChild
              variant={currentPage === i + 1 ? "default" : "outline"}
            >
              <Link
                href={`/blogs?page=${i + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
              >
                {i + 1}
              </Link>
            </Button>
          ))}
          <Button
            asChild
            variant="outline"
            disabled={currentPage === totalPages}
          >
            <Link
              href={`/blogs?page=${currentPage + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
            >
              Next
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
