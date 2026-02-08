import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieves all announcements sorted by creation date (newest first).
 *
 * @returns A JSON response with the list of announcements.
 */
export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { message: "Failed to fetch announcements." },
      { status: 500 },
    );
  }
}

/**
 * Creates a new announcement for users with the "admin" role.
 *
 * @param req - Request whose JSON body must include `title` and `content` strings
 * @returns On success, the created announcement object with HTTP status 201; on failure, a JSON error message with an appropriate HTTP status (`400` for missing fields, `401` for unauthorized, `500` for server errors)
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
      },
    });

    revalidatePath("/announcements");
    revalidatePath("/admin/announcements");

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { message: "Failed to create announcement." },
      { status: 500 },
    );
  }
}
