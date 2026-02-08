import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Fetches a question paper by route `id` and returns it as JSON.
 *
 * @param params - A promise resolving to an object with the route `id` parameter.
 * @returns The question paper JSON when found; a 404 JSON `{ message: "Question paper not found." }` if not found; or a 500 JSON `{ message: "Failed to fetch question paper." }` on error.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const qp = await prisma.questionPaper.findUnique({
      where: {
        id,
      },
    });
    if (!qp) {
      return NextResponse.json(
        { message: "Question paper not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(qp);
  } catch (error) {
    console.error("Error fetching question paper:", error);
    return NextResponse.json(
      { message: "Failed to fetch question paper." },
      { status: 500 },
    );
  }
}

/**
 * Update a question paper by its id using `year`, `subject`, and `hyperlink` from the request body.
 *
 * Reads `year`, `subject`, and `hyperlink` from the request JSON, requires an admin session to proceed, updates the matching question paper record, and revalidates the related public and admin cache paths.
 *
 * @param params - Promise that resolves to an object containing the `id` of the question paper to update
 * @returns The updated question paper object
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { year, subject, hyperlink } = body;

    if (!year || !subject || !hyperlink) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: year, subject, and hyperlink are required.",
        },
        { status: 400 },
      );
    }

    // Validate and sanitize year
    const parsedYear =
      typeof year === "string" ? parseInt(year, 10) : Number(year);
    if (!Number.isFinite(parsedYear) || !Number.isInteger(parsedYear)) {
      return NextResponse.json(
        { message: "Invalid year: must be a valid integer." },
        { status: 400 },
      );
    }

    const qp = await prisma.questionPaper.update({
      where: {
        id,
      },
      data: {
        year: parsedYear,
        subject,
        hyperlink,
      },
    });
    revalidatePath("/qps");
    revalidatePath(`/qps/${id}`);
    revalidatePath("/admin/qps");
    revalidatePath(`/admin/qps/${id}`);
    return NextResponse.json(qp);
  } catch (error) {
    console.error("Error updating question paper:", error);
    return NextResponse.json(
      { message: "Failed to update question paper." },
      { status: 500 },
    );
  }
}

/**
 * Delete a question paper by ID and revalidate related cache paths.
 * Requires admin authentication.
 *
 * @param params - A promise that resolves to an object with `id`, the identifier of the question paper to delete.
 * @returns A JSON response containing a `message` string: `Question paper deleted successfully.` on success, or `Failed to delete question paper.` on failure with HTTP status 500.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.questionPaper.delete({
      where: {
        id,
      },
    });
    revalidatePath("/qps");
    revalidatePath(`/qps/${id}`);
    revalidatePath("/admin/qps");
    revalidatePath(`/admin/qps/${id}`);
    return NextResponse.json({
      message: "Question paper deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting question paper:", error);
    return NextResponse.json(
      { message: "Failed to delete question paper." },
      { status: 500 },
    );
  }
}
