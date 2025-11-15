import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { getPageViewStats } from "@/lib/data"
import AnalyticsDashboard from "@/components/admin/analytics-dashboard"

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as any)?.role

  if (!session || role !== "admin") {
    redirect("/login?callbackUrl=/admin")
  }

  let stats
  try {
    stats = await getPageViewStats()
  } catch (error) {
    console.error("Error fetching stats:", error)
    stats = {
      totalViews: 0,
      uniqueUsers: 0,
      viewsLast7Days: 0,
      viewsLast30Days: 0,
      mobileViews: 0,
      desktopViews: 0,
      dailyViews: [],
      topPages: [],
      viewsByPath: [],
    }
  }

  return <AnalyticsDashboard initialStats={stats} />
}
