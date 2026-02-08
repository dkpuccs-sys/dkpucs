import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve all lab manuals ordered by creation date, newest first.
 *
 * @returns An array of lab manual records sorted with newest entries first.
 */
export async function GET() {
  const labManuals = await prisma.labManual.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(labManuals);
}

/**
 * Create a new lab manual from the request JSON and return the created record.
 *
 * Expects the request body to be JSON containing the mandatory fields: `title`, `description`, `difficulty`, `language`, `level`, and `content`.
 *
 * @param req - HTTP request whose JSON body contains the lab manual fields
 * @returns The created lab manual object on success; an error message object on failure (status 400 for missing fields, 401 for unauthorized, 500 for server error)
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, difficulty, language, level, content } = body;

    // Validation
    if (
      !title ||
      !description ||
      !difficulty ||
      !language ||
      !level ||
      !content
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const labManual = await prisma.labManual.create({
      data: {
        title,
        description,
        difficulty,
        language,
        level,
        content,
      },
    });

    revalidatePath("/lab-manuals");
    revalidatePath("/admin/lab-manuals");

    return NextResponse.json(labManual);
  } catch (error) {
    console.error("Error creating lab manual:", error);
    return NextResponse.json(
      { message: "Failed to create lab manual." },
      { status: 500 },
    );
  }
}
