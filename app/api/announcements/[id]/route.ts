
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(announcement);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const announcement = await prisma.announcement.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      content,
    },
  });
  
  revalidatePath("/announcements");
  revalidatePath(`/announcements/${params.id}`);
  revalidatePath("/admin/announcements");
  revalidatePath(`/admin/announcements/${params.id}`);
  return NextResponse.json(announcement);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const announcement = await prisma.announcement.delete({
    where: {
      id: params.id,
    },
  });
  revalidatePath("/announcements");
  revalidatePath(`/announcements/${params.id}`);
  revalidatePath("/admin/announcements");
  revalidatePath(`/admin/announcements/${params.id}`);
  return NextResponse.json(announcement);
}
