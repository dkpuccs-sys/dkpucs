import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const syllabus = await prisma.syllabus.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!syllabus) {
      return NextResponse.json({ message: "Syllabus not found." }, { status: 404 });
    }
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    return NextResponse.json({ message: "Failed to fetch syllabus." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description, pdfUrl, level } = await req.json();
    const syllabus = await prisma.syllabus.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        pdfUrl,
        level,
      },
    });
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("Error updating syllabus:", error);
    return NextResponse.json({ message: "Failed to update syllabus." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.syllabus.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Syllabus deleted successfully." });
  } catch (error) {
    console.error("Error deleting syllabus:", error);
    return NextResponse.json({ message: "Failed to delete syllabus." }, { status: 500 });
  }
}
