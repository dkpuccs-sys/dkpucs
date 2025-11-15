"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DailyViewsChart from "@/components/admin/daily-views-chart";
import DateRangePicker from "@/components/admin/date-range-picker";
import { Eye, TrendingUp, Calendar, FileText, Users, Smartphone, Laptop } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsStats {
  totalViews: number;
  uniqueUsers: number;
  viewsLast7Days: number;
  viewsLast30Days: number;
  mobileViews: number;
  desktopViews: number;
  dailyViews: { date: string; count: number }[];
  topPages: { path: string; views: number }[];
  viewsByPath: { path: string; views: number }[];
}

export default function AnalyticsDashboard({ initialStats }: { initialStats: AnalyticsStats }) {
  const [stats, setStats] = useState<AnalyticsStats>(initialStats);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const fetchStats = async (start?: Date, end?: Date) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (start) {
        params.append("startDate", start.toISOString());
      }
      if (end) {
        params.append("endDate", end.toISOString());
      }

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
  };

  useEffect(() => {
    if (startDate || endDate) {
      fetchStats(startDate, endDate);
    } else {
      setStats(initialStats);
    }
  }, [startDate, endDate]);

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const chartData = stats.dailyViews.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    views: item.count,
  }));

  const totalDeviceViews = stats.mobileViews + stats.desktopViews;
  const mobilePercentage = totalDeviceViews > 0 
    ? Math.round((stats.mobileViews / totalDeviceViews) * 100) 
    : 0;
  const desktopPercentage = totalDeviceViews > 0 
    ? Math.round((stats.desktopViews / totalDeviceViews) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Analytics Dashboard</h2>
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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time page views</p>
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
                <div className="text-2xl font-bold">{stats.uniqueUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Distinct sessions</p>
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
                <div className="text-2xl font-bold">{stats.viewsLast7Days.toLocaleString()}</div>
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
                <div className="text-2xl font-bold">{stats.viewsLast30Days.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Monthly views</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Device Statistics</CardTitle>
            <CardDescription>Views by device type</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Mobile</p>
                      <p className="text-sm text-muted-foreground">{stats.mobileViews.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{mobilePercentage}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Desktop</p>
                      <p className="text-sm text-muted-foreground">{stats.desktopViews.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{desktopPercentage}%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Active Pages</CardTitle>
            <CardDescription>Pages with views</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold">{stats.viewsByPath.length}</div>
                <p className="text-sm text-muted-foreground mt-2">Total pages tracked</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

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
                {stats.topPages.map((page: { path: string; views: number }, index: number) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{page.path}</code>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {page.views.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No page views recorded yet. Views will appear here once users start visiting pages.
            </p>
          )}
        </CardContent>
      </Card>

      {stats.viewsByPath.length > 10 && (
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
                    {stats.viewsByPath.map((page: { path: string; views: number }) => (
                      <TableRow key={page.path}>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{page.path}</code>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {page.views.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

