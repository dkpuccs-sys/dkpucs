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

export default function EditQPPage() {
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [hyperlink, setHyperlink] = useState("");
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
      fetch(`/api/qps/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setYear(data.year.toString());
          setSubject(data.subject);
          setHyperlink(data.hyperlink);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching question paper:", error);
          toast({
            title: "Error",
            description: "Failed to load question paper.",
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
      const response = await fetch(`/api/qps/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: parseInt(year), subject, hyperlink }),
      });

      if (!response.ok) {
        throw new Error("Failed to update question paper.");
      }

      toast({
        title: "Success!",
        description: "Question paper updated successfully.",
        variant: "default",
      });
      router.push("/admin/qps");
    } catch (error: any) {
      console.error("Error updating question paper:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update question paper.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/qps/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question paper.");
      }

      toast({
        title: "Success!",
        description: "Question paper deleted successfully.",
        variant: "default",
      });
      router.push("/admin/qps");
    } catch (error: any) {
      console.error("Error deleting question paper:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete question paper.",
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
          <CardTitle>Edit Question Paper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter year (e.g., 2023)"
                required
                disabled={isUpdating || isDeleting}
                className="border border-border"
              />
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
                  "Update Question Paper"
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
                  "Delete Question Paper"
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
        title="Delete Question Paper"
        itemName={`${subject} - ${year}`}
      />
    </>
  );
}
