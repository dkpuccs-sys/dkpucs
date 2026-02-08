import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve a textbook by route `id` and return it as a JSON HTTP response.
 *
 * @param params - A promise resolving to an object with the route `id` string
 * @returns The textbook object when found; an object with `message: "Textbook not found."` and HTTP status 404 if not found; an object with `message: "Internal server error"` and HTTP status 500 on error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const textbook = await prisma.textbook.findUnique({
      where: {
        id,
      },
    });
    if (!textbook) {
      return NextResponse.json(
        { message: "Textbook not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(textbook);
  } catch (error) {
    console.error("Error fetching textbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Updates a textbook identified by ID with fields from the request body and revalidates affected paths.
 *
 * Only users with the `admin` role may perform this action. Returns 401 for unauthorized access, 400 if required fields are missing, 404 if the textbook does not exist, and 500 for internal errors.
 *
 * @param req - Request whose JSON body must include `title`, `author`, `hyperlink`, `section`, and `subject`
 * @param params - Promise resolving to an object containing the textbook `id` to update
 * @returns The updated textbook record as stored in the database
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
    const { title, author, hyperlink, section, subject } = body;

    // Validation
    if (!title || !author || !hyperlink || !section || !subject) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    // Check if textbook exists
    const existing = await prisma.textbook.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Textbook not found." },
        { status: 404 },
      );
    }

    const textbook = await prisma.textbook.update({
      where: {
        id,
      },
      data: {
        title,
        author,
        hyperlink,
        section,
        subject,
      },
    });

    revalidatePath("/textbooks");
    revalidatePath(`/textbooks/${id}`);
    revalidatePath("/admin/textbooks");
    revalidatePath(`/admin/textbooks/${id}`);

    return NextResponse.json(textbook);
  } catch (error) {
    console.error("Error updating textbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Delete the textbook specified by the route `id` and revalidate related textbook paths.
 *
 * @param params - A promise that resolves to an object containing the route `id` of the textbook to delete
 * @returns A JSON object with a `message` string; responses use status `200` for successful deletion, `401` for unauthorized, `404` if the textbook was not found, and `500` for internal server error
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

    // Check if textbook exists
    const existing = await prisma.textbook.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Textbook not found." },
        { status: 404 },
      );
    }

    await prisma.textbook.delete({
      where: {
        id,
      },
    });
    revalidatePath("/textbooks");
    revalidatePath(`/textbooks/${id}`);
    revalidatePath("/admin/textbooks");
    revalidatePath(`/admin/textbooks/${id}`);
    return NextResponse.json({ message: "Textbook deleted successfully." });
  } catch (error) {
    console.error("Error deleting textbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
