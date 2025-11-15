import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const practicals = await prisma.practical.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(practicals);
}

export async function POST(req: Request) {
  const { title, description, difficulty, language, level, hyperlink } = await req.json();
  const practical = await prisma.practical.create({
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
