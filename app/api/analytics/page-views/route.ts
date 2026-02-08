import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Aggregate stored page views by path and date and return formatted analytics.
 *
 * Returns an array where each item contains the `path`, `dailyViews` (an array of `{ date, count }` objects) and `totalViews` for that path.
 *
 * @returns An array of objects with the shape `{ path: string, dailyViews: { date: string, count: number }[], totalViews: number }`
 */
export async function GET(req: NextRequest) {
  try {
    const pageViews = await prisma.pageView.findMany({
      orderBy: {
        timestamp: "asc",
      },
    });

    const aggregatedData: { [key: string]: { [date: string]: number } } = {};

    pageViews.forEach((view) => {
      const date = view.timestamp.toISOString().split("T")[0];
      if (!aggregatedData[view.path]) {
        aggregatedData[view.path] = {};
      }
      if (!aggregatedData[view.path][date]) {
        aggregatedData[view.path][date] = 0;
      }
      aggregatedData[view.path][date]++;
    });

    const formattedData = Object.entries(aggregatedData).map(
      ([path, dates]) => ({
        path,
        dailyViews: Object.entries(dates).map(([date, count]) => ({
          date,
          count,
        })),
        totalViews: Object.values(dates).reduce((sum, count) => sum + count, 0),
      }),
    );

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching page view analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch page view analytics" },
      { status: 500 },
    );
  }
}
