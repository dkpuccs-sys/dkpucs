import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/lab-manuals");
  revalidatePath(`/lab-manuals/${param.id}`);
  revalidatePath("/admin/lab-manuals");
  revalidatePath(`/admin/lab-manuals/${param.id}`);
  return NextResponse.json(labManual);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const param = await params
  const labManual = await prisma.labManual.delete({
    where: {
      id: param.id,
    },
  });
  revalidatePath("/lab-manuals");
  revalidatePath(`/lab-manuals/${param.id}`);
  revalidatePath("/admin/lab-manuals");
  revalidatePath(`/admin/lab-manuals/${param.id}`);
  return NextResponse.json(labManual);
}
