import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve all blog posts ordered by creation date (newest first).
 *
 * @returns A JSON response containing an array of blog posts ordered newest first; on failure, a JSON error message with HTTP status 500.
 */
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs." },
      { status: 500 },
    );
  }
}

/**
 * Create a new blog post and trigger cache revalidation for blog listings.
 *
 * Requires an authenticated user with the `admin` role. Expects the request JSON
 * body to include `title`, `content`, `author`, and `level`.
 *
 * @param req - Request whose JSON body must include `title`, `content`, `author`, and `level`
 * @returns The created blog object on success; an error JSON object on failure
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, author, level } = body;

    if (!title || !content || !author || !level) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        author,
        level,
      },
    });

    revalidatePath("/blogs");
    revalidatePath("/admin/blogs");

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Failed to create blog." },
      { status: 500 },
    );
  }
}
