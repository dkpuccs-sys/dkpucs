
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

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<PageViewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/analytics/page-views");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data.");
        }
        const data: PageViewData[] = await response.json();
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnalytics();
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
                            <li key={daily.date}>{daily.date}: {daily.count} views</li>
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
