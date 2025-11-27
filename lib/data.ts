"use server"

import prisma from "./prisma"
import { SectionEnum } from "@prisma/client"

export async function getTextbooks() {
  try {
    const textbooks = await prisma.textbook.findMany()
    return textbooks
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch textbooks.")
  }
}

export async function createTextbook(data: { title: string; author?: string; hyperlink: string; section: SectionEnum; subject: string }) {
  try {
    const textbook = await prisma.textbook.create({ data });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create textbook.");
  }
}

export async function getTextbookById(id: string) {
  try {
    const textbook = await prisma.textbook.findUnique({ where: { id } });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch textbook with ID ${id}.`);
  }
}

export async function updateTextbook(id: string, data: { title?: string; author?: string; hyperlink?: string; section?: SectionEnum; subject?: string }) {
  try {
    const textbook = await prisma.textbook.update({ where: { id }, data });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update textbook with ID ${id}.`);
  }
}

export async function deleteTextbook(id: string) {
  try {
    const textbook = await prisma.textbook.delete({ where: { id } });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete textbook with ID ${id}.`);
  }
}

export async function getSyllabus() {
  try {
    const syllabus = await prisma.syllabus.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return syllabus
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch syllabus.")
  }
}

export async function createSyllabus(data: { title: string; description: string; pdfUrl: string; level?: string }) {
  try {
    const syllabus = await prisma.syllabus.create({ data });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create syllabus.");
  }
}

export async function getSyllabusById(id: string) {
  try {
    const syllabus = await prisma.syllabus.findUnique({ where: { id } });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch syllabus with ID ${id}.`);
  }
}

export async function updateSyllabus(id: string, data: { title?: string; description?: string; pdfUrl?: string; level?: string }) {
  try {
    const syllabus = await prisma.syllabus.update({ where: { id }, data });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update syllabus with ID ${id}.`);
  }
}

export async function deleteSyllabus(id: string) {
  try {
    const syllabus = await prisma.syllabus.delete({ where: { id } });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete syllabus with ID ${id}.`);
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

export async function createQuestionPaper(data: { year: number; subject: string; hyperlink: string }) {
  try {
    const questionPaper = await prisma.questionPaper.create({ data });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create question paper.");
  }
}

export async function getQuestionPaperById(id: string) {
  try {
    const questionPaper = await prisma.questionPaper.findUnique({ where: { id } });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch question paper with ID ${id}.`);
  }
}

export async function updateQuestionPaper(id: string, data: { year?: number; subject?: string; hyperlink?: string }) {
  try {
    const questionPaper = await prisma.questionPaper.update({ where: { id }, data });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update question paper with ID ${id}.`);
  }
}

export async function deleteQuestionPaper(id: string) {
  try {
    const questionPaper = await prisma.questionPaper.delete({ where: { id } });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete question paper with ID ${id}.`);
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

export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    return blog;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch blog with ID ${id}.`);
  }
}

export async function getLabManuals(skip: number = 0, take: number = 10, levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const labManuals = await prisma.labManual.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
    return labManuals;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch lab manuals.");
  }
}

export async function getTotalLabManualsCount(levelFilter: string = "") {
  try {
    const whereClause = levelFilter ? { level: levelFilter } : {};
    const count = await prisma.labManual.count({
      where: whereClause,
    });
    return count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total lab manuals count.");
  }
}

export async function getLabManualById(id: string) {
  try {
    const labManual = await prisma.labManual.findUnique({
      where: { id },
    });
    return labManual;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch lab manual with ID ${id}.`);
  }
}

export async function getAnnouncements(skip: number = 0, take: number = 10) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: take,
    });
    return announcements;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch announcements.");
  }
}

export async function getTotalAnnouncementsCount() {
  try {
    const count = await prisma.announcement.count({
      where: {
        isActive: true,
      },
    });
    return count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total announcements count.");
  }
}

export async function getAllBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      select: { id: true, updatedAt: true },
    });
    return blogs;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all blogs.");
  }
}

export async function getAllLabManuals() {
  try {
    const labManuals = await prisma.labManual.findMany({
      select: { id: true, updatedAt: true },
    });
    return labManuals;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all lab manuals.");
  }
}

export async function getPageViewStats(startDate?: Date, endDate?: Date) {
  try {
    const ARCHIVE_THRESHOLD = 500;


    
    const currentLivePageViewCount = await prisma.pageView.count();


    
    if (currentLivePageViewCount >= ARCHIVE_THRESHOLD) {
      await prisma.archivedPageViewCount.create({
        data: {
          count: currentLivePageViewCount,
          archivedAt: new Date(),
        },
      });
      await prisma.pageView.deleteMany({}); 
    }

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

    
    const liveTotalViews = await prisma.pageView.count({
      where: whereClause,
    });

    
    const archivedCounts = await prisma.archivedPageViewCount.aggregate({
      _sum: {
        count: true,
      },
    });
    const totalArchivedViews = archivedCounts._sum.count || 0;

    const totalViews = liveTotalViews + totalArchivedViews;
    
    const uniqueUsersResult = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        ...whereClause,
        sessionId: { not: null },
      },
    });
    const uniqueUsers = uniqueUsersResult.length;

    

    
    
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

    
    const start = startDate ? new Date(startDate) : new Date();
    start.setDate(start.getDate() - 6); 
    start.setHours(0, 0, 0, 0);
    
    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    
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

    
    const topPages = viewsByPath.slice(0, 10).map((item) => ({
      path: item.path,
      views: item._count.path,
    }));

    
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
