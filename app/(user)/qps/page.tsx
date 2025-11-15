"use client"

import { useMemo, useState } from "react"

interface QuestionPaper {
  id: string
  subject: string
  year: number
  hyperlink: string
  difficulty?: string
}


const STATIC_QPS: QuestionPaper[] = [
  {
    id: "cs-2023",
    subject: "Computer Science",
    year: 2023,
    hyperlink: "https://ncert.nic.in/textbook.php?kecs1=0-11",
    difficulty: "Intermediate",
  },
  {
    id: "cs-2022",
    subject: "Computer Science",
    year: 2022,
    hyperlink: "https://ncert.nic.in/textbook.php?kecs1=0-11",
    difficulty: "Intermediate",
  },
  {
    id: "math-2023",
    subject: "Mathematics",
    year: 2023,
    hyperlink: "https://ncert.nic.in/textbook.php?kems1=0-11",
    difficulty: "Standard",
  },
  {
    id: "physics-2023",
    subject: "Physics",
    year: 2023,
    hyperlink: "https://ncert.nic.in/textbook.php?kepy1=0-11",
    difficulty: "Standard",
  },
]

import { EmptyState } from "@/components/ui/empty-state"

export default function QPsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const qps = STATIC_QPS

  const subjects = useMemo(() => [...new Set(qps.map((qp) => qp.subject))].sort(), [qps])

  const years = useMemo(() => [...new Set(qps.map((qp) => qp.year))].sort((a, b) => b - a), [qps])

  const filteredQPs = useMemo(() => {
    return qps.filter((qp) => {
      const matchesSubject = !selectedSubject || qp.subject === selectedSubject
      const matchesYear = !selectedYear || qp.year.toString() === selectedYear
      const matchesSearch = !searchQuery || qp.subject.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSubject && matchesYear && matchesSearch
    })
  }, [qps, selectedSubject, selectedYear, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Question Papers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access NCERT question papers from various subjects and years to practice and prepare for exams.
          </p>
        </div>

        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <>
              <label className="block text-sm font-medium text-card-foreground mb-2">Search by Subject</label>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </>

            <>
              <label className="block text-sm font-medium text-card-foreground mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </>

            <>
              <label className="block text-sm font-medium text-card-foreground mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          </div>

          {(selectedSubject || selectedYear || searchQuery) && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:opacity-70 transition-opacity">
                    ×
                  </button>
                </span>
              )}
              {selectedSubject && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {selectedSubject}
                  <button onClick={() => setSelectedSubject("")} className="hover:opacity-70 transition-opacity">
                    ×
                  </button>
                </span>
              )}
              {selectedYear && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {selectedYear}
                  <button onClick={() => setSelectedYear("")} className="hover:opacity-70 transition-opacity">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {filteredQPs.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredQPs.length} of {qps.length} question papers
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQPs.map((qp) => (
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
                    {qp.difficulty && (
                      <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">
                        {qp.difficulty}
                      </span>
                    )}
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
    </div>
  )
}
