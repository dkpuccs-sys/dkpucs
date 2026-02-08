"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DailyView {
  date: string;
  count: number;
}

interface PageViewData {
  path: string;
  dailyViews: DailyView[];
  totalViews: number;
}

/**
 * Render the admin analytics dashboard showing website page view statistics.
 *
 * Fetches page view data on mount; while loading displays a centered spinner, on fetch error displays an error card with the message, and otherwise renders a table of pages with each page's total views and a per-day breakdown (or "N/A" when no daily data).
 *
 * @returns The React element for the admin analytics page.
 */
export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<PageViewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    /**
     * Fetches page view analytics from "/api/analytics/page-views" and updates component state.
     *
     * On success, updates `analyticsData` with the retrieved PageViewData[] and on failure sets `error` with the failure message. If the request is aborted, it returns silently without changing state. Always sets `isLoading` to false when finished.
     */
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/analytics/page-views", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data.");
        }
        const data: PageViewData[] = await response.json();
        setAnalyticsData(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnalytics();
    return () => controller.abort();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Spinner className="h-6 w-6" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Website Analytics - Page Views</CardTitle>
      </CardHeader>
      <CardContent>
        {analyticsData.length === 0 ? (
          <p>No page view data available yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead>Total Views</TableHead>
                  <TableHead>Daily Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-medium">{page.path}</TableCell>
                    <TableCell>{page.totalViews}</TableCell>
                    <TableCell>
                      {page.dailyViews.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {page.dailyViews.map((daily) => (
                            <li key={daily.date}>
                              {daily.date}: {daily.count} views
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
