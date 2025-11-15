"use client";

import { usePathname } from "next/navigation";
import { PageViewTracker } from "@/components/page-view-tracker";

export function PathBasedTracker() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <PageViewTracker />;
}
