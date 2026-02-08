import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A styled textarea component that forwards native textarea props and applies the component library's input styles.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @param props - All other native textarea props are forwarded to the underlying element
 * @returns The rendered textarea element with applied styling and forwarded props
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "dark:border-border dark:bg-card/50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
