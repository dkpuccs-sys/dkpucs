import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Renders a flexible empty-state container.
 *
 * The element uses a standard centered layout and styling and includes data-slot="empty".
 * Additional `className` and other div props are applied to the rendered element.
 *
 * @returns A `div` element that serves as an empty-state container
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the header area for an empty-state layout.
 *
 * @returns A `div` element with `data-slot="empty-header"`, centered stacked content, and class names for spacing and text centering
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className,
      )}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Container for empty-state media or an icon that applies variant-based styling.
 *
 * @param className - Additional class names to merge with the component's styles
 * @param variant - Visual variant to apply; either `"default"` or `"icon"`
 * @returns A div element rendered as the empty-state media/icon container
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

/**
 * Renders the title area for an empty-state layout.
 *
 * @returns A `div` element with empty-state title styling and a `data-slot="empty-title"` attribute
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  );
}

/**
 * Description container for an empty-state layout.
 *
 * Applies muted, small relaxed text styling and ensures descendant links are underlined
 * with an underline offset and a color change on hover.
 *
 * @param className - Additional CSS classes to append to the component's base styles
 * @returns The paragraph element used as the empty-state description
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Content container for an empty-state layout that centers and stacks its children.
 *
 * @returns A `div` with `data-slot="empty-content"` that applies centered, column layout and forwards additional props.
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};
