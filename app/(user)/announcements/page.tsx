import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getAnnouncements, getTotalAnnouncementsCount } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Stay updated with the latest announcements, events, and news from DKPUCS. Get notifications about workshops, seminars, hackathons, and community updates.",
  keywords: [
    "DKPUCS announcements",
    "college announcements",
    "coding club updates",
    "events",
    "workshops",
    "seminars",
    "hackathons",
    "news",
  ],
  openGraph: {
    title: "Announcements - DKPUCS",
    description:
      "Stay updated with the latest announcements and events from DKPUCS.",
    url: "https://dkpucs.vercel.app/announcements",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/announcements",
  },
};

interface AnnouncementsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 10;

/**
 * Render the announcements listing page, showing announcement cards or an empty state and paginated navigation.
 *
 * @param searchParams - A Promise that resolves to an object containing optional query parameters; `page` (string) is used to determine the current pagination page.
 * @returns The page's React element containing the announcements list or an empty state and pagination controls.
 */
export default async function AnnouncementsPage({
  searchParams,
}: AnnouncementsPageProps) {
  const para = await searchParams;
  const currentPage = Math.max(1, Number(para?.page) || 1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const announcements = await getAnnouncements(skip, ITEMS_PER_PAGE);
  const totalAnnouncements = await getTotalAnnouncementsCount();

  const totalPages = Math.ceil(totalAnnouncements / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Announcements</h1>
      <div className="grid gap-6">
        {announcements.length === 0 ? (
          <EmptyState
            title="No Announcements Yet"
            description="Stay tuned for updates! Announcements will appear here."
          />
        ) : (
          announcements.map(
            (announcement: {
              id: string;
              title: string;
              content: string;
              isActive: boolean;
              createdAt: Date;
              updatedAt: Date;
            }) => (
              <Card
                key={announcement.id}
                className="shadow-md border-2 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
              </Card>
            ),
          )
        )}
      </div>

      {totalAnnouncements > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-8 space-x-2">
          {currentPage === 1 ? (
            <Button variant="outline" disabled>
              Previous
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href={`/announcements?page=${currentPage - 1}`}>
                Previous
              </Link>
            </Button>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              asChild
              variant={currentPage === i + 1 ? "default" : "outline"}
            >
              <Link href={`/announcements?page=${i + 1}`}>{i + 1}</Link>
            </Button>
          ))}
          {currentPage === totalPages ? (
            <Button variant="outline" disabled>
              Next
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href={`/announcements?page=${currentPage + 1}`}>Next</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
