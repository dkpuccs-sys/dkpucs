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

interface LabManualCardProps {
  labManual: {
    id: string;
    title: string;
    description: string;
    difficulty: string | null;
    language: string | null;
    level: string | null;
    createdAt: Date | string;
  };
}

/**
 * Renders a card for a lab manual with metadata, description, and edit/delete actions.
 *
 * The card displays title, creation date, optional badges for language, difficulty, and level,
 * and a truncated description. The Delete action opens a confirmation dialog and, when confirmed,
 * sends a DELETE request to /api/lab-manuals/{id} and refreshes the router on success.
 *
 * @param labManual - The lab manual to render; expected to contain `id`, `title`, `description`, `difficulty`, `language`, `level`, and `createdAt`.
 * @returns A card UI element representing the provided lab manual with Edit and Delete actions.
 */
export default function LabManualCard({ labManual }: LabManualCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/lab-manuals/${labManual.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Lab manual deleted",
          description: "The lab manual has been successfully deleted.",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting lab manual:", error);
      toast({
        title: "Error",
        description: "Failed to delete the lab manual. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card
        key={labManual.id}
        className="border shadow-sm hover:shadow-md transition-shadow"
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {labManual.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {new Date(labManual.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {labManual.language && (
                <Badge variant="secondary" className="text-xs">
                  {labManual.language}
                </Badge>
              )}
              {labManual.difficulty && (
                <Badge variant="outline" className="text-xs">
                  {labManual.difficulty}
                </Badge>
              )}
              {labManual.level && (
                <Badge className="text-xs">{labManual.level}</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                {labManual.description}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              aria-label={`Delete lab manual: ${labManual.title}`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 border border-foreground shadow-sm"
            >
              <Link href={`/admin/lab-manuals/${labManual.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Lab Manual"
        itemName={labManual.title}
      />
    </>
  );
}
