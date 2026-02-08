import { NextResponse } from "next/server";
import { getPageViewStats } from "@/lib/data";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Handle GET requests for page view analytics, accepting optional query parameters for filtering and pagination.
 *
 * Parses the following query parameters from the request URL and applies them when fetching statistics:
 * - `startDate`, `endDate`: ISO date strings to restrict the date range.
 * - `skip`, `take`: non-negative integers for pagination; `take` is capped at 500 if provided.
 *
 * @param req - Incoming HTTP request whose URL may contain the above query parameters
 * @returns A JSON response containing page view statistics on success; a JSON error object with HTTP status 400 if provided dates are invalid; a JSON error object with HTTP status 500 on other failures
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const skipParam = searchParams.get("skip");
    const takeParam = searchParams.get("take");

    // Strict ISO date regex (YYYY-MM-DD or full ISO)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/;

    const parseDate = (value: string | null) => {
      if (value === null) return undefined;
      if (value.trim() === "" || !isoDateRegex.test(value)) return null;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    };

    const parseNonNegativeInt = (value: string | null) => {
      if (value === null) return undefined;
      // Only digits allowed
      if (!/^\d+$/.test(value)) return undefined;
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 0 ? undefined : parsed;
    };

    const startDate = parseDate(startDateParam);
    const endDate = parseDate(endDateParam);
    const skip = parseNonNegativeInt(skipParam);
    const take = parseNonNegativeInt(takeParam);

    const MAX_TAKE = 500;
    const MAX_SKIP = 10000; // Define a reasonable MAX_SKIP
    const safeTake = take !== undefined ? Math.min(take, MAX_TAKE) : undefined;
    const safeSkip = skip !== undefined ? Math.min(skip, MAX_SKIP) : undefined;

    // Trigger 400 if param was provided but failed parsing (returned null)
    if (
      (startDateParam !== null && startDate === null) ||
      (endDateParam !== null && endDate === null)
    ) {
      return NextResponse.json(
        { error: "Invalid date format. Use ISO strings (e.g., YYYY-MM-DD)." },
        { status: 400 },
      );
    }

    const stats = await getPageViewStats(
      startDate || undefined,
      endDate || undefined,
      safeSkip,
      safeTake,
    );

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
