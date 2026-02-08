import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { getPageViewStats } from "@/lib/data";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";

/**
 * Display the admin analytics dashboard and enforce that only users with the "admin" role can access it.
 *
 * Redirects unauthenticated or non-admin users to the login page with a callback to `/admin`. Attempts to fetch
 * page view statistics and, if fetching fails, uses a default stats object with zeroed metrics and empty lists.
 *
 * @returns A React element rendering the analytics dashboard initialized with the fetched or default page view statistics.
 */
export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  if (!session || role !== "admin") {
    redirect("/login?callbackUrl=/admin");
  }

  let stats;
  try {
    stats = await getPageViewStats();
  } catch (error) {
    console.error("Error fetching stats:", error);
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
