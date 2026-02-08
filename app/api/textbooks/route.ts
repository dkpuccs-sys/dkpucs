import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

/**
 * Retrieve all textbook records ordered by newest first.
 *
 * @returns An array of textbook objects as JSON on success. On failure returns a JSON object `{ message: "Failed to fetch textbooks." }` with HTTP status 500.
 */
export async function GET() {
  try {
    const textbooks = await prisma.textbook.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(textbooks);
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    return NextResponse.json(
      { message: "Failed to fetch textbooks." },
      { status: 500 },
    );
  }
}

/**
 * Creates a new textbook record from the request body and invalidates cached textbook lists.
 *
 * @param req - HTTP request whose JSON body must include `title`, `author`, `hyperlink`, `section`, and `subject`
 * @returns The created textbook object on success; `{"message":"Failed to create textbook."}` on failure.
 */
export async function POST(req: Request) {
  try {
    const { title, author, hyperlink, section, subject } = await req.json();
    const textbook = await prisma.textbook.create({
      data: {
        title,
        author,
        hyperlink,
        section,
        subject,
      },
    });
    revalidatePath("/textbooks");
    revalidatePath("/admin/textbooks");
    return NextResponse.json(textbook, { status: 201 });
  } catch (error) {
    console.error("Error creating textbook:", error);
    return NextResponse.json(
      { message: "Failed to create textbook." },
      { status: 500 },
    );
  }
}
