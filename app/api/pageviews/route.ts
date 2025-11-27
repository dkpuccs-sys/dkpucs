import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path, sessionId, userAgent } = await req.json();
    
    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const pageView = await prisma.pageView.create({
      data: {
        path: path,
        sessionId: sessionId || null,

        userAgent: userAgent || null,
      },
    });

    return NextResponse.json(pageView);
  } catch (error) {
    console.error("Error creating page view:", error);
    return NextResponse.json(
      { error: "Failed to create page view" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};
    if (path) {
      where.path = path;
    }
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) {
        where.timestamp.gte = new Date(startDate);
      }
      if (endDate) {
        where.timestamp.lte = new Date(endDate);
      }
    }

    const pageViews = await prisma.pageView.findMany({
      where,
      orderBy: { timestamp: "desc" },
    });

    return NextResponse.json(pageViews);
  } catch (error) {
    console.error("Error fetching page views:", error);
    return NextResponse.json(
      { error: "Failed to fetch page views" },
      { status: 500 }
    );
  }
}