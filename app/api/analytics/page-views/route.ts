
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const pageViews = await prisma.pageView.findMany({
      orderBy: {
        timestamp: 'asc',
      },
    });

    const aggregatedData: { [key: string]: { [date: string]: number } } = {};

    pageViews.forEach(view => {
      const date = view.timestamp.toISOString().split('T')[0]; 
      if (!aggregatedData[view.path]) {
        aggregatedData[view.path] = {};
      }
      if (!aggregatedData[view.path][date]) {
        aggregatedData[view.path][date] = 0;
      }
      aggregatedData[view.path][date]++;
    });

    const formattedData = Object.entries(aggregatedData).map(([path, dates]) => ({
      path,
      dailyViews: Object.entries(dates).map(([date, count]) => ({ date, count })),
      totalViews: Object.values(dates).reduce((sum, count) => sum + count, 0),
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Error fetching page view analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch page view analytics' }, { status: 500 });
  }
}
