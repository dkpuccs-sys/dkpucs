import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnnouncementCard from "@/components/admin/announcement-card";
import { EmptyState } from "@/components/ui/empty-state";
import { RefreshButton } from "@/components/admin/refresh-button";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Announcements</h1>
        <div className="flex gap-2">
          <RefreshButton path="/admin/announcements" />
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/announcements/new">New Announcement</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {announcements.length === 0 ? (
          <EmptyState
            title="No Announcements Yet"
            description="Create your first announcement to display here."
          />
        ) : (
          announcements.map((announcement: { id: string; title: string; content: string; isActive: boolean; createdAt: Date; updatedAt: Date; }) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        )}
      </div>
    </div>
  );
}