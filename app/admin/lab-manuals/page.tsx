import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LabManualCard from "@/components/admin/lab-manual-card";
import { RefreshButton } from "@/components/admin/refresh-button";

/**
 * Render the admin "Lab Manuals" page with controls and a list of lab manuals.
 *
 * The list is displayed in descending order by creation date (newest first).
 *
 * @returns The React element containing the page header with refresh/new controls and a grid of LabManualCard entries.
 */
export default async function AdminLabManualsPage() {
  const labManuals = await prisma.labManual.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Lab Manuals</h1>
        <div className="flex gap-2">
          <RefreshButton path="/admin/lab-manuals" />
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/lab-manuals/new">New Lab Manual</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {labManuals.map((labManual) => (
          <LabManualCard key={labManual.id} labManual={labManual} />
        ))}
      </div>
    </div>
  );
}
