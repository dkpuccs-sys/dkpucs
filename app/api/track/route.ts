
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function POST(req: NextRequest) {
  try {
    const { path, sessionId } = await req.json();
    const userAgent = req.headers.get('user-agent');


    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await prisma.pageView.create({
      data: {
        path,
        sessionId,

        userAgent,
      },
    });

    return NextResponse.json({ message: 'Page view tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 });
  }
}
