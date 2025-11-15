"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface DailyViewsChartProps {
  data: { date: string; views: number }[];
}

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
};

export default function DailyViewsChart({ data }: DailyViewsChartProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="views" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

