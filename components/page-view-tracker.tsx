"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Tracks page views whenever the current pathname changes and renders nothing.
 *
 * Calls the analytics tracker with the current pathname on mount and whenever the pathname updates.
 *
 * @returns `null` (this component does not render any UI)
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
