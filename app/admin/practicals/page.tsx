import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PracticalCard from "@/components/admin/practical-card";

export default async function AdminPracticalsPage() {
  const practicals = await prisma.practical.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Practicals</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/practicals/new">New Practical</Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {practicals.map((practical) => (
          <PracticalCard key={practical.id} practical={practical} />
        ))}
      </div>
    </div>
  );
}