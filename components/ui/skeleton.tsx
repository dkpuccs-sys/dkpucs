import { cn } from "@/lib/utils";

/**
 * Renders a skeleton placeholder div for use as a loading placeholder.
 *
 * The element has a `data-slot="skeleton"` attribute, includes the default
 * classes `bg-accent animate-pulse rounded-md`, merges any provided `className`,
 * and spreads remaining props onto the div.
 *
 * @param className - Additional CSS class names to append to the default classes
 * @param props - Additional props forwarded to the underlying div element
 * @returns The rendered div element
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
