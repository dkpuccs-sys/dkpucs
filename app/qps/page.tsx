"use client"

import { useEffect, useMemo, useState } from "react"
import { getQuestionPapers } from "@/lib/data"

interface QuestionPaper {
  id: string
  subject: string
  year: number
  hyperlink: string
  difficulty?: string
}

export default function QPsPage() {
  const [qps, setQps] = useState<QuestionPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const fetchQPs = async () => {
      try {
        const data = await getQuestionPapers()
        setQps(data || [])
      } catch (error) {
        console.error("Error fetching question papers:", error)
        setQps([])
      } finally {
        setLoading(false)
      }
    }

    fetchQPs()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-foreground">Loading question papers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Question Papers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access NCERT question papers from various subjects and years to practice and prepare for exams.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Search by Subject</label>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Subject Filter */}
            <div>
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
            </div>

            {/* Year Filter */}
            <div>
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
            </div>
          </div>

          {/* Active Filters Display */}
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

        {/* Question Papers Grid */}
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
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2">No question papers found</p>
              <p className="text-sm text-muted-foreground">
                {qps.length === 0
                  ? "No papers available yet. Check back soon!"
                  : "Try adjusting your filters to find what you are looking for."}
              </p>
              {filteredQPs.length === 0 && qps.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedSubject("")
                    setSelectedYear("")
                    setSearchQuery("")
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
