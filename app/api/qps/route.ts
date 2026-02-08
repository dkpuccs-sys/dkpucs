import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve all question papers ordered by creation date (newest first).
 *
 * Returns the list of question papers on success. On failure returns a 500 JSON response with `{ message: "Failed to fetch question papers." }`.
 *
 * @returns An array of question paper records ordered by `createdAt` descending, or a 500 error payload `{ message: "Failed to fetch question papers." }`.
 */
export async function GET() {
  try {
    const qps = await prisma.questionPaper.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(qps);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return NextResponse.json(
      { message: "Failed to fetch question papers." },
      { status: 500 },
    );
  }
}

/**
 * Create a new question paper from the request body and revalidate the `/qps` and `/admin/qps` cache paths.
 *
 * @param req - HTTP request whose JSON body must include `year` (number or string), `subject` (string), and `hyperlink` (string)
 * @returns The created question paper record on success; a JSON error object with a `message` property on failure
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session?.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

    const qp = await prisma.questionPaper.create({
      data: {
        year: typeof year === "string" ? parseInt(year, 10) : year,
        subject,
        hyperlink,
      },
    });
    revalidatePath("/qps");
    revalidatePath("/admin/qps");
    return NextResponse.json(qp, { status: 201 });
  } catch (error) {
    console.error("Error creating question paper:", error);
    return NextResponse.json(
      { message: "Failed to create question paper." },
      { status: 500 },
    );
  }
}
