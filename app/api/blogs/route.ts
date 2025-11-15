
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const blogs = await prisma.blog.findMany();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const { title, content, author, level } = await req.json();
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      author,
      level,
    },
  });
  return NextResponse.json(blog);
}
