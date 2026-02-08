"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  itemName?: string;
}

/**
 * Render a modal confirmation dialog for deleting an item.
 *
 * When the user confirms, the component invokes `onConfirm` and then closes the dialog
 * by calling `onOpenChange(false)`.
 *
 * @param open - Whether the dialog is currently open
 * @param onOpenChange - Callback to update the dialog open state
 * @param onConfirm - Callback invoked when the user confirms deletion
 * @param title - Title text displayed in the dialog header
 * @param description - Optional custom description; if omitted a default message is shown
 * @param itemName - Optional item name included in the default description when provided
 * @returns A JSX element rendering the delete confirmation dialog
 */
export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  itemName,
}: DeleteConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {description ||
              `Are you sure you want to delete ${itemName ? `"${itemName}"` : "this item"}? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-background hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
