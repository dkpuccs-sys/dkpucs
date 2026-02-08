import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve a single announcement by its route `id`.
 *
 * @param req - Incoming request
 * @param params - Promise resolving to an object containing the route `id` of the announcement
 * @returns The announcement object matching `id`, or 404 if not found.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const announcement = await prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!announcement) {
      return NextResponse.json(
        { message: "Announcement not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Update an announcement identified by the route `id` with the provided `title` and `content`.
 * Requires admin authentication.
 *
 * Also revalidates cache for the public and admin announcements list and detail routes.
 *
 * @param req - HTTP request whose JSON body must include `title` and `content`.
 * @param params - Promise resolving to route parameters; must contain the announcement `id`.
 * @returns The updated announcement object.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, content } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    // Check if exists
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Announcement not found." },
        { status: 404 },
      );
    }

    const announcement = await prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    revalidatePath("/announcements");
    revalidatePath(`/announcements/${id}`);
    revalidatePath("/admin/announcements");
    revalidatePath(`/admin/announcements/${id}`);

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Delete the announcement identified by the route `id` and revalidate related announcement pages' cache.
 *
 * Requires the current session user to have the `admin` role.
 *
 * @param params - Promise resolving to route parameters; must contain `id` of the announcement to delete
 * @returns A JSON object with a `message` string indicating success or an error description
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if exists
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Announcement not found." },
        { status: 404 },
      );
    }

    await prisma.announcement.delete({
      where: {
        id,
      },
    });

    revalidatePath("/announcements");
    revalidatePath(`/announcements/${id}`);
    revalidatePath("/admin/announcements");
    revalidatePath(`/admin/announcements/${id}`);

    return NextResponse.json({ message: "Announcement deleted successfully." });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
