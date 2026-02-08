import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Create a new page view record from the request body.
 *
 * Expects the request JSON to include a required `path` and optional `sessionId` and `userAgent`.
 *
 * @param req - Incoming Request whose JSON body must include `path` and may include `sessionId` and `userAgent`
 * @returns The created page view record. On error returns an object with an `error` message.
 */
export async function POST(req: Request) {
  try {
    const { path, sessionId, userAgent } = await req.json();

    if (typeof path !== "string" || path.trim().length === 0) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }
    const normalizedPath = path.trim();

    const pageView = await prisma.pageView.create({
      data: {
        path: normalizedPath,
        sessionId: typeof sessionId === "string" ? sessionId : null,
        userAgent: typeof userAgent === "string" ? userAgent : null,
      },
    });

    return NextResponse.json(pageView);
  } catch (error) {
    console.error("Error creating page view:", error);
    return NextResponse.json(
      { error: "Failed to create page view" },
      { status: 500 },
    );
  }
}

/**
 * Retrieve page view records with optional filters and pagination.
 *
 * Supports these query parameters:
 * - `path`: exact path to filter by
 * - `startDate` / `endDate`: ISO dates to filter `timestamp` inclusively
 * - `skip`: number of records to skip (pagination)
 * - `take`: number of records to return (clamped to 1–500 when provided)
 *
 * @returns An object containing `pageViews` (array of matching records ordered by `timestamp` desc) and `pagination` (`total`, `skip`, `take`). On failure, returns a JSON error object with HTTP status 500.
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const skipStr = searchParams.get("skip");
    const takeStr = searchParams.get("take");

    // Skip/Take validation
    let skip: number | undefined;
    if (skipStr !== null) {
      skip = parseInt(skipStr, 10);
      if (isNaN(skip) || skip < 0) {
        return NextResponse.json(
          { message: "Invalid skip parameter." },
          { status: 400 },
        );
      }
    }

    let take: number | undefined;
    if (takeStr !== null) {
      take = parseInt(takeStr, 10);
      if (isNaN(take) || take < 1 || take > 500) {
        return NextResponse.json(
          { message: "Invalid take parameter (must be between 1 and 500)." },
          { status: 400 },
        );
      }
    }

    const where: any = {};
    if (path) {
      where.path = path;
    }

    // Date validation
    if (startDateParam || endDateParam) {
      where.timestamp = {};
      let start: Date | undefined;
      let end: Date | undefined;

      if (startDateParam) {
        start = new Date(startDateParam);
        if (isNaN(start.getTime())) {
          return NextResponse.json(
            { message: "Invalid startDate format." },
            { status: 400 },
          );
        }
        where.timestamp.gte = start;
      }
      if (endDateParam) {
        end = new Date(endDateParam);
        if (isNaN(end.getTime())) {
          return NextResponse.json(
            { message: "Invalid endDate format." },
            { status: 400 },
          );
        }
        where.timestamp.lte = end;
      }

      // Validate date range
      if (start && end && start.getTime() > end.getTime()) {
        return NextResponse.json(
          { message: "startDate must be earlier than or equal to endDate." },
          { status: 400 },
        );
      }
    }

    const [pageViews, total] = await Promise.all([
      prisma.pageView.findMany({
        where,
        orderBy: { timestamp: "desc" },
        skip,
        take,
      }),
      prisma.pageView.count({ where }),
    ]);

    return NextResponse.json({
      pageViews,
      pagination: {
        total,
        skip: skip || 0,
        take: take || pageViews.length,
      },
    });
  } catch (error) {
    console.error("Error fetching page views:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
