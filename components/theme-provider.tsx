"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

/**
 * Wraps children with NextThemesProvider to provide theme context.
 *
 * @param children - The elements that will receive theme context
 * @returns A React element that provides theme context to its children
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
