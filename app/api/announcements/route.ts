
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
  return NextResponse.json(announcement);
}
