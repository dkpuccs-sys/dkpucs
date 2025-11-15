"use server"

import prisma from "./prisma"

export async function getTextbooks() {
  try {
    const textbooks = await prisma.textbook.findMany()
    return textbooks
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch textbooks.")
  }
}

export async function getSyllabus() {
  try {
    const syllabus = await prisma.syllabus.findMany()
    return syllabus
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch syllabus.")
  }
}

export async function getQuestionPapers() {
  try {
    const questionPapers = await prisma.questionPaper.findMany()
    return questionPapers
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch question papers.")
  }
}

export async function getBlogs(skip: number = 0, take: number = 10, levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const blogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
    return blogs;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch blogs.");
  }
}

export async function getTotalBlogsCount(levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const count = await prisma.blog.count({
      where: whereClause,
    });
    return count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total blogs count.");
  }
}

export async function getPracticals(skip: number = 0, take: number = 10, levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const practicals = await prisma.practical.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
    return practicals;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch practicals.");
  }
}

export async function getTotalPracticalsCount(levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const count = await prisma.practical.count({
      where: whereClause,
    });
    return count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total practicals count.");
  }
}

export async function getDiscussions() {
  try {
    const discussions = await prisma.discussion.findMany()
    return discussions
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch discussions.")
  }
}

export async function getPageViewStats(startDate?: Date, endDate?: Date) {
  try {
    // Build where clause for date filtering
    const whereClause: any = {};
    if (startDate || endDate) {
      whereClause.timestamp = {};
      if (startDate) {
        whereClause.timestamp.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereClause.timestamp.lte = end;
      }
    }

    const totalViews = await prisma.pageView.count({
      where: whereClause,
    });
    
    // Get unique users (count distinct sessionIds)
    const uniqueUsersResult = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        ...whereClause,
        sessionId: { not: null },
      },
    });
    const uniqueUsers = uniqueUsersResult.length;

    // Get device type stats
    const deviceStats = await prisma.pageView.groupBy({
      by: ["deviceType"],
      where: {
        ...whereClause,
        deviceType: { not: null },
      },
      _count: {
        deviceType: true,
      },
    });

    const mobileViews = deviceStats.find(d => d.deviceType === "mobile")?._count.deviceType || 0;
    const desktopViews = deviceStats.find(d => d.deviceType === "desktop")?._count.deviceType || 0;
    
    // Get views by path
    const viewsByPath = await prisma.pageView.groupBy({
      by: ["path"],
      where: whereClause,
      _count: {
        path: true,
      },
      orderBy: {
        _count: {
          path: "desc",
        },
      },
    });

    // Calculate date range for daily views
    const start = startDate ? new Date(startDate) : new Date();
    start.setDate(start.getDate() - 6); // Default to last 7 days
    start.setHours(0, 0, 0, 0);
    
    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    // Get views by day
    const dailyViews: { date: string; count: number }[] = [];
    const current = new Date(start);
    
    while (current <= end) {
      const dayStart = new Date(current);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(current);
      dayEnd.setHours(23, 59, 59, 999);
      
      const count = await prisma.pageView.count({
        where: {
          ...whereClause,
          timestamp: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });
      
      dailyViews.push({
        date: dayStart.toISOString().split("T")[0],
        count,
      });
      
      current.setDate(current.getDate() + 1);
    }

    // Get top 10 most viewed pages
    const topPages = viewsByPath.slice(0, 10).map((item) => ({
      path: item.path,
      views: item._count.path,
    }));

    // Calculate views for different periods if no date filter
    let viewsLast7Days = 0;
    let viewsLast30Days = 0;

    if (!startDate && !endDate) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      viewsLast7Days = await prisma.pageView.count({
        where: {
          timestamp: {
            gte: sevenDaysAgo,
          },
        },
      });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      viewsLast30Days = await prisma.pageView.count({
        where: {
          timestamp: {
            gte: thirtyDaysAgo,
          },
        },
      });
    }

    return {
      totalViews,
      uniqueUsers,
      viewsLast7Days,
      viewsLast30Days,
      mobileViews,
      desktopViews,
      dailyViews,
      topPages,
      viewsByPath: viewsByPath.map((item) => ({
        path: item.path,
        views: item._count.path,
      })),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch page view statistics.");
  }
}
