import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isIPv4, isIPv6 } from "net";
import { lookup as dnsLookup } from "dns/promises";

// ---------------------------------------------------------------------------
// Private / reserved IP helpers
// ---------------------------------------------------------------------------

/**
 * Check whether a given IPv4 address falls into a private or reserved range
 * that should never be reachable from the PDF proxy.
 *
 * Covers: 0.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8,
 *         169.254.0.0/16, 172.16.0.0/12, 192.168.0.0/16, 198.18.0.0/15.
 */
function isPrivateIPv4(ip: string): boolean {
  if (!isIPv4(ip)) return false;
  const parts = ip.split(".").map(Number);
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    (a === 100 && b >= 64 && b <= 127) || // 100.64.0.0/10 (Carrier‑Grade NAT)
    a === 127 ||
    (a === 169 && b === 254) || // 169.254.0.0/16 (Link‑Local)
    (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
    (a === 192 && b === 168) || // 192.168.0.0/16
    (a === 198 && (b === 18 || b === 19)) // 198.18.0.0/15 (Benchmark Testing)
  );
}

/**
 * Check whether a given IPv6 address is a private / reserved address
 * that should never be reachable from the PDF proxy.
 *
 * Covers: ::1/128 (loopback), ::/128 (unspecified),
 *         fc00::/7 (Unique Local Addresses), fe80::/10 (Link‑Local),
 *         and IPv4‑mapped addresses (::ffff:x.x.x.x).
 */
function isPrivateIPv6(ip: string): boolean {
  if (!isIPv6(ip)) return false;
  const lower = ip.toLowerCase();

  // Handle IPv4-mapped IPv6 addresses (e.g. ::ffff:10.0.0.1)
  if (lower.startsWith("::ffff:") || lower.startsWith("0:0:0:0:0:ffff:")) {
    const prefixLen = lower.startsWith("::ffff:") ? 7 : 18;
    const v4part = lower.substring(prefixLen);
    if (isIPv4(v4part)) return isPrivateIPv4(v4part);
  }

  // ::1/128 (loopback) and ::/128 (unspecified)
  if (
    lower === "::1" ||
    lower === "::" ||
    lower === "0:0:0:0:0:0:0:1" ||
    lower === "0:0:0:0:0:0:0:0"
  ) {
    return true;
  }

  // fc00::/7 (Unique Local Addresses) — first nibble 'f', second is 'c' or 'd'
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;

  // fe80::/10 (Link‑Local) — starts with fe8, fe9, fea, or feb
  if (
    lower.startsWith("fe8") ||
    lower.startsWith("fe9") ||
    lower.startsWith("fea") ||
    lower.startsWith("feb")
  )
    return true;

  return false;
}

/** Returns true if the given IP (v4 or v6) is private / reserved. */
function isPrivateIP(ip: string): boolean {
  return isPrivateIPv4(ip) || isPrivateIPv6(ip);
}

/**
 * Resolve a hostname to ALL IP addresses (v4 and v6) and check whether ANY
 * of them point to a private or reserved network.
 *
 * If resolution fails we allow the request through (the subsequent fetch will
 * fail on its own).
 */
async function isPrivateHost(hostname: string): Promise<boolean> {
  try {
    const result = await dnsLookup(hostname, { all: true });
    for (const entry of result) {
      if (isPrivateIP(entry.address)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Exact‑match set of well‑known private hostnames (no prefix matching). */
const PRIVATE_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "0.0.0.0",
  "::1",
  "::",
]);

/** Only http:// and https:// are allowed as PDF source protocols. */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Content‑type prefixes that are considered safe to serve as a PDF.
 * We are lenient because origin servers may send content-types such as
 * application/pdf, application/octet-stream or binary/octet-stream.
 */
const SAFE_CONTENT_TYPE_PREFIXES = [
  "application/pdf",
  "application/octet-stream",
  "binary/octet-stream",
  "application/x-pdf",
  "application/x-bzpdf",
  "application/x-gzpdf",
];

function isSafeContentType(contentType: string): boolean {
  const lower = contentType.toLowerCase().trim();
  return SAFE_CONTENT_TYPE_PREFIXES.some((p) => lower.startsWith(p));
}

/**
 * Proxy endpoint that serves a PDF through the server to hide the original URL.
 *
 * Only serves resources where `preventDownload` is true. Fetches the PDF from the
 * original URL and returns it with `Content-Disposition: inline` and anti-cache
 * headers, so the browser renders it in its PDF viewer without exposing the
 * direct download link.
 *
 * Query params:
 *   - type: Resource type ("syllabus" | "questionPaper" | "textbook")
 *   - id:   Resource ID
 *
 * @returns The PDF binary with appropriate headers, or a JSON error message.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json(
        { message: "Missing required query params: type, id" },
        { status: 400 },
      );
    }

    let pdfUrl: string | null = null;

    // Look up the resource and verify preventDownload is true
    switch (type) {
      case "syllabus": {
        const syllabus = await prisma.syllabus.findUnique({ where: { id } });
        if (!syllabus) {
          return NextResponse.json(
            { message: "Syllabus not found." },
            { status: 404 },
          );
        }
        pdfUrl = syllabus.preventDownload ? syllabus.pdfUrl : null;
        break;
      }
      case "questionPaper": {
        const qp = await prisma.questionPaper.findUnique({ where: { id } });
        if (!qp) {
          return NextResponse.json(
            { message: "Question paper not found." },
            { status: 404 },
          );
        }
        pdfUrl = qp.preventDownload ? qp.hyperlink : null;
        break;
      }
      case "textbook": {
        const textbook = await prisma.textbook.findUnique({ where: { id } });
        if (!textbook) {
          return NextResponse.json(
            { message: "Textbook not found." },
            { status: 404 },
          );
        }
        pdfUrl = textbook.preventDownload ? textbook.hyperlink : null;
        break;
      }
      default:
        return NextResponse.json(
          { message: `Unknown resource type: ${type}` },
          { status: 400 },
        );
    }

    if (!pdfUrl) {
      return NextResponse.json(
        {
          message:
            "This resource does not have download prevention enabled or has no PDF URL.",
        },
        { status: 403 },
      );
    }

    // --- URL validation & SSRF protection ---

    // 1. Strict protocol validation — only http:// and https:// allowed
    let parsedUrl;
    try {
      parsedUrl = new URL(pdfUrl);
    } catch {
      console.error(`Failed to parse PDF URL: ${pdfUrl}`);
      return NextResponse.json(
        { message: "Invalid PDF URL." },
        { status: 400 },
      );
    }

    if (!ALLOWED_PROTOCOLS.has(parsedUrl.protocol)) {
      console.error(
        `Blocked URL with disallowed protocol "${parsedUrl.protocol}": ${pdfUrl}`,
      );
      return NextResponse.json(
        { message: "Invalid PDF URL protocol." },
        { status: 400 },
      );
    }

    // Ensure HTTPS
    const secureUrl =
      parsedUrl.protocol === "http:"
        ? pdfUrl.replace("http://", "https://")
        : pdfUrl;

    const hostname = parsedUrl.hostname.toLowerCase();

    // 2. Quick exact‑match check for well‑known private hostnames
    if (PRIVATE_HOSTNAMES.has(hostname)) {
      console.error(`Blocked SSRF attempt — private hostname: ${secureUrl}`);
      return NextResponse.json(
        { message: "Access to internal resources is not allowed." },
        { status: 403 },
      );
    }

    // 3. For literal IP addresses (v4 or v6), check private ranges directly
    if (
      (isIPv4(hostname) && isPrivateIPv4(hostname)) ||
      (isIPv6(hostname) && isPrivateIPv6(hostname))
    ) {
      console.error(`Blocked SSRF attempt — private IP: ${secureUrl}`);
      return NextResponse.json(
        { message: "Access to internal resources is not allowed." },
        { status: 403 },
      );
    }

    // 4. For named hostnames (non‑IP), resolve via DNS and verify that
    //    none of the resolved addresses are private.
    if (
      !isIPv4(hostname) &&
      !isIPv6(hostname) &&
      (await isPrivateHost(hostname))
    ) {
      console.error(
        `Blocked SSRF attempt — hostname resolves to private IP: ${secureUrl}`,
      );
      return NextResponse.json(
        { message: "Access to internal resources is not allowed." },
        { status: 403 },
      );
    }

    // Fetch the PDF from the original source with a 15-second timeout
    const pdfResponse = await fetch(secureUrl, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PDFProxy/1.0)",
      },
    });

    if (!pdfResponse.ok) {
      console.error(
        `Failed to fetch PDF from ${secureUrl}: ${pdfResponse.status}`,
      );
      return NextResponse.json(
        { message: "Failed to fetch the PDF from the source." },
        { status: 502 },
      );
    }

    // 5. Content‑type validation — reject non‑PDF content to prevent XSS
    const contentType = pdfResponse.headers.get("content-type") || "";
    if (!isSafeContentType(contentType)) {
      console.error(
        `Blocked non‑PDF content type "${contentType}" from: ${secureUrl}`,
      );
      return NextResponse.json(
        { message: "Invalid content type received from source." },
        { status: 502 },
      );
    }

    // Stream the PDF body directly to avoid buffering the entire file in memory
    return new NextResponse(pdfResponse.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": 'inline; filename="document.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error in PDF proxy:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
