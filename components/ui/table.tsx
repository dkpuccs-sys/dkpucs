"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Render a responsive table container that wraps a table element.
 *
 * The component merges `className` with default table classes and forwards all other props to the underlying `table`.
 *
 * @param className - Additional class names applied to the table element
 * @param props - Remaining props that are spread onto the underlying table element
 * @returns A JSX element containing the table wrapped in a horizontally scrollable container
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders the table header container used for column headings.
 *
 * @returns The `<thead>` element with `data-slot="table-header"` and merged class names.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

/**
 * Renders the table body container for the Table component.
 *
 * @returns The `tbody` element with `data-slot="table-body"`, merged class names, and any additional `tbody` props applied.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * Renders a table footer (<tfoot>) with standardized slot and default footer styling.
 *
 * @returns The `<tfoot>` element with `data-slot="table-footer"` and merged footer-related class names.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table row (<tr>) with standardized row styling and `data-slot="table-row"`.
 *
 * @param className - Additional CSS classes appended to the default row styles
 * @returns The rendered `<tr>` element with merged classes and any forwarded props
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table header cell with standardized styling and a `data-slot="table-head"` attribute.
 *
 * Additional props are spread onto the underlying `th` element and `className` is merged with the component's default classes.
 *
 * @returns The configured `th` element for use as a table header cell.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render a table cell (`td`) with standardized slot attributes and base styling.
 *
 * @param className - Additional CSS class names to merge with the component's base classes
 * @returns A `td` element with `data-slot="table-cell"` and merged class names including padding, alignment, and checkbox-aware spacing
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render a table caption element with standardized styling and a data-slot attribute.
 *
 * @returns The caption element with `data-slot="table-caption"` and combined default and custom class names.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
