import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogCard from "@/components/admin/blog-card";
import { RefreshButton } from "@/components/admin/refresh-button";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Blogs</h1>
        <div className="flex gap-2">
          <RefreshButton path="/admin/blogs" />
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/blogs/new">New Blog</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}