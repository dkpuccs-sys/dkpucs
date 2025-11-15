import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const syllabus = await prisma.syllabus.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    return NextResponse.json({ message: "Failed to fetch syllabus." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, pdfUrl, level } = await req.json();
    const syllabus = await prisma.syllabus.create({
      data: {
        title,
        description,
        pdfUrl,
        level,
      },
    });
    return NextResponse.json(syllabus, { status: 201 });
  } catch (error) {
    console.error("Error creating syllabus:", error);
    return NextResponse.json({ message: "Failed to create syllabus." }, { status: 500 });
  }
}
