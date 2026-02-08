import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Renders a <nav> element that serves as a breadcrumb container.
 *
 * Sets `aria-label="breadcrumb"` and `data-slot="breadcrumb"` on the element and forwards all other props to the underlying `<nav>`.
 *
 * @returns The rendered breadcrumb `<nav>` element.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * Renders an ordered list element that serves as the breadcrumb list.
 *
 * Applies default breadcrumb styling and sets `data-slot="breadcrumb-list"`, forwarding any additional props to the `<ol>`.
 *
 * @returns The `<ol>` element configured as the breadcrumb list
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render a list item configured as a breadcrumb item.
 *
 * Merges the provided `className` with default breadcrumb item classes, sets
 * `data-slot="breadcrumb-item"`, and forwards remaining props to the underlying `<li>`.
 *
 * @param className - Additional CSS class names to merge with the default item classes
 * @returns The `<li>` element representing the breadcrumb item
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/**
 * Renders a breadcrumb link element, optionally delegating rendering to a Slot when the component should act as a wrapper for a custom child.
 *
 * @param asChild - When `true`, render a `Slot` so the caller can provide a custom element; when `false` or omitted, render a native `a` element.
 * @returns The rendered breadcrumb link element (`a` or `Slot`) with breadcrumb-specific data attributes and styling.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

/**
 * Renders the current page indicator inside a breadcrumb.
 *
 * @returns A `span` element indicating the current breadcrumb page with `role="link"`, `aria-disabled="true"`, and `aria-current="page"`.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

/**
 * Renders a breadcrumb separator list item.
 *
 * The rendered <li> is marked with role="presentation" and aria-hidden="true" to keep
 * the separator decorative for assistive technologies.
 *
 * @param children - Optional custom separator content; if omitted, a right-chevron icon is rendered.
 * @param className - Additional class names applied to the list item.
 * @returns The breadcrumb separator list item element.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * Renders an accessible ellipsis separator for a breadcrumb to indicate omitted items.
 *
 * @returns A span element containing a horizontal-more icon and a screen-reader-only "More" label.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
