import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve a lab manual by id.
 *
 * @param req - Incoming request
 * @param params - A promise that resolves to an object containing the `id` of the lab manual to fetch
 * @returns The lab manual object if found; otherwise a JSON error response with status 404 when not found or 500 on server error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const labManual = await prisma.labManual.findUnique({
      where: {
        id,
      },
    });
    if (!labManual) {
      return NextResponse.json(
        { message: "Lab manual not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(labManual);
  } catch (error: any) {
    console.error("Error fetching lab manual:", error);
    return NextResponse.json(
      { message: "Failed to fetch lab manual." },
      { status: 500 },
    );
  }
}

/**
 * Update the lab manual specified by the route `id` using values from the request body.
 *
 * Requires an authenticated user with the "admin" role. After a successful update, revalidates the public and admin list and detail pages for the lab manual.
 *
 * @param req - Request whose JSON body must include `title`, `description`, `difficulty`, `language`, and `level`; optional `content` defaults to an empty array
 * @param params - A promise resolving to an object with the route `id` of the lab manual to update
 * @returns The updated lab manual record
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
    const { title, description, difficulty, language, level, content } = body;

    // Validation
    if (!title || !description || !difficulty || !language || !level) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    // Check if lab manual exists
    const existing = await prisma.labManual.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Lab manual not found." },
        { status: 404 },
      );
    }

    const labManual = await prisma.labManual.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        language,
        level,
        content: content || [],
      },
    });

    revalidatePath("/lab-manuals");
    revalidatePath(`/lab-manuals/${id}`);
    revalidatePath("/admin/lab-manuals");
    revalidatePath(`/admin/lab-manuals/${id}`);

    return NextResponse.json(labManual);
  } catch (error) {
    console.error("Error updating lab manual:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Delete the lab manual specified by the route `id` and revalidate affected lab-manual pages.
 *
 * @param params - A promise resolving to an object with the route `id` of the lab manual to delete
 * @returns A JSON response with a `message`. Success returns `message: "Lab manual deleted successfully."`. Possible statuses: 200 (success), 401 (unauthorized), 404 (not found), 500 (server error)
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

    // Check if lab manual exists
    const existing = await prisma.labManual.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Lab manual not found." },
        { status: 404 },
      );
    }

    await prisma.labManual.delete({
      where: {
        id,
      },
    });

    revalidatePath("/lab-manuals");
    revalidatePath(`/lab-manuals/${id}`);
    revalidatePath("/admin/lab-manuals");
    revalidatePath(`/admin/lab-manuals/${id}`);

    return NextResponse.json({ message: "Lab manual deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting lab manual:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
