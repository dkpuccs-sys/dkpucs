import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const qps = await prisma.questionPaper.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(qps);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return NextResponse.json({ message: "Failed to fetch question papers." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { year, subject, hyperlink } = await req.json();
    const qp = await prisma.questionPaper.create({
      data: {
        year,
        subject,
        hyperlink,
      },
    });
    return NextResponse.json(qp, { status: 201 });
  } catch (error) {
    console.error("Error creating question paper:", error);
    return NextResponse.json({ message: "Failed to create question paper." }, { status: 500 });
  }
}
