"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DailyViewsChart from "@/components/admin/daily-views-chart";
import DateRangePicker from "@/components/admin/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Eye, TrendingUp, Users } from "lucide-react";

interface AnalyticsStats {
  totalViews: number;
  uniqueUsers: number;
  viewsLast7Days: number;
  viewsLast30Days: number;
  dailyViews: { date: string; count: number }[];
  topPages: { path: string; views: number }[];
  viewsByPath: { path: string; views: number }[];
  totalPaths: number;
}

/**
 * Renders the analytics dashboard with summary cards, charts, and paginated page lists.
 *
 * Displays statistics from the provided initial data and automatically refetches stats when the selected date range or page changes.
 *
 * @param initialStats - Initial analytics snapshot used to populate cards, charts, and tables before remote data is loaded
 * @returns The analytics dashboard React element
 */
export default function AnalyticsDashboard({
  initialStats,
}: {
  initialStats: AnalyticsStats;
}) {
  const [stats, setStats] = useState<AnalyticsStats>(initialStats);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchStats = useCallback(
    async (start?: Date, end?: Date, page: number = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (start) {
          params.append("startDate", start.toISOString());
        }
        if (end) {
          params.append("endDate", end.toISOString());
        }
        params.append("skip", ((page - 1) * itemsPerPage).toString());
        params.append("take", itemsPerPage.toString());
        const response = await fetch(`/api/analytics?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchStats(startDate, endDate, currentPage);
  }, [startDate, endDate, currentPage, fetchStats]);

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const chartData =
    stats.dailyViews.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      views: item.count,
    })) || [];
  const totalPages = Math.ceil(stats.totalPaths / itemsPerPage);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview of page views and site statistics
          </p>
        </div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClear={handleClearDates}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time page views
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats.uniqueUsers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Distinct sessions
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats.viewsLast7Days.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Recent activity</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats.viewsLast30Days.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Monthly views</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pages</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalPaths}</div>
                <p className="text-xs text-muted-foreground">
                  Total pages tracked
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Page Views Distribution</CardTitle>
            <CardDescription>Top 8 pages by view count</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : stats.topPages.length > 0 ? (
              <div className="space-y-3">
                {(() => {
                  const maxViews = Math.max(
                    ...stats.topPages.map((p: any) => p.views),
                  );
                  const colors = [
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-emerald-500",
                    "bg-amber-500",
                    "bg-rose-500",
                    "bg-cyan-500",
                    "bg-pink-500",
                    "bg-teal-500",
                  ];

                  return stats.topPages
                    .slice(0, 8)
                    .map(
                      (
                        page: { path: string; views: number },
                        index: number,
                      ) => {
                        const percentage = (page.views / maxViews) * 100;

                        return (
                          <div key={page.path} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span
                                className="font-medium truncate max-w-[60%]"
                                title={page.path}
                              >
                                {page.path.length > 30
                                  ? `${page.path.substring(0, 30)}...`
                                  : page.path}
                              </span>
                              <span className="font-bold">
                                {page.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  colors[index % colors.length]
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      },
                    );
                })()}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No page views recorded yet. Views will appear here once users
                start visiting pages.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : stats.topPages.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Page Path</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.topPages.map(
                    (page: { path: string; views: number }, index: number) => (
                      <TableRow key={page.path}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {page.path}
                          </code>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {page.views.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No page views recorded yet. Views will appear here once users
                start visiting pages.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Daily Views</CardTitle>
            <CardDescription>
              {startDate && endDate
                ? `Page views from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                : "Page views by day"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <DailyViewsChart data={chartData} />
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
            <CardDescription>Complete list of page views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page Path</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.viewsByPath.map(
                      (page: { path: string; views: number }) => (
                        <TableRow key={page.path}>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {page.path}
                            </code>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {page.views.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages || 1, prev + 1),
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
