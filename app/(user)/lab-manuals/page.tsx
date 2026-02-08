import { getLabManuals, getTotalLabManualsCount } from "@/lib/data";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Manuals",
  description:
    "Hands-on coding exercises and practical guides to strengthen your programming skills. Access lab manuals with solutions for Python, Java, C, and more languages.",
  keywords: [
    "lab manuals",
    "programming exercises",
    "coding practice",
    "DKPUCS",
    "hands-on coding",
    "practical guides",
    "Python exercises",
    "Java exercises",
    "programming lab",
  ],
  openGraph: {
    title: "Lab Manuals - DKPUCS",
    description:
      "Hands-on coding exercises and practical guides for programming.",
    url: "https://dkpucs.vercel.app/lab-manuals",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/lab-manuals",
  },
};

interface LabManualsPageProps {
  searchParams: Promise<{
    level?: string;
    page?: string;
  }>;
}

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
];

const ITEMS_PER_PAGE = 9;

/**
 * Render the Lab Manuals page with level filtering and paginated results.
 *
 * Renders filter controls for level, a paginated listing of lab manuals, an empty state when no results exist, and an error message if fetching fails.
 *
 * @param searchParams - A promise that resolves to an object with optional `level` and `page` strings used to initialize the level filter and current page.
 * @returns The JSX element for the Lab Manuals page containing filters, listings, empty/error states, and pagination controls.
 */
export default async function LabManualsPage({
  searchParams,
}: LabManualsPageProps) {
  const para = await searchParams;
  const requestedPage = Math.max(1, Number(para?.page) || 1);
  const levelFilter = para?.level || "";

  let labManuals: any[] = [];
  let totalLabManuals = 0;
  let totalPages = 0;
  let currentPage = requestedPage;
  let error: string | null = null;
  try {
    totalLabManuals = await getTotalLabManualsCount(levelFilter);
    totalPages = Math.max(1, Math.ceil(totalLabManuals / ITEMS_PER_PAGE));
    currentPage = Math.min(requestedPage, totalPages);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    labManuals = await getLabManuals(skip, ITEMS_PER_PAGE, levelFilter);
  } catch (err) {
    console.error("Error fetching lab manuals:", err);
    error = "Failed to load lab manuals. Please try again later.";
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 flex flex-col grow">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Lab Manuals
          </h1>
          <p className="text-lg text-muted-foreground max-w-7xl">
            Hands-on coding exercises to strengthen your programming skills and
            build real-world problem-solving abilities.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Filter by level:
          </span>
          <div className="flex flex-wrap gap-2">
            {LEVEL_OPTIONS.map((opt) => {
              const isActive = levelFilter === opt.value;
              const href = opt.value
                ? `/lab-manuals?level=${encodeURIComponent(opt.value)}&page=1`
                : "/lab-manuals?page=1";
              return (
                <Link
                  key={opt.value || "all"}
                  href={href}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grow">
          {error ? (
            <div className="p-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-center">
              {error}
            </div>
          ) : labManuals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labManuals.map((labManual) => (
                <div
                  key={labManual.id}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                      {labManual.difficulty || "Intermediate"}
                    </span>
                    {labManual.level && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary">
                        {labManual.level}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-foreground">
                    {labManual.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {labManual.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {labManual.language || "Python"}
                    </span>
                    <Link
                      href={`/lab-manuals/${labManual.id}`}
                      className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 text-sm font-medium"
                    >
                      View Lab Manual
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No lab manuals available yet"
              description="Try changing the level filter or check back soon for more hands-on coding exercises."
            />
          )}
        </div>

        {totalLabManuals > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-8 space-x-2">
            {currentPage === 1 ? (
              <Button variant="outline" disabled>
                Previous
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link
                  href={`/lab-manuals?page=${currentPage - 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
                >
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
                <Link
                  href={`/lab-manuals?page=${i + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
                >
                  {i + 1}
                </Link>
              </Button>
            ))}
            {currentPage === totalPages ? (
              <Button variant="outline" disabled>
                Next
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link
                  href={`/lab-manuals?page=${currentPage + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ""}`}
                >
                  Next
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
