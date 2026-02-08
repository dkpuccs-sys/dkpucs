import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve a syllabus by its id.
 *
 * @param params - A promise resolving to route parameters; must include `id`, the syllabus id to fetch.
 * @returns The syllabus object when found; otherwise a JSON object with a `message` describing the error (`404` if not found, `500` on failure).
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const syllabus = await prisma.syllabus.findUnique({
      where: {
        id,
      },
    });
    if (!syllabus) {
      return NextResponse.json(
        { message: "Syllabus not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    return NextResponse.json(
      { message: "Failed to fetch syllabus." },
      { status: 500 },
    );
  }
}

/**
 * Update an existing syllabus identified by its id.
 *
 * Requires an authenticated admin session; responds with 401 if the caller is not an admin.
 *
 * @param req - Request whose JSON body must contain `title`, `description`, `pdfUrl`, and `level`
 * @param params - Promise resolving to an object with the `id` of the syllabus to update
 * @returns The updated syllabus record
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    let body: any;
    try {
      body = await req.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { message: "Invalid JSON in request body." },
          { status: 400 },
        );
      }
      throw error;
    }

    const { title, description, pdfUrl, level } = body;

    // Validation
    if (!title || !description || !pdfUrl || !level) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    // Check if exists
    const existing = await prisma.syllabus.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Syllabus not found." },
        { status: 404 },
      );
    }

    const syllabus = await prisma.syllabus.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        pdfUrl,
        level,
      },
    });
    revalidatePath("/syllabus");
    revalidatePath(`/syllabus/${id}`);
    revalidatePath("/admin/syllabus");
    revalidatePath(`/admin/syllabus/${id}`);
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("Error updating syllabus:", error);
    return NextResponse.json(
      { message: "Failed to update syllabus." },
      { status: 500 },
    );
  }
}

/**
 * Delete the syllabus identified by the route `id` and revalidate related cache paths.
 *
 * @param params - Promise that resolves to an object containing the syllabus `id`
 * @returns A JSON object with a `message` string: `"Syllabus deleted successfully."` on success; on error a JSON object with an error `message`
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if exists
    const existing = await prisma.syllabus.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Syllabus not found." },
        { status: 404 },
      );
    }

    await prisma.syllabus.delete({
      where: {
        id,
      },
    });
    revalidatePath("/syllabus");
    revalidatePath(`/syllabus/${id}`);
    revalidatePath("/admin/syllabus");
    revalidatePath(`/admin/syllabus/${id}`);
    return NextResponse.json({ message: "Syllabus deleted successfully." });
  } catch (error) {
    console.error("Error deleting syllabus:", error);
    return NextResponse.json(
      { message: "Failed to delete syllabus." },
      { status: 500 },
    );
  }
}
