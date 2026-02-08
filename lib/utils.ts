import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Builds a single space-separated CSS class string from the given class values and merges Tailwind utilities to resolve conflicts.
 *
 * @param inputs - One or more class values (strings, arrays, or objects) to combine into the final class string
 * @returns The merged class string with duplicate and conflicting Tailwind utility classes resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
