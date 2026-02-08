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

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

/**
 * Render a card that displays an announcement's title, dates, active status, content, and controls for editing or deleting it.
 *
 * Includes a confirmation dialog before deletion and surfaces success/error feedback via toasts; successful deletion refreshes the list.
 *
 * @param announcement - The announcement to display; must include `id`, `title`, `content`, `isActive`, `createdAt`, and `updatedAt`.
 * @returns A JSX element representing the announcement card with edit and delete controls
 */
export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createdAt = new Date(announcement.createdAt);
  const updatedAt = new Date(announcement.updatedAt);

  const createdAtLabel = Number.isNaN(createdAt.getTime())
    ? "—"
    : createdAt.toLocaleDateString();
  const updatedAtLabel = Number.isNaN(updatedAt.getTime())
    ? "—"
    : updatedAt.toLocaleDateString();
  const showUpdated =
    !Number.isNaN(createdAt.getTime()) &&
    !Number.isNaN(updatedAt.getTime()) &&
    updatedAt.getTime() !== createdAt.getTime();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/announcements/${announcement.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Announcement deleted",
          description: "The announcement has been successfully deleted.",
        });
        router.refresh();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete");
      }
    } catch (error: any) {
      console.error("Error deleting announcement:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to delete the announcement. Please try again.",
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
                {announcement.title}
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Created: {createdAtLabel}
                </span>
                {showUpdated && (
                  <span className="text-muted-foreground">
                    Updated: {updatedAtLabel}
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={announcement.isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {announcement.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border-t border-border pt-4 pb-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {announcement.content}
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              aria-label={`Delete announcement: ${announcement.title}`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 border border-foreground shadow-sm"
            >
              <Link href={`/admin/announcements/${announcement.id}`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Announcement"
        itemName={announcement.title}
      />
    </>
  );
}
