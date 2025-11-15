import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QPCard from "@/components/admin/qp-card";
import { RefreshButton } from "@/components/admin/refresh-button";

export default async function AdminQPsPage() {
  const qps = await prisma.questionPaper.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Question Papers</h1>
        <div className="flex gap-2">
          <RefreshButton path="/admin/qps" />
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/qps/new">New Question Paper</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {qps.map((qp) => (
          <QPCard key={qp.id} qp={qp} />
        ))}
      </div>
    </div>
  );
}
