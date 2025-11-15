import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SyllabusCard from "@/components/admin/syllabus-card";

export default async function AdminSyllabusPage() {
  const syllabusItems = await prisma.syllabus.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Syllabus</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/syllabus/new">New Syllabus</Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {syllabusItems.map((syllabus) => (
          <SyllabusCard key={syllabus.id} syllabus={syllabus} />
        ))}
      </div>
    </div>
  );
}
