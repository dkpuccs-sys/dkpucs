import { getPracticals, getTotalPracticalsCount } from "@/lib/data" 
import { EmptyState } from "@/components/ui/empty-state"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Import Button for pagination

interface PracticalsPageProps {
  searchParams?: {
    level?: string;
    page?: string; // Add page search param
  }
}

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
]

const ITEMS_PER_PAGE = 10; // Define items per page

export default async function PracticalsPage({ searchParams }: PracticalsPageProps) {
  const para = await searchParams
  const currentPage = Number(para?.page) || 1;
  const levelFilter = searchParams?.level || "";
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  let practicals: any[] = []
  let totalPracticals = 0;
  try {
    practicals = await getPracticals(skip, ITEMS_PER_PAGE, levelFilter); // Pass skip, take, levelFilter
    totalPracticals = await getTotalPracticalsCount(levelFilter); // Get total count
  } catch (error) {
    console.error("Error fetching practicals:", error)
  }

  const totalPages = Math.ceil(totalPracticals / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Practicals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hands-on coding exercises to strengthen your programming skills and build real-world problem-solving
            abilities.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <span className="text-sm font-medium text-muted-foreground">Filter by level:</span>
          <div className="flex flex-wrap gap-2">
            {LEVEL_OPTIONS.map((opt) => {
              const isActive = levelFilter === opt.value
              const href = opt.value
                ? `/practicals?level=${encodeURIComponent(opt.value)}&page=1` // Reset page to 1 on filter change
                : "/practicals?page=1" // Reset page to 1
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
              )
            })}
          </div>
        </div>

        {practicals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicals.map((practical) => (
              <div
                key={practical.id}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                    {practical.difficulty || "Intermediate"}
                  </span>
                  {practical.level && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary">
                      {practical.level}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">{practical.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{practical.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{practical.language || "Python"}</span>
                  <a
                    href={practical.hyperlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 text-sm font-medium"
                  >
                    Start Coding
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No practicals available yet"
            description="Try changing the level filter or check back soon for more hands-on coding exercises."
          />
        )}

        {totalPracticals > ITEMS_PER_PAGE && ( // Render pagination only if more than 10 practicals
          <div className="flex justify-center mt-8 space-x-2">
            <Button asChild variant="outline" disabled={currentPage === 1}>
              <Link href={`/practicals?page=${currentPage - 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>Previous</Link>
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} asChild variant={currentPage === i + 1 ? "default" : "outline"}>
                <Link href={`/practicals?page=${i + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>{i + 1}</Link>
              </Button>
            ))}
            <Button asChild variant="outline" disabled={currentPage === totalPages}>
              <Link href={`/practicals?page=${currentPage + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>Next</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
