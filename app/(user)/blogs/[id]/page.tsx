import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link" 
import { Button } from "@/components/ui/button" 
import { Metadata } from "next"

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } })

  if (!blog) {
    return {
      title: "Blog not found",
    }
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 150),
    keywords: blog.author,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } })

  if (!blog) {
    notFound()
  }

  const createdAt = new Date(blog.createdAt)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{blog.title}</h1>
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
  )
}
