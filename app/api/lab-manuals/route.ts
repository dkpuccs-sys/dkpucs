import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const labManuals = await prisma.labManual.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(labManuals);
}

export async function POST(req: Request) {
  const { title, description, difficulty, language, level, content } = await req.json();
  const labManual = await prisma.labManual.create({
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
