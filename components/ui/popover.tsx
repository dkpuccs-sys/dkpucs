"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

/**
 * Render a Radix Popover Root that forwards all received props and sets `data-slot="popover"`.
 *
 * @returns The Popover root element with `data-slot="popover"` and the supplied props applied.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * Render a Popover trigger element with a standardized `data-slot="popover-trigger"` attribute while forwarding all received props.
 *
 * @returns The rendered trigger element with `data-slot="popover-trigger"` and the provided props applied.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * Render the popover content panel inside a portal with default styling.
 *
 * Merges the provided `className` with the component's default classes and forwards remaining props to the underlying Radix popover content primitive.
 *
 * @param className - Additional CSS classes to merge with default styling
 * @param align - Alignment of the content relative to the trigger; defaults to "center"
 * @param sideOffset - Distance in pixels between the trigger and the content; defaults to 4
 * @returns The rendered popover content element
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Renders an anchor element that designates the popover's anchor position.
 *
 * Forwards all received props to the underlying Radix Anchor and adds
 * data-slot="popover-anchor" for consistent slot targeting.
 *
 * @returns The Anchor element with forwarded props and the `data-slot="popover-anchor"` attribute.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
