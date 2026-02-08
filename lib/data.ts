"use server";

import prisma from "./prisma";
import { Prisma, SectionEnum } from "@prisma/client";

/**
 * Retrieves all textbook records from the database.
 *
 * @returns An array of textbook records.
 * @throws Throws an Error with message "Failed to fetch textbooks." if the database query fails.
 */
export async function getTextbooks() {
  try {
    const textbooks = await prisma.textbook.findMany();
    return textbooks;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch textbooks.");
  }
}

/**
 * Create a new textbook record in the database.
 *
 * @param data - Textbook creation data
 * @param data.title - The textbook title
 * @param data.author - The textbook author (optional)
 * @param data.hyperlink - URL pointing to the textbook resource
 * @param data.section - The section enum value categorizing the textbook
 * @param data.subject - The subject associated with the textbook
 * @returns The created textbook record
 */
export async function createTextbook(data: {
  title: string;
  author?: string;
  hyperlink: string;
  section: SectionEnum;
  subject: string;
}) {
  try {
    const textbook = await prisma.textbook.create({ data });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create textbook.");
  }
}

/**
 * Fetches a textbook record by its identifier.
 *
 * @param id - The textbook's unique identifier.
 * @returns The textbook record for the given `id`, or `null` if no matching record exists.
 * @throws Error when the database query fails.
 */
export async function getTextbookById(id: string) {
  try {
    const textbook = await prisma.textbook.findUnique({ where: { id } });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch textbook with ID ${id}.`);
  }
}

/**
 * Updates the textbook identified by `id` with the provided fields.
 *
 * @param id - The ID of the textbook to update
 * @param data - Partial textbook fields to update; any of `title`, `author`, `hyperlink`, `section`, or `subject` may be provided
 * @returns The updated textbook record
 * @throws Error if the update fails (for example, if the record does not exist or a database error occurs)
 */
export async function updateTextbook(
  id: string,
  data: {
    title?: string;
    author?: string;
    hyperlink?: string;
    section?: SectionEnum;
    subject?: string;
  },
) {
  try {
    const textbook = await prisma.textbook.update({ where: { id }, data });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update textbook with ID ${id}.`);
  }
}

/**
 * Delete a textbook record by its unique identifier.
 *
 * @param id - The unique identifier of the textbook to delete
 * @returns The deleted textbook record
 * @throws Error if the textbook cannot be deleted
 */
export async function deleteTextbook(id: string) {
  try {
    const textbook = await prisma.textbook.delete({ where: { id } });
    return textbook;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete textbook with ID ${id}.`);
  }
}

/**
 * Retrieves all syllabus records ordered by creation date from newest to oldest.
 *
 * @returns An array of syllabus records ordered by newest first.
 */
export async function getSyllabus() {
  try {
    const syllabus = await prisma.syllabus.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch syllabus.");
  }
}

/**
 * Creates a new syllabus record in the database.
 *
 * @param data - Object containing syllabus properties:
 *   - title: The syllabus title
 *   - description: The syllabus description
 *   - pdfUrl: URL to the syllabus PDF
 *   - level: Optional level or category
 * @returns The created syllabus record.
 * @throws Error if creating the syllabus fails.
 */
export async function createSyllabus(data: {
  title: string;
  description: string;
  pdfUrl: string;
  level?: string;
}) {
  try {
    const syllabus = await prisma.syllabus.create({ data });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create syllabus.");
  }
}

/**
 * Retrieve a syllabus record by its ID.
 *
 * @param id - The syllabus ID to fetch.
 * @returns The syllabus record if found, `null` otherwise.
 * @throws When a database error occurs while fetching the syllabus.
 */
export async function getSyllabusById(id: string) {
  try {
    const syllabus = await prisma.syllabus.findUnique({ where: { id } });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch syllabus with ID ${id}.`);
  }
}

/**
 * Update an existing syllabus record with the provided fields.
 *
 * @param id - The unique identifier of the syllabus to update
 * @param data - Partial syllabus fields to apply to the record
 * @param data.title - New title for the syllabus
 * @param data.description - New description for the syllabus
 * @param data.pdfUrl - New PDF URL for the syllabus
 * @param data.level - New educational level for the syllabus
 * @returns The updated syllabus record
 * @throws If the syllabus cannot be updated (for example, if it does not exist or a database error occurs)
 */
export async function updateSyllabus(
  id: string,
  data: {
    title?: string;
    description?: string;
    pdfUrl?: string;
    level?: string;
  },
) {
  try {
    const syllabus = await prisma.syllabus.update({ where: { id }, data });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update syllabus with ID ${id}.`);
  }
}

/**
 * Deletes a syllabus by its unique identifier.
 *
 * @param id - The unique identifier of the syllabus to delete
 * @returns The deleted syllabus record
 * @throws Error if deletion fails or the syllabus cannot be found
 */
export async function deleteSyllabus(id: string) {
  try {
    const syllabus = await prisma.syllabus.delete({ where: { id } });
    return syllabus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete syllabus with ID ${id}.`);
  }
}

/**
 * Fetches all question paper records from the database.
 *
 * @returns An array of question paper records
 * @throws Error if the database query fails
 */
export async function getQuestionPapers() {
  try {
    const questionPapers = await prisma.questionPaper.findMany();
    return questionPapers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch question papers.");
  }
}

/**
 * Create a new question paper record.
 *
 * @param data.year - The year the question paper belongs to
 * @param data.subject - The subject or course name
 * @param data.hyperlink - URL linking to the question paper resource
 * @returns The created question paper record
 */
export async function createQuestionPaper(data: {
  year: number;
  subject: string;
  hyperlink: string;
}) {
  try {
    const questionPaper = await prisma.questionPaper.create({ data });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create question paper.");
  }
}

/**
 * Retrieves a question paper by its identifier.
 *
 * @param id - The unique identifier of the question paper to fetch
 * @returns The question paper with the given `id`, or `null` if no matching record exists
 * @throws Error when the database query fails
 */
export async function getQuestionPaperById(id: string) {
  try {
    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id },
    });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch question paper with ID ${id}.`);
  }
}

/**
 * Update fields of a question paper identified by id.
 *
 * @param id - The ID of the question paper to update
 * @param data - Partial fields to update: `year`, `subject`, and/or `hyperlink`
 * @returns The updated question paper record
 * @throws Error if the update operation fails
 */
export async function updateQuestionPaper(
  id: string,
  data: { year?: number; subject?: string; hyperlink?: string },
) {
  try {
    const questionPaper = await prisma.questionPaper.update({
      where: { id },
      data,
    });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update question paper with ID ${id}.`);
  }
}

/**
 * Deletes a question paper by its ID.
 *
 * @param id - The ID of the question paper to delete
 * @returns The deleted question paper record
 * @throws Error if the deletion fails
 */
export async function deleteQuestionPaper(id: string) {
  try {
    const questionPaper = await prisma.questionPaper.delete({ where: { id } });
    return questionPaper;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete question paper with ID ${id}.`);
  }
}

/**
 * Fetches paginated blog posts optionally filtered by level and ordered by newest first.
 *
 * @param skip - Number of records to skip (offset) for pagination
 * @param take - Maximum number of records to return (page size)
 * @param levelFilter - If provided, only returns blogs whose `level` matches this value
 * @returns An array of blog records matching the filter, ordered by `createdAt` descending
 * @throws Error when the database query fails
 */
export async function getBlogs(
  skip: number = 0,
  take: number = 10,
  levelFilter: string = "",
) {
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

/**
 * Compute the total number of blog records, optionally filtered by level.
 *
 * @param levelFilter - Optional level to filter blogs by; when empty, counts all blogs
 * @returns The number of blogs matching the optional `levelFilter`
 */
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

/**
 * Fetches a blog by its ID.
 *
 * @param id - The unique identifier of the blog to retrieve
 * @returns The blog record if found, `null` otherwise
 * @throws Error - If a database error occurs while fetching the blog
 */
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

/**
 * Retrieve a paginated list of lab manuals, optionally filtered by academic level.
 *
 * @param skip - Number of records to skip (pagination offset)
 * @param take - Number of records to return (page size)
 * @param levelFilter - If provided, only lab manuals with this `level` are returned
 * @returns An array of lab manual records ordered by `createdAt` descending
 * @throws Error when fetching lab manuals from the database fails
 */
export async function getLabManuals(
  skip: number = 0,
  take: number = 10,
  levelFilter: string = "",
) {
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

/**
 * Retrieve all blog records with only their `id` and `updatedAt` fields.
 *
 * @returns An array of objects, each containing `id` and `updatedAt` for a blog
 */
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

/**
 * Retrieves every lab manual's identifier and its last updated timestamp.
 *
 * @returns An array of objects each containing `id` and `updatedAt` for a lab manual
 */
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

/**
 * Aggregate page view metrics optionally scoped to a date range and with optional pagination for path grouping.
 *
 * When no `startDate`/`endDate` are provided, metrics default to the past 7 days and archived counts are included.
 *
 * @param startDate - Inclusive start date for metrics; when omitted with `endDate` omitted, defaults to 7 days ago.
 * @param endDate - Inclusive end date for metrics; when omitted but `startDate` is provided, defaults to now.
 * @param skip - Number of path groups to skip when paginating the grouped-by-path results.
 * @param take - Maximum number of path groups to return when paginating the grouped-by-path results (defaults to 50).
 * @returns An object with the following properties:
 * - `totalViews`: total number of page views (live + archived when no date range provided).
 * - `uniqueUsers`: number of distinct non-null session IDs in the scope.
 * - `viewsLast7Days`: views in the last 7 days (only when no explicit date range provided).
 * - `viewsLast30Days`: views in the last 30 days (only when no explicit date range provided).
 * - `dailyViews`: array of `{ date: string, count: number }` entries for each day in the range.
 * - `topPages`: array of top pages `{ path: string, views: number }` (top 10 overall, independent of pagination).
 * - `viewsByPath`: paginated array of `{ path: string, views: number }` ordered by views desc.
 * - `totalPaths`: total number of distinct paths in the scoped range.
 */
export async function getPageViewStats(
  startDate?: Date,
  endDate?: Date,
  skip?: number,
  take?: number,
) {
  try {
    const ARCHIVE_THRESHOLD = 500;
    const currentLivePageViewCount = await prisma.pageView.count();

    if (currentLivePageViewCount >= ARCHIVE_THRESHOLD) {
      await prisma.$transaction(async (tx) => {
        const countToArchive = await tx.pageView.count();
        if (countToArchive >= ARCHIVE_THRESHOLD) {
          await tx.archivedPageViewCount.create({
            data: {
              count: countToArchive,
              archivedAt: new Date(),
            },
          });
          await tx.pageView.deleteMany({});
        }
      });
    }

    const whereClause: Prisma.PageViewWhereInput = {};
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

    let totalArchivedViews = 0;
    if (!startDate && !endDate) {
      const archivedCounts = await prisma.archivedPageViewCount.aggregate({
        _sum: {
          count: true,
        },
      });
      totalArchivedViews = archivedCounts._sum.count || 0;
    }

    const totalViews = liveTotalViews + totalArchivedViews;
    const uniqueUsersResult = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        ...whereClause,
        sessionId: { not: null },
      },
    });
    const uniqueUsers = uniqueUsersResult.length;

    const DEFAULT_LIMIT = 50;
    const safeTake = take ?? DEFAULT_LIMIT;

    const [viewsByPath, totalPathsResult, globalTopPages] = await Promise.all([
      prisma.pageView.groupBy({
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
        skip,
        take: safeTake,
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        where: whereClause,
        _count: {
          path: true,
        },
      }),
      // Always fetch the true top 10, regardless of pagination skip/take
      prisma.pageView.groupBy({
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
        take: 10,
      }),
    ]);

    const totalPaths = totalPathsResult.length;
    const start = startDate ? new Date(startDate) : new Date();
    if (!startDate) {
      start.setDate(start.getDate() - 6);
    }
    start.setHours(0, 0, 0, 0);

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    // Validate date range
    if (start > end) {
      throw new Error(
        "Invalid date range: start date must be before or equal to end date.",
      );
    }

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const rangeDays =
      Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;
    const MAX_DAYS = 90;
    if (rangeDays > MAX_DAYS) {
      throw new Error("Date range too large for daily aggregation.");
    }

    const dailyPromises: Promise<{ date: string; count: number }>[] = [];
    const current = new Date(start);
    while (current <= end) {
      const dayStart = new Date(current);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(current);
      dayEnd.setHours(23, 59, 59, 999);
      const dateStr = dayStart.toISOString().split("T")[0];

      dailyPromises.push(
        prisma.pageView
          .count({
            where: {
              ...whereClause,
              timestamp: {
                gte: dayStart,
                lte: dayEnd,
              },
            },
          })
          .then((count) => ({ date: dateStr, count })),
      );
      current.setDate(current.getDate() + 1);
    }
    const dailyViews = await Promise.all(dailyPromises);

    const getPathCount = (item: any): number =>
      (item._count as { path: number })?.path ?? 0;

    const topPages = globalTopPages.map((item) => ({
      path: item.path,
      views: getPathCount(item),
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
        views: getPathCount(item),
      })),
      totalPaths,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch page view statistics.");
  }
}
