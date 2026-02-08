import type React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Renders a centered empty-state UI with a title, optional description, and optional action.
 *
 * @param title - Primary text shown prominently as the empty-state title.
 * @param description - Optional secondary text shown below the title when provided.
 * @param action - Optional React node to display below the description (e.g., a reset button).
 * @returns A React element containing the centered title, description, and action.
 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md mx-auto">
        <p className="text-lg text-muted-foreground mb-2">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
        )}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
