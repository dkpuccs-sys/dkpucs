"use client"

import { useMemo, useState } from "react"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

interface QuestionPaper {
  id: string
  subject: string
  year: number
  hyperlink: string
  createdAt: Date
  updatedAt: Date
}

interface QPsClientPageProps {
  initialQPs: QuestionPaper[];
}

const LEVEL_OPTIONS = [
  { label: "All", value: "" },
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
]

const ITEMS_PER_PAGE = 9;

export default function QPsClientPage({ initialQPs }: QPsClientPageProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const qps = initialQPs ?? [];

  const filteredQPs = useMemo(() => {
    return qps.filter((qp) => {
      const matchesSubject = !selectedSubject || qp.subject === selectedSubject
      const matchesYear = !selectedYear || qp.year.toString() === selectedYear
      const matchesSearch = !searchQuery || qp.subject.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSubject && matchesYear && matchesSearch
    })
  }, [qps, selectedSubject, selectedYear, searchQuery])

  const [currentPage, setCurrentPage] = useState(1);
  const totalFilteredPages = Math.ceil(filteredQPs.length / ITEMS_PER_PAGE);
  const paginatedQPs = filteredQPs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 flex flex-col grow">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Question Papers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access NCERT question papers from various subjects and years to practice and prepare for exams.
          </p>
        </div>

        <div className="grow">
          {paginatedQPs.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {paginatedQPs.length} of {filteredQPs.length} question papers
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedQPs.map((qp) => (
                  <div
                    key={qp.id}
                    className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all duration-300"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                          {qp.subject}
                        </h2>
                        <p className="text-sm text-muted-foreground">Year: {qp.year}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <a
                        href={qp.hyperlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity font-medium"
                      >
                        Download Paper
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="No question papers found"
              description={
                qps.length === 0
                  ? "No papers available yet. Check back soon!"
                  : "Try adjusting your filters to find what you are looking for."
              }
            />
          )}
        </div>

        {totalFilteredPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            {Array.from({ length: totalFilteredPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalFilteredPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalFilteredPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
