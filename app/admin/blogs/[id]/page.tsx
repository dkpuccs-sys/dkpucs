"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

/**
 * Render the Edit Blog admin page that lets users load, edit, and delete a blog post.
 *
 * Loads blog data from the route `id`, displays a loading state while fetching,
 * and provides form controls to update title, content, author, and level. Successful
 * update and delete actions show user toasts and navigate back to the admin blogs list.
 *
 * @returns The Edit Blog page as a React element.
 */
export default function EditBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [level, setLevel] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetch(`/api/blogs/${id}`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to load blog post.");
          }
          return res.json();
        })
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setAuthor(data.author || "");
          setLevel(data.level || "");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog:", error);
          toast({
            title: "Error",
            description: "Failed to load blog post.",
            variant: "destructive",
          });
          setIsLoading(false);
        });
    }
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author, level }),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog.");
      }

      toast({
        title: "Success!",
        description: "Blog post updated successfully.",
        variant: "default",
      });
      router.push("/admin/blogs");
    } catch (error: any) {
      console.error("Error updating blog:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog.");
      }

      toast({
        title: "Success!",
        description: "Blog post deleted successfully.",
        variant: "default",
      });
      router.push("/admin/blogs");
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Spinner className="h-6 w-6" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content"
                required
                rows={10}
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name (optional)"
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                onValueChange={setLevel}
                value={level}
                disabled={isUpdating || isDeleting}
              >
                <SelectTrigger className="border border-border">
                  <SelectValue placeholder="Select level (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st PU">1st PU</SelectItem>
                  <SelectItem value="2nd PU">2nd PU</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-4 pt-4">
              <Button
                type="submit"
                disabled={isUpdating || isDeleting}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isUpdating ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isUpdating || isDeleting}
                className="bg-destructive text-destructive-background hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Blog"
        itemName={title}
      />
    </>
  );
}
