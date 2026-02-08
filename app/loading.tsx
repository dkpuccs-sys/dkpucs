import { Loader2 } from "lucide-react";

/**
 * Renders a full-screen, centered loading indicator with a spinning icon and a pulsing "Loading..." label.
 *
 * @returns The full-screen loading UI element.
 */
export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
