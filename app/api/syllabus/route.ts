import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieves all syllabus records ordered by creation time, newest first.
 *
 * @returns An array of syllabus records on success; on failure a JSON object `{ message: "Failed to fetch syllabus." }` is returned with HTTP status 500.
 */
export async function GET() {
  try {
    const syllabus = await prisma.syllabus.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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
 * Create a new syllabus record from the request JSON and revalidate related cache paths.
 * Requires admin authentication.
 *
 * @param req - HTTP request whose JSON body must include `title`, `description`, `pdfUrl`, and `level`
 * @returns A JSON response containing the created syllabus with HTTP status 201, or a JSON error message on failure
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body." },
        { status: 400 },
      );
    }
    const { title, description, pdfUrl, level } = body;

    // Validation
    if (!title || !description || !pdfUrl || !level) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const syllabus = await prisma.syllabus.create({
      data: {
        title,
        description,
        pdfUrl,
        level,
      },
    });

    revalidatePath("/syllabus");
    revalidatePath("/admin/syllabus");

    return NextResponse.json(syllabus, { status: 201 });
  } catch (error) {
    console.error("Error creating syllabus:", error);
    return NextResponse.json(
      { message: "Failed to create syllabus." },
      { status: 500 },
    );
  }
}
