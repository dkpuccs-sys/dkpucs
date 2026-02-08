import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a styled HTML input element and forwards native input props.
 *
 * @param className - Additional CSS class names appended to the component's internal classes.
 * @param type - The input's `type` attribute (e.g., "text", "email").
 * @returns The rendered input element with composed classes, `data-slot="input"`, and any additional props spread onto it.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground border border-border placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-background h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "dark:border-border dark:bg-card/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
