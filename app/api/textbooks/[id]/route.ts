import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const textbook = await prisma.textbook.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!textbook) {
      return NextResponse.json({ message: "Textbook not found." }, { status: 404 });
    }
    return NextResponse.json(textbook);
  } catch (error) {
    console.error("Error fetching textbook:", error);
    return NextResponse.json({ message: "Failed to fetch textbook." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, author, hyperlink, section, subject } = await req.json();
    const textbook = await prisma.textbook.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        author,
        hyperlink,
        section,
        subject,
      },
    });
    return NextResponse.json(textbook);
  } catch (error) {
    console.error("Error updating textbook:", error);
    return NextResponse.json({ message: "Failed to update textbook." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.textbook.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Textbook deleted successfully." });
  } catch (error) {
    console.error("Error deleting textbook:", error);
    return NextResponse.json({ message: "Failed to delete textbook." }, { status: 500 });
  }
}
