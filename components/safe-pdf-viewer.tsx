"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Set the worker source — copied from pdfjs-dist/build/ to public/
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface SafePdfViewerProps {
  /** URL of the PDF to render (served through the proxy API) */
  pdfUrl: string;
  /** Optional title to display in the header bar */
  title?: string;
}

/**
 * Canvas-based PDF viewer that renders each page to a <canvas> element.
 *
 * Renders the PDF server-side via the proxy API and uses pdfjs-dist to draw
 * each page onto an HTML canvas. This prevents the browser's native PDF viewer
 * from showing, which removes the built-in download/print toolbar. Combined
 * with CSS anti-screenshot overlays, right-click prevention, and drag blocking,
 * this makes it significantly harder for users to download or screenshot the
 * content.
 *
 * @param pdfUrl  - Proxy URL pointing to the PDF binary.
 * @param title   - Optional title displayed in the viewer header bar.
 */
export default function SafePdfViewer({ pdfUrl, title }: SafePdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  /** Render a specific page to the canvas */
  const renderPage = useCallback(
    async (num: number) => {
      const pdf = pdfDocRef.current;
      const canvas = canvasRef.current;
      if (!pdf || !canvas) return;

      // Cancel any in-progress render
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;

      try {
        const page = await pdf.getPage(num);
        const viewport = page.getViewport({ scale });

        // Account for device pixel ratio for sharp rendering on Retina/HiDPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.height = viewport.height * dpr;
        canvas.width = viewport.width * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.warn("Could not get 2D canvas context for PDF rendering.");
          return;
        }
        ctx.scale(dpr, dpr);

        // Clear and render
        ctx.clearRect(0, 0, viewport.width, viewport.height);
        const renderTask = page.render({
          canvas,
          canvasContext: ctx,
          viewport,
        });
        renderTaskRef.current = renderTask;
        await renderTask.promise;
        renderTaskRef.current = null;
      } catch (err) {
        // Ignore cancellation errors — they're expected when navigating away or re-rendering
        if (err instanceof Error && err.message?.includes("cancelled")) return;
        console.error("Error rendering page:", err);
      }
    },
    [scale],
  );

  /** Load the PDF document */
  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      setLoading(true);
      setError(null);

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        setPageNum(1);
        setLoading(false);

        // Render the first page
        await renderPage(1);
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to load PDF:", err);
        setError(
          "Failed to load document. It may be unavailable or the URL may be invalid.",
        );
        setLoading(false);
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      pdfDocRef.current?.destroy();
      pdfDocRef.current = null;
    };
  }, [pdfUrl, renderPage]);

  /** Re-render when page or scale changes */
  useEffect(() => {
    if (!loading && pdfDocRef.current) {
      renderPage(pageNum);
    }
  }, [pageNum, scale, loading, renderPage]);

  const goToPage = (num: number) => {
    if (num >= 1 && num <= totalPages) {
      setPageNum(num);
      // Scroll to top of canvas
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4 p-8 bg-card border border-border rounded-lg">
        <AlertCircle className="size-12 text-destructive" />
        <p className="text-destructive font-medium text-center">{error}</p>
        <p className="text-muted-foreground text-sm text-center">
          Please contact the administrator if this issue persists.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2 min-w-0">
          {title && (
            <span className="text-sm font-medium truncate text-foreground">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              title="Zoom out"
            >
              <span className="text-xs font-bold">A-</span>
            </Button>
            <span className="text-xs text-muted-foreground w-10 text-center tabular-nums">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={zoomIn}
              disabled={scale >= 3}
              title="Zoom in"
            >
              <span className="text-xs font-bold">A+</span>
            </Button>
          </div>

          {/* Page navigation */}
          {totalPages > 0 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => goToPage(pageNum - 1)}
                disabled={pageNum <= 1}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-15 text-center tabular-nums">
                {pageNum} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => goToPage(pageNum + 1)}
                disabled={pageNum >= totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Canvas area with anti-screenshot protections */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-auto bg-muted/30 flex items-start justify-center p-4"
        onContextMenu={(e) => e.preventDefault()}
        style={{
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading document...
              </p>
            </div>
          </div>
        )}

        {/* Canvas wrapper with overlay to prevent certain screenshot methods */}
        <div className="relative inline-flex">
          <canvas
            ref={canvasRef}
            className="shadow-xl bg-white rounded-sm"
            style={{
              pointerEvents: "none",
              maxWidth: "100%",
              height: "auto",
            }}
            onDragStart={(e) => e.preventDefault()}
          />

          {/* Transparent overlay on top of canvas to defeat some screenshot tools */}
          <div
            className="absolute inset-0 z-1"
            style={{
              pointerEvents: "none",
              background: "transparent",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Footer with copyright notice */}
      <div className="px-4 py-1.5 border-t border-border bg-muted/30">
        <p className="text-[10px] text-muted-foreground text-center">
          This document is protected. Downloading, sharing, or reproducing
          content is prohibited.
        </p>
      </div>
    </div>
  );
}
