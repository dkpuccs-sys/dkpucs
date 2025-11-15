import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const param = await params
  const labManual = await prisma.labManual.findUnique({
    where: {
      id: param.id,
    },
  });
  return NextResponse.json(labManual);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, description, difficulty, language, level, content } = await req.json();
  const param = await params
  const labManual = await prisma.labManual.update({
    where: {
      id: param.id,
    },
    data: {
      title,
      description,
      difficulty,
      language,
      level,
      content,
    },
  });
  return NextResponse.json(labManual);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const param = await params
  const labManual = await prisma.labManual.delete({
    where: {
      id: param.id,
    },
  });
  return NextResponse.json(labManual);
}
