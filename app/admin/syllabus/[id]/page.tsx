"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Edit page for an existing syllabus that provides a form to view and modify syllabus fields and to delete the syllabus.
 *
 * The component loads syllabus data for the route id, displays a loading state while fetching, and renders form controls
 * for title, description, PDF URL, and optional level. It handles submitting updates and deleting the syllabus, showing
 * success or error toasts and navigating back to the syllabus list on success.
 *
 * @returns The JSX element for the edit syllabus page.
 */
export default function EditSyllabusPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
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
      fetch(`/api/syllabus/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setPdfUrl(data.pdfUrl);
          setLevel(data.level || "");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching syllabus:", error);
          toast({
            title: "Error",
            description: "Failed to load syllabus.",
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
      const response = await fetch(`/api/syllabus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          pdfUrl,
          level: level || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update syllabus.");
      }

      toast({
        title: "Success!",
        description: "Syllabus updated successfully.",
        variant: "default",
      });
      router.push("/admin/syllabus");
    } catch (error: any) {
      console.error("Error updating syllabus:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update syllabus.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/syllabus/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete syllabus.");
      }

      toast({
        title: "Success!",
        description: "Syllabus deleted successfully.",
        variant: "default",
      });
      router.push("/admin/syllabus");
    } catch (error: any) {
      console.error("Error deleting syllabus:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete syllabus.",
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
          <CardTitle>Edit Syllabus</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter syllabus title"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter syllabus description"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pdfUrl">PDF URL</Label>
              <Input
                id="pdfUrl"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="Enter PDF URL"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                onValueChange={(val: string) =>
                  setLevel(val === "none" ? "" : val)
                }
                value={level || "none"}
                disabled={isUpdating || isDeleting}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
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
                  "Update Syllabus"
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
                  "Delete Syllabus"
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
        title="Delete Syllabus"
        itemName={title}
      />
    </>
  );
}
