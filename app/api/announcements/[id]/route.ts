
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(announcement);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const announcement = await prisma.announcement.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(announcement);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const announcement = await prisma.announcement.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(announcement);
}
