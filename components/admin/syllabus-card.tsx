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
import Link from "next/link";
import { Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";
import { useToast } from "@/hooks/use-toast";

interface SyllabusCardProps {
  syllabus: {
    id: string;
    title: string;
    description: string;
    pdfUrl: string;
    createdAt: Date;
  };
}

/**
 * Render a card showing a syllabus's title, creation date, description and PDF link, with Edit and Delete controls.
 *
 * The Delete control opens a confirmation dialog; confirming sends a DELETE request to `/api/syllabus/{id}` and refreshes the page on success.
 *
 * @param syllabus - Object with syllabus data: `id`, `title`, `description`, `pdfUrl`, and `createdAt`.
 * @returns A JSX element representing the syllabus card with edit and delete actions.
 */
export default function SyllabusCard({ syllabus }: SyllabusCardProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/syllabus/${syllabus.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Syllabus deleted successfully.",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete syllabus.");
      }
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

  return (
    <>
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {syllabus.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {new Date(syllabus.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                {syllabus.description}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                PDF URL:{" "}
                <a
                  href={syllabus.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {syllabus.pdfUrl}
                </a>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-background hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 border border-foreground shadow-sm"
            >
              <Link href={`/admin/syllabus/${syllabus.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Syllabus"
        itemName={syllabus.title}
      />
    </>
  );
}
