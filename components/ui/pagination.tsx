import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * Render a centered pagination navigation container.
 *
 * @returns A navigation element configured for pagination with role "navigation", aria-label "pagination", data-slot "pagination", combined (centered) class names, and any additional props spread onto the element.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

/**
 * Renders the pagination content container as a horizontal list.
 *
 * @param className - Additional CSS class names to merge with the default layout classes.
 * @param props - Additional props are spread onto the underlying `ul` element.
 * @returns The `ul` element containing pagination items.
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

/**
 * Render a pagination list item.
 *
 * The element has `data-slot="pagination-item"` and forwards all provided `li` props onto the rendered element.
 *
 * @returns An HTML `li` element configured for pagination
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & React.ComponentProps<"a">;

/**
 * Renders a pagination anchor styled like a button and indicates when it represents the current page.
 *
 * @param isActive - When `true`, sets `aria-current="page"` and applies the active styling.
 * @param size - Visual size applied to the underlying button styling system.
 * @returns The rendered pagination anchor element.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the previous-page pagination control.
 *
 * @returns A pagination link element with a left chevron icon and a "Previous" label hidden on small screens.
 */
function PaginationPrevious({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

/**
 * Renders a "Next" pagination control with responsive text and a right-chevron icon.
 *
 * @returns A PaginationLink element configured as the next-page control, including an accessible label (`aria-label="Go to next page"`), hidden-on-small-screen "Next" text, and a right-chevron icon.
 */
function PaginationNext({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

/**
 * Render a decorative pagination ellipsis.
 *
 * Non-interactive span containing a decorative ellipsis icon and a visually hidden "More pages" label for assistive technologies.
 *
 * @returns The span element representing the pagination ellipsis
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
