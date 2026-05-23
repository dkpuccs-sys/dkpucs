import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SafePdfViewer from "@/components/safe-pdf-viewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

/**
 * Validate that the resource type path is one we support.
 */
const VALID_TYPES = ["syllabus", "questionPaper", "textbook"] as const;
type ResourceType = (typeof VALID_TYPES)[number];

/**
 * Look up a resource by type and id, returning the pdfUrl/hyperlink and title
 * if `preventDownload` is true. Otherwise returns null.
 */
async function getProtectedResource(type: ResourceType, id: string) {
  switch (type) {
    case "syllabus": {
      const s = await prisma.syllabus.findUnique({ where: { id } });
      if (!s || !s.preventDownload) return null;
      return {
        url: s.pdfUrl,
        title: s.title,
        proxyUrl: `/api/pdf-proxy?type=syllabus&id=${id}`,
      };
    }
    case "questionPaper": {
      const qp = await prisma.questionPaper.findUnique({ where: { id } });
      if (!qp || !qp.preventDownload) return null;
      return {
        url: qp.hyperlink,
        title: `${qp.subject} - ${qp.year}`,
        proxyUrl: `/api/pdf-proxy?type=questionPaper&id=${id}`,
      };
    }
    case "textbook": {
      const t = await prisma.textbook.findUnique({ where: { id } });
      if (!t || !t.preventDownload) return null;
      return {
        url: t.hyperlink,
        title: t.title,
        proxyUrl: `/api/pdf-proxy?type=textbook&id=${id}`,
      };
    }
    default:
      return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  if (!VALID_TYPES.includes(type as ResourceType)) {
    return { title: "Invalid Document" };
  }
  const resource = await getProtectedResource(type as ResourceType, id);
  if (!resource) {
    return { title: "Document not available" };
  }
  return {
    title: `${resource.title} - Protected Document`,
    description: "Viewing a protected document on KarnatakaPUCCS.",
    robots: { index: false, follow: false },
  };
}

/**
 * Renders a protected document in a canvas-based PDF viewer that prevents
 * downloading and makes screenshots significantly harder.
 *
 * Only resources with `preventDownload = true` can be viewed through this page;
 * all others are redirected to their direct URL.
 */
export default async function PdfViewerPage({ params }: Props) {
  const { type, id } = await params;

  if (!VALID_TYPES.includes(type as ResourceType)) {
    notFound();
  }

  const resource = await getProtectedResource(type as ResourceType, id);

  // Compute the back-link route *before* the early-return so it can be reused
  // both for redirect (when resource is unavailable) and in the JSX below.
  const backLink =
    type === "syllabus"
      ? "/syllabus"
      : type === "questionPaper"
        ? "/qps"
        : "/textbooks";

  if (!resource) {
    // If the resource doesn't exist or preventDownload is false,
    // redirect to the relevant resource list page instead of the homepage
    redirect(backLink);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="gap-1.5">
            <Link href={backLink}>
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </Button>
          <span className="text-sm font-medium text-foreground truncate">
            {resource.title}
          </span>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <SafePdfViewer pdfUrl={resource.proxyUrl} title={resource.title} />
      </div>
    </div>
  );
}
