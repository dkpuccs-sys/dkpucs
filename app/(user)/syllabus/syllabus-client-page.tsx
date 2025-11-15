"use client"

import { useMemo, useState } from "react"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SyllabusItem {
  id: string
  title: string
  description: string
  pdfUrl: string
  level: string | null
  createdAt: Date
  updatedAt: Date
}

interface SyllabusClientPageProps {
  initialSyllabus: SyllabusItem[]
}

const LEVEL_OPTIONS = [
  { label: "1st PU", value: "1st PU" },
  { label: "2nd PU", value: "2nd PU" },
  { label: "Other", value: "Other" },
]

export default function SyllabusClientPage({ initialSyllabus = [] }: SyllabusClientPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredSyllabus = useMemo(() => {
    if (!initialSyllabus || initialSyllabus.length === 0) return []
    
    return initialSyllabus.filter((item) => {
      const matchesLevel = !selectedLevel || item.level === selectedLevel
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesLevel && matchesSearch
    })
  }, [initialSyllabus, selectedLevel, searchQuery])

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col grow">
      <h1 className="text-4xl font-bold mb-4">Syllabus</h1>

      <div className="mb-8 p-6 bg-card border border-border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="block text-sm font-medium text-card-foreground">Search Syllabus</label>
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {(selectedLevel || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="hover:opacity-70 transition-opacity">
                  ×
                </button>
              </span>
            )}
            {selectedLevel && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                Level: {LEVEL_OPTIONS.find(opt => opt.value === selectedLevel)?.label || selectedLevel}
                <button onClick={() => setSelectedLevel("")} className="hover:opacity-70 transition-opacity">
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 grow">
        {filteredSyllabus.length > 0 ? (
          filteredSyllabus.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-foreground">{item.title}</h2>
                {item.level && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                    {item.level}
                  </span>
                )}
              </div>
              <p className="mt-2 text-muted-foreground whitespace-pre-wrap mb-4">{item.description}</p>
              {item.pdfUrl && (
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a 
                      href={item.pdfUrl.startsWith("http://") ? item.pdfUrl.replace("http://", "https://") : item.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      download 
                      className="inline-flex items-center gap-2"
                    >
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
            description="Try changing the filters or check back later."
          />
        )}
      </div>
    </div>
  )
}
