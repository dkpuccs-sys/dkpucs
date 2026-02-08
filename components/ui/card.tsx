import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a card container with base layout and visual styles.
 *
 * @param className - Additional CSS classes merged with the component's base styles.
 * @param props - Additional attributes forwarded to the root `div` element.
 * @returns The root `div` element for the card.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the card header container with layout and spacing for header content.
 *
 * @returns The header `div` element with `data-slot="card-header"` and composed classes for layout, spacing, and responsive placement of header content.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the card title using the specified HTML element with heading typography.
 *
 * The `as` prop selects which HTML element to render (defaults to `"h3"`). Any `className`
 * provided will be merged with the component's base typography classes.
 *
 * @param as - Element tag to render for the title (e.g., `"h1" | "h2" | "h3" | "div"`); defaults to `"h3"`.
 * @param className - Additional CSS classes to merge with the base title classes.
 * @returns The rendered title element with `data-slot="card-title"` and typography classes.
 */
function CardTitle({
  className,
  as: Comp = "h3",
  ...props
}: React.ComponentProps<"div"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}) {
  return (
    <Comp
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * Renders the card's descriptive text element with muted styling.
 *
 * @param className - Additional CSS classes to merge with the component's default description styles
 * @param props - Any other props to spread onto the underlying `div` (e.g., event handlers, id, aria attributes)
 * @returns The rendered card description `div` element
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * Renders the card's action area.
 *
 * @returns A `div` element with `data-slot="card-action"` positioned for card actions.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the card's content area with horizontal padding.
 *
 * @returns A `div` element that serves as the card content container.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled footer container for a Card component.
 *
 * @returns A `div` element that serves as the card footer (`data-slot="card-footer"`) with merged CSS classes for horizontal padding, flex layout, and top-border spacing.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
