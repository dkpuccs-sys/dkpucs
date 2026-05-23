import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getPageViewStats } from "@/lib/data";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";

/**
 * Render the admin analytics dashboard with server-side data fetching.
 *
 * Fetches page view statistics on the server, falling back to zeroed defaults on error,
 * then renders the `AnalyticsDashboard` client component which provides skeleton loading
 * states during subsequent data refreshes. Only accessible to authenticated admin users.
 *
 * @returns The analytics dashboard element with pre-loaded initial stats and skeleton-ready UI.
 */
export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "admin") {
    redirect("/login?callbackUrl=/admin/analytics");
  }

  let stats;
  try {
    stats = await getPageViewStats();
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    stats = {
      totalViews: 0,
      uniqueUsers: 0,
      viewsLast7Days: 0,
      viewsLast30Days: 0,
      dailyViews: [],
      topPages: [],
      viewsByPath: [],
      totalPaths: 0,
    };
  }

  return <AnalyticsDashboard initialStats={stats} />;
}
