"use client"

import { useMemo, useState } from "react"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Textbook {
  id: string
  title: string
  author: string | null
  hyperlink: string
  section: "PU_1" | "PU_2" | "OTHER"
  subject: string
  createdAt: Date
  updatedAt: Date
}

interface TextbooksClientPageProps {
  initialTextbooks: Textbook[];
}

const SECTION_OPTIONS = [
  { value: "PU_1", label: "1st PU" },
  { value: "PU_2", label: "2nd PU" },
  { value: "OTHER", label: "Other" },
];

export default function TextbooksClientPage({ initialTextbooks }: TextbooksClientPageProps) {
  const [selectedSection, setSelectedSection] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const textbooks = initialTextbooks ?? [];

  const subjects = useMemo(() => [...new Set(textbooks.map((book) => book.subject))].sort(), [textbooks])

  const filteredTextbooks = useMemo(() => {
    return textbooks.filter((book) => {
      const matchesSection = !selectedSection || book.section === selectedSection
      const matchesSubject = !selectedSubject || book.subject === selectedSubject
      const matchesSearch = !searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSection && matchesSubject && matchesSearch
    })
  }, [textbooks, selectedSection, selectedSubject, searchQuery])

  const textbooksBySection: { [key: string]: Textbook[] } = {};
  filteredTextbooks.forEach(book => {
    if (!textbooksBySection[book.section]) {
      textbooksBySection[book.section] = [];
    }
    textbooksBySection[book.section].push(book);
  });

  const getSectionLabel = (value: string) => {
    return SECTION_OPTIONS.find(option => option.value === value)?.label || value;
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col grow">
      <h1 className="text-4xl font-bold mb-4">Textbooks</h1>

      <div className="mb-8 p-6 bg-card border border-border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="block text-sm font-medium text-card-foreground">Search by Title/Author</label>
            <Input
              type="text"
              placeholder="Search textbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <label className="block text-sm font-medium text-card-foreground">Section</label>
            <Select onValueChange={setSelectedSection} value={selectedSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sections</SelectItem>
                {SECTION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="block text-sm font-medium text-card-foreground">Subject</label>
            <Select onValueChange={setSelectedSubject} value={selectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {(selectedSection || selectedSubject || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="hover:opacity-70 transition-opacity">
                  ×
                </button>
              </span>
            )}
            {selectedSection && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                Section: {getSectionLabel(selectedSection)}
                <button onClick={() => setSelectedSection("")} className="hover:opacity-70 transition-opacity">
                  ×
                </button>
              </span>
            )}
            {selectedSubject && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                Subject: {selectedSubject}
                <button onClick={() => setSelectedSubject("")} className="hover:opacity-70 transition-opacity">
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-12 grow">
        {Object.keys(textbooksBySection).length > 0 ? (
          Object.keys(textbooksBySection).map(section => (
            <div key={section}>
              <h2 className="text-3xl font-semibold border-b-2 pb-2 mb-6">{getSectionLabel(section)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {textbooksBySection[section].map(book => (
                  <div key={book.id} className="p-4 border rounded-lg flex flex-col">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    {book.author && <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>}
                    <p className="text-md text-muted-foreground my-2">Subject: {book.subject}</p>
                    <a href={book.hyperlink} target="_blank" rel="noopener noreferrer" className="mt-auto text-center bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-colors">
                      Get Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="No textbooks found" description="Try adjusting your filters or check back later." />
        )}
      </div>
    </div>
  );
}
