"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

/**
 * Page component that provides a form to load, edit, and delete an announcement by ID.
 *
 * Loads announcement data, exposes inputs for editing the announcement's title and content, shows loading/updating/deleting states, and presents a confirmation dialog for deletion. Success and error results are reported via toast notifications and successful operations navigate back to the announcements list.
 *
 * @returns The React element for the edit announcement page.
 */
export default function EditAnnouncementPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      fetch(`/api/announcements/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching announcement:", error);
          toast({
            title: "Error",
            description: "Failed to load announcement.",
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
      const response = await fetch(`/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update announcement.");
      }

      toast({
        title: "Success!",
        description: "Announcement updated successfully.",
        variant: "default",
      });
      router.push("/admin/announcements");
    } catch (error: any) {
      console.error("Error updating announcement:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update announcement.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete announcement.");
      }

      toast({
        title: "Success!",
        description: "Announcement deleted successfully.",
        variant: "default",
      });
      router.push("/admin/announcements");
    } catch (error: any) {
      console.error("Error deleting announcement:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete announcement.",
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
          <CardTitle>Edit Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
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
                placeholder="Enter announcement content"
                required
                disabled={isUpdating || isDeleting}
                rows={10}
                className="border border-border"
              />
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
        title="Delete Announcement"
        itemName={title}
      />
    </>
  );
}
