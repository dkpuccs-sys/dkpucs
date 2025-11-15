
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(announcement);
}
