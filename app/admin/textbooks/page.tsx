import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TextbookCard from "@/components/admin/textbook-card";
import { RefreshButton } from "@/components/admin/refresh-button";

export default async function AdminTextbooksPage() {
  const textbooks = await prisma.textbook.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Textbooks</h1>
        <div className="flex gap-2">
          <RefreshButton path="/admin/textbooks" />
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/textbooks/new">New Textbook</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {textbooks.map((textbook) => (
          <TextbookCard key={textbook.id} textbook={textbook} />
        ))}
      </div>
    </div>
  );
}
