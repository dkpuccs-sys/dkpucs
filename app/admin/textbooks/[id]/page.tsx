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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditTextbookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
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
      fetch(`/api/textbooks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setAuthor(data.author || "");
          setHyperlink(data.hyperlink);
          setSection(data.section); 
          setSubject(data.subject);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching textbook:", error);
          toast({
            title: "Error",
            description: "Failed to load textbook.",
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
      const response = await fetch(`/api/textbooks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author: author || null, hyperlink, section, subject }),
      });

      if (!response.ok) {
        throw new Error("Failed to update textbook.");
      }

      toast({
        title: "Success!",
        description: "Textbook updated successfully.",
        variant: "default",
      });
      router.push("/admin/textbooks");
    } catch (error: any) {
      console.error("Error updating textbook:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update textbook.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/textbooks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete textbook.");
      }

      toast({
        title: "Success!",
        description: "Textbook deleted successfully.",
        variant: "default",
      });
      router.push("/admin/textbooks");
    } catch (error: any) {
      console.error("Error deleting textbook:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete textbook.",
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
          <CardTitle>Edit Textbook</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter textbook title"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author (Optional)</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hyperlink">Hyperlink</Label>
              <Input
                id="hyperlink"
                value={hyperlink}
                onChange={(e) => setHyperlink(e.target.value)}
                placeholder="Enter hyperlink URL"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section">Section</Label>
            <Select onValueChange={setSection} value={section} disabled={isUpdating || isDeleting}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PU_1">1st PU</SelectItem>
                <SelectItem value="PU_2">2nd PU</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject (e.g., Computer Science)"
                required
                disabled={isUpdating || isDeleting}
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
                  "Update Textbook"
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
                  "Delete Textbook"
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
        title="Delete Textbook"
        itemName={title}
      />
    </>
  );
}
