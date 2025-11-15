"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast"; 

export default function EditLabManualPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [content, setContent] = useState<Array<{ question: string; code: string; comments: string }>>([]);
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
      fetch(`/api/lab-manuals/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setDifficulty(data.difficulty || "");
          setLanguage(data.language || "");
          setLevel(data.level || "");
          setContent(data.content || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching lab manual:", error);
          toast({
            title: "Error",
            description: "Failed to load lab manual.",
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
      const response = await fetch(`/api/lab-manuals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, difficulty, language, level, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update lab manual.");
      }

      toast({
        title: "Success!",
        description: "Lab Manual updated successfully.",
        variant: "default",
      });
      router.push("/admin/lab-manuals");
    } catch (error: any) {
      console.error("Error updating lab manual:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update lab manual.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/lab-manuals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete lab manual.");
      }

      toast({
        title: "Success!",
        description: "Lab Manual deleted successfully.",
        variant: "default",
      });
      router.push("/admin/lab-manuals");
    } catch (error: any) {
      console.error("Error deleting lab manual:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete lab manual.",
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
          <CardTitle>Edit Lab Manual</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lab manual title"
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
                placeholder="Enter lab manual description"
                required
                rows={5}
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
            </div>
            
            <div className="grid gap-4">
              <Label>Content (Code Snippets)</Label>
              {content.map((item, index) => (
                <div key={index} className="border p-4 rounded-md grid gap-2">
                  <Label htmlFor={`question-${index}`}>Question</Label>
                  <Input
                    id={`question-${index}`}
                    value={item.question}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].question = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Enter question for this snippet"
                    disabled={isUpdating || isDeleting}
                    className="border border-border"
                  />
                  <Label htmlFor={`code-${index}`}>Code</Label>
                  <Textarea
                    id={`code-${index}`}
                    value={item.code}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].code = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Enter code snippet"
                    rows={5}
                    disabled={isUpdating || isDeleting}
                    className="border border-border"
                  />
                  <Label htmlFor={`comments-${index}`}>Comments</Label>
                  <Textarea
                    id={`comments-${index}`}
                    value={item.comments}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].comments = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Enter comments for this snippet"
                    rows={3}
                    disabled={isUpdating || isDeleting}
                    className="border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newContent = content.filter((_, i) => i !== index);
                      setContent(newContent);
                    }}
                    disabled={isUpdating || isDeleting}
                  >
                    Remove Snippet
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setContent([...content, { question: "", code: "", comments: "" }])
                }
                disabled={isUpdating || isDeleting}
              >
                Add Code Snippet
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={setDifficulty} value={difficulty} disabled={isUpdating || isDeleting}>
                <SelectTrigger className="border border-border">
                  <SelectValue placeholder="Select difficulty (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select onValueChange={setLanguage} value={language} disabled={isUpdating || isDeleting}>
                <SelectTrigger className="border border-border">
                  <SelectValue placeholder="Select language (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select onValueChange={setLevel} value={level} disabled={isUpdating || isDeleting}>
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
        title="Delete Lab Manual"
        itemName={title}
      />
    </>
  );
}
