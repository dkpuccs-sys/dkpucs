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

interface QPCardProps {
  qp: {
    id: string;
    subject: string;
    year: number;
    hyperlink: string;
    createdAt: Date | string;
  };
}

/**
 * Render a card displaying a question paper's details with Edit and Delete controls.
 *
 * The Delete button opens a confirmation dialog; confirming sends a DELETE request for the question
 * paper, shows a success or error toast, and refreshes the router. The Edit button links to the
 * admin edit page for the question paper.
 *
 * @param qp - Question paper data containing `id`, `subject`, `year`, `hyperlink`, and `createdAt` (may be a `Date` or an ISO date `string`)
 * @returns The JSX element for the question paper card
 */
export default function QPCard({ qp }: QPCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/qps/${qp.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Question paper deleted",
          description: "The question paper has been successfully deleted.",
        });
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting question paper:", error);
      toast({
        title: "Error",
        description: "Failed to delete the question paper. Please try again.",
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
        key={qp.id}
        className="border shadow-sm hover:shadow-md transition-shadow"
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {qp.subject} - {qp.year}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {new Date(qp.createdAt).toLocaleDateString()}
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
                  href={qp.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {qp.hyperlink}
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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              aria-label={`Delete question paper: ${qp.subject} - ${qp.year}`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 border border-foreground shadow-sm"
            >
              <Link href={`/admin/qps/${qp.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Question Paper"
        itemName={`${qp.subject} - ${qp.year}`}
      />
    </>
  );
}
