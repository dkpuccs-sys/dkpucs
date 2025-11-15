"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/delete-confirm-dialog";

interface LabManualCardProps {
  labManual: {
    id: string;
    title: string;
    description: string;
    difficulty: string | null;
    language: string | null;
    level: string | null;
    createdAt: Date;
  };
}

export default function LabManualCard({ labManual }: LabManualCardProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/lab-manuals/${labManual.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting lab manual:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card key={labManual.id} className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-2 text-lg sm:text-xl">{labManual.title}</CardTitle>
              <CardDescription className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {new Date(labManual.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {labManual.language && (
                <Badge variant="secondary" className="text-xs">{labManual.language}</Badge>
              )}
              {labManual.difficulty && (
                <Badge variant="outline" className="text-xs">{labManual.difficulty}</Badge>
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

