
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from "next/cache";
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await prisma.pageView.create({
      data: {
        path,
      },
    });
    revalidatePath("/admin");

    return NextResponse.json({ message: 'Page view tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 });
  }
}
