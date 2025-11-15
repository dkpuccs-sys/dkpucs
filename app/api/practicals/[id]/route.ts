import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const practical = await prisma.practical.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(practical);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, description, difficulty, language, level, hyperlink } = await req.json();
  const practical = await prisma.practical.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      description,
      difficulty,
      language,
      level,
      hyperlink,
    },
  });
  return NextResponse.json(practical);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const practical = await prisma.practical.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(practical);
}
