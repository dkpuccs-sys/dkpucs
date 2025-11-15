
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, content, author, level } = await req.json();
  const blog = await prisma.blog.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      content,
      author,
      level,
    },
  });
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${params.id}`);
  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${params.id}`);
  return NextResponse.json(blog);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const blog = await prisma.blog.delete({
    where: {
      id: params.id,
    },
  });
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${params.id}`);
  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${params.id}`);
  return NextResponse.json(blog);
}
