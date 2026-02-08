import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieve a single blog post by its ID.
 *
 * @param req - Incoming request
 * @param params - Promise resolving to route parameters containing the `id` path parameter
 * @returns The blog record when found; otherwise a JSON response containing an error message and the corresponding HTTP status
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog." },
      { status: 500 },
    );
  }
}

/**
 * Update a blog post identified by the provided ID and revalidate related cache paths.
 * Requires admin authentication.
 *
 * @param req - Incoming request whose JSON body must include `title`, `content`, `author`, and `level`
 * @param params - A promise resolving to an object with the `id` of the blog to update
 * @returns The updated blog record
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
    const body = await req.json();
    const { title, content, author, level } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing required fields: title and content are required." },
        { status: 400 },
      );
    }

    // Check if exists
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        author,
        level,
      },
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}`);

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update blog." },
      { status: 500 },
    );
  }
}

/**
 * Deletes the blog identified by `id` and revalidates related cache paths.
 * Requires admin authentication.
 *
 * This handler removes the blog from the database, triggers revalidation for
 * the public and admin listing and detail pages, and returns a success message.
 *
 * @param req - Incoming request
 * @param params - A promise that resolves to an object containing the `id` of the blog to delete
 * @returns A JSON success message or an error message.
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
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    await prisma.blog.delete({
      where: {
        id,
      },
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}`);

    return NextResponse.json({ message: "Blog deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog." },
      { status: 500 },
    );
  }
}
