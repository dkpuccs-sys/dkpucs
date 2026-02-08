import { cn } from "@/lib/utils";

/**
 * Renders a <kbd> element styled as a keyboard key for UI displays.
 *
 * @param className - Optional additional CSS class names merged with the component's base styles.
 * @param props - Additional attributes forwarded to the underlying `kbd` element.
 * @returns The `<kbd>` element with keyboard-key styling and `data-slot="kbd"`.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted w-fit text-muted-foreground pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a grouped keyboard-key container for inline key elements.
 *
 * @returns A `<kbd>` element with `data-slot="kbd-group"` and the base classes `inline-flex items-center gap-1`, combined with any provided `className`; all other props are forwarded to the element.
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
