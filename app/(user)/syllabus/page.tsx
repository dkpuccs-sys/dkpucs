import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
];

interface SyllabusItem {
  id: string;
  level: string; 
  course: string;
  content: string;
  pdfLink?: string; 
}


const SYLLABUS_ITEMS: SyllabusItem[] = [
  {
    id: "cs-1pu",
    level: "1st PU",
    course: "Computer Science - 1st PU",
    content: "Introduction to programming, Python basics, flowcharts, and problem solving.",
  },
  {
    id: "math-1pu",
    level: "1st PU",
    course: "Mathematics - 1st PU",
    content: "Sets, functions, trigonometry, coordinate geometry, and statistics.",
  },
  {
    id: "cs-2pu",
    level: "2nd PU",
    course: "Computer Science - 2nd PU",
    content: "Data structures, object-oriented programming concepts, and basic algorithms.",
  },
  {
    id: "math-2pu",
    level: "2nd PU",
    course: "Mathematics - 2nd PU",
    content: "Calculus, vectors, probability, and applications in real-life problems.",
  },
  {
    id: "general-other",
    level: "Other",
    course: "General Guidelines",
    content: "Refer to the official college website and university circulars for detailed and updated syllabus information.",
  },
];

interface SyllabusPageProps {
  searchParams?: {
    level?: string;
  };
}

export default async function SyllabusPage({ searchParams }: SyllabusPageProps) {
  const param = await searchParams
  const levelFilter = param?.level || "";

  const filteredItems = levelFilter
    ? SYLLABUS_ITEMS.filter((item) => item.level === levelFilter)
    : SYLLABUS_ITEMS;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Syllabus</h1>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Filter by level:</span>
        <div className="flex flex-wrap gap-2">
          {LEVEL_OPTIONS.map((opt) => {
            const isActive = levelFilter === opt.value;
            const href = opt.value ? `/syllabus?level=${encodeURIComponent(opt.value)}` : "/syllabus";
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

      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-foreground">{item.course}</h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                  {item.level}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground whitespace-pre-wrap mb-4">{item.content}</p>
              {item.pdfLink && (
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={item.pdfLink} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2">
                      <Download className="size-4" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyState
            title="No syllabus data found"
            description="Try changing the level filter or refer to the official college resources for more details."
          />
        )}
      </div>
    </div>
  );
}
