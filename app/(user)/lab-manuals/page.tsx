import { getLabManuals, getTotalLabManualsCount } from "@/lib/data"
import { EmptyState } from "@/components/ui/empty-state"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lab Manuals",
  description: "Hands-on coding exercises and practical guides to strengthen your programming skills. Access lab manuals with solutions for Python, Java, C, and more languages.",
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
    description: "Hands-on coding exercises and practical guides for programming.",
    url: "https://dkpucs.vercel.app/lab-manuals",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/lab-manuals",
  },
}

interface LabManualsPageProps {
  searchParams?: {
    level?: string;
    page?: string; 
  }
}

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
]

const ITEMS_PER_PAGE = 9; 

export default async function LabManualsPage({ searchParams }: LabManualsPageProps) {
  const para = await searchParams
  const currentPage = Math.max(1, Number(para?.page) || 1);
  const levelFilter = para?.level || "";
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  let labManuals: any[] = []
  let totalLabManuals = 0;
  try {
    labManuals = await getLabManuals(skip, ITEMS_PER_PAGE, levelFilter); 
    totalLabManuals = await getTotalLabManualsCount(levelFilter); 
  } catch (error) {
    console.error("Error fetching lab manuals:", error)
  }

  const totalPages = Math.ceil(totalLabManuals / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 flex flex-col grow">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Lab Manuals</h1>
          <p className="text-lg text-muted-foreground max-w-7xl">
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
                ? `/lab-manuals?level=${encodeURIComponent(opt.value)}&page=1` 
                : "/lab-manuals?page=1" 
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

        <div className="grow">
          {labManuals.length > 0 ? (
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
                  <h2 className="text-xl font-semibold mb-2 text-foreground">{labManual.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{labManual.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">{labManual.language || "Python"}</span>
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
            <Button asChild variant="outline" disabled={currentPage === 1}>
              <Link href={`/lab-manuals?page=${currentPage - 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>Previous</Link>
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} asChild variant={currentPage === i + 1 ? "default" : "outline"}>
                <Link href={`/lab-manuals?page=${i + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>{i + 1}</Link>
              </Button>
            ))}
            <Button asChild variant="outline" disabled={currentPage === totalPages}>
              <Link href={`/lab-manuals?page=${currentPage + 1}${levelFilter ? `&level=${encodeURIComponent(levelFilter)}` : ''}`}>Next</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
