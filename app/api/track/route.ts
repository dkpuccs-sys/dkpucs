
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function getDeviceType(userAgent: string | null): string {
  if (!userAgent) {
    return "Unknown";
  }
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "Tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

export async function POST(req: NextRequest) {
  try {
    const { path, sessionId } = await req.json();
    const userAgent = req.headers.get('user-agent');
    const deviceType = getDeviceType(userAgent);

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await prisma.pageView.create({
      data: {
        path,
        sessionId,
        deviceType,
        userAgent,
      },
    });

    return NextResponse.json({ message: 'Page view tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 });
  }
}
