"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Renders the sheet root element with a `data-slot="sheet"` attribute and forwards all received props.
 *
 * @returns The sheet root React element with forwarded props
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * Renders the trigger element for the sheet.
 *
 * @param props - Props forwarded to the underlying trigger element.
 * @returns The trigger element with `data-slot="sheet-trigger"`.
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * Renders the sheet close control and applies data-slot="sheet-close".
 *
 * @returns The sheet close button element.
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * Render the sheet portal root element and annotate it with `data-slot="sheet-portal"`.
 *
 * @returns A Portal element with `data-slot="sheet-portal"` and all received props forwarded.
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * Renders the sheet overlay backdrop with default styling and optional additional classes.
 *
 * @param className - Additional CSS class names to merge with the overlay's default classes
 * @returns The overlay element used as the sheet backdrop
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the sheet's content area inside a portal, including the overlay and a built-in close button.
 *
 * The component applies base styling and side-specific enter/exit animations, forwards any additional
 * props to the underlying Radix Content, and mounts the content in a portal so it overlays page content.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param side - Which edge the sheet should slide in from: `"top"`, `"right"`, `"bottom"`, or `"left"`
 * @returns The rendered sheet content element with overlay, animations, and an accessible close control
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * Container element for a sheet's header section.
 *
 * Renders a div with a `data-slot="sheet-header"` attribute and header-specific spacing and padding; accepts and forwards standard div props and an optional `className`.
 *
 * @returns A header div element for the sheet with applied layout and spacing
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

/**
 * Container for the sheet footer that applies consistent spacing and layout.
 *
 * Merges a provided `className` with the component's base footer styles and forwards remaining `div` props to the root element.
 *
 * @returns The rendered sheet footer element
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled sheet title element used inside a Sheet.
 *
 * @param className - Additional class names to apply to the title element.
 * @returns The sheet title element with standard foreground and `font-semibold` styling and `data-slot="sheet-title"`.
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

/**
 * Renders the sheet's descriptive text with consistent muted styling.
 *
 * @param className - Additional CSS classes to merge with the component's base styling
 * @returns The sheet description element with muted foreground and small text, merged with `className`
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
