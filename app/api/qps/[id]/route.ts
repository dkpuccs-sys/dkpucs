import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const qp = await prisma.questionPaper.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!qp) {
      return NextResponse.json({ message: "Question paper not found." }, { status: 404 });
    }
    return NextResponse.json(qp);
  } catch (error) {
    console.error("Error fetching question paper:", error);
    return NextResponse.json({ message: "Failed to fetch question paper." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { year, subject, hyperlink } = await req.json();
    const qp = await prisma.questionPaper.update({
      where: {
        id: params.id,
      },
      data: {
        year,
        subject,
        hyperlink,
      },
    });
    revalidatePath("/qps");
    revalidatePath(`/qps/${params.id}`);
    revalidatePath("/admin/qps");
    revalidatePath(`/admin/qps/${params.id}`);
    return NextResponse.json(qp);
  } catch (error) {
    console.error("Error updating question paper:", error);
    return NextResponse.json({ message: "Failed to update question paper." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.questionPaper.delete({
      where: {
        id: params.id,
      },
    });
    revalidatePath("/qps");
    revalidatePath(`/qps/${params.id}`);
    revalidatePath("/admin/qps");
    revalidatePath(`/admin/qps/${params.id}`);
    return NextResponse.json({ message: "Question paper deleted successfully." });
  } catch (error) {
    console.error("Error deleting question paper:", error);
    return NextResponse.json({ message: "Failed to delete question paper." }, { status: 500 });
  }
}
