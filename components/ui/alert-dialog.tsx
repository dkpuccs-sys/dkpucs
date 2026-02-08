"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * Wraps the Radix AlertDialog root and attaches a `data-slot="alert-dialog"` attribute.
 *
 * @param props - Props forwarded to the Radix AlertDialog `Root` component
 * @returns The rendered AlertDialog root element with `data-slot="alert-dialog"` and all forwarded props
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/**
 * Renders the AlertDialog trigger element and attaches the project-specific `data-slot`.
 *
 * @returns The AlertDialog trigger element with any forwarded props applied.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

/**
 * Renders a Radix AlertDialog portal element with the `data-slot="alert-dialog-portal"` attribute.
 *
 * @returns The `AlertDialogPrimitive.Portal` element with `data-slot="alert-dialog-portal"` and any provided props forwarded to it.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

/**
 * Renders the AlertDialog overlay with project styling, animations, and a data-slot attribute.
 *
 * @param className - Additional CSS class names to merge with the overlay's default animation and backdrop classes.
 * @returns The overlay element configured with combined classes and `data-slot="alert-dialog-overlay"`.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render alert dialog content inside a portal with an overlay and built-in positioning, sizing, and entry/exit animations.
 *
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @returns The alert dialog content element mounted in a portal.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/**
 * Renders the header container for an AlertDialog with responsive layout and a `data-slot` attribute.
 *
 * @param className - Additional CSS class names to merge with the header's base classes
 * @returns The header container element for the alert dialog
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * Renders the footer container for an alert dialog's actions.
 *
 * Applies responsive layout: stacks action controls in column-reverse on small screens and lays them out in a row aligned to the end on larger screens. Forwards any other `div` props to the rendered element.
 *
 * @param className - Additional CSS classes to merge with the component's default layout classes.
 * @returns The rendered footer `div` element for dialog actions.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the alert dialog title element with project typography and a data-slot attribute.
 *
 * @returns The `AlertDialogPrimitive.Title` element with `text-lg font-semibold` classes and `data-slot="alert-dialog-title"`.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

/**
 * Renders the alert dialog's description element with project-specific typography and `data-slot`.
 *
 * @param className - Additional class names to apply to the description element
 * @returns The rendered AlertDialog description element
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * Render the AlertDialog action control using the project's button variant styles.
 *
 * @param className - Additional CSS class names to merge with the default button styles
 * @returns The AlertDialog action element with merged styling
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

/**
 * Renders the alert dialog's cancel control using the outline button variant.
 *
 * @param className - Additional CSS classes appended to the component's computed classes.
 * @returns The rendered cancel control element.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
