"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";

import { useToast } from "@/hooks/use-toast";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author: string | null;
    level: string | null;
    createdAt: Date | string;
  };
}

/**
 * Render a card displaying a blog post's title, metadata, truncated content, and action controls.
 *
 * Renders the post title, author (or "Unknown"), formatted creation date, an optional level badge, a three-line content preview, and action buttons for editing and deleting. The delete control opens a confirmation dialog before performing deletion.
 *
 * @param blog - The blog object to display; expected fields: `id`, `title`, `content`, `author` (or null), `level` (optional), and `createdAt` (Date or string)
 * @returns The JSX element representing the blog card with metadata, content preview, and edit/delete controls
 */
export default function BlogCard({ blog }: BlogCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Blog deleted",
          description: "The blog post has been successfully deleted.",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {blog.title}
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span>By {blog.author || "Unknown"}</span>
                <span className="text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {blog.level && (
                <Badge variant="secondary" className="text-xs">
                  {blog.level}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border-t border-border pt-4 pb-4">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {blog.content}
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              aria-label={`Delete blog post: ${blog.title}`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 border border-foreground shadow-sm"
            >
              <Link href={`/admin/blogs/${blog.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Blog"
        itemName={blog.title}
      />
    </>
  );
}
