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

interface TextbookCardProps {
  textbook: {
    id: string;
    title: string;
    author: string | null;
    hyperlink: string;
    section: string;
    subject: string;
    createdAt: Date;
  };
}

/**
 * Renders a card UI for a single textbook including its metadata, hyperlink, and actions to edit or delete the textbook.
 *
 * @returns The JSX element for the textbook card.
 */
export default function TextbookCard({ textbook }: TextbookCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/textbooks/${textbook.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Textbook deleted successfully.",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete textbook.");
      }
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

  return (
    <>
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {textbook.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {textbook.author && `by ${textbook.author} | `}
                  {textbook.subject} ({textbook.section}) |{" "}
                  {new Date(textbook.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                Hyperlink:{" "}
                <a
                  href={textbook.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {textbook.hyperlink}
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
              <Link href={`/admin/textbooks/${textbook.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Textbook"
        itemName={textbook.title}
      />
    </>
  );
}
