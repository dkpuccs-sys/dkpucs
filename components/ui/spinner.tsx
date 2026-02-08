import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Renders a Loader2Icon SVG configured as an accessible, animated spinner.
 *
 * @param className - Additional CSS class names to apply to the SVG
 * @param props - Additional SVG attributes forwarded to the underlying icon
 * @returns An SVG element representing a spinning loader with role="status" and aria-label="Loading"
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
