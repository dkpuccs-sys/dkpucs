"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, FileText, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";

interface QuestionPaper {
  id: string;
  year: number;
  subject: string;
  hyperlink: string;
  createdAt: Date | string;
}

interface QPSClientPageProps {
  initialQps: QuestionPaper[];
}

const ITEMS_PER_PAGE = 12;

/**
 * Filter and display question papers with search and subject selection capabilities.
 *
 * Provides a searchable interface with subject-based filtering and paginated results;
 * handles empty states and provides a reset mechanism for filters.
 *
 * @param initialQps - Initial list of question paper records to be displayed and filtered.
 * @returns The client-side element for the Question Papers listing and interaction.
 */
export default function QPSClientPage({ initialQps }: QPSClientPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    const uniqueSubjects = [
      ...new Set(initialQps.map((qp) => qp.subject.trim())),
    ];
    return uniqueSubjects.sort((a, b) => a.localeCompare(b));
  }, [initialQps]);

  // Filter QPs based on search and selected subject
  const filteredQps = useMemo(() => {
    return initialQps.filter((qp) => {
      const matchesSearch =
        qp.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qp.year.toString().includes(searchQuery);
      const matchesSubject =
        selectedSubject === "all" || qp.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [initialQps, searchQuery, selectedSubject]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubject]);

  const totalPages = Math.ceil(filteredQps.length / ITEMS_PER_PAGE);
  const paginatedQps = filteredQps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSubject("all");
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Question Papers
        </h1>
        <p className="text-lg text-muted-foreground max-w-7xl">
          Previous year question papers to help you prepare for exams and
          understand the paper pattern better.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label
              htmlFor="qps-search"
              className="text-sm font-medium text-foreground ml-1"
            >
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="qps-search"
                placeholder="Search by subject or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <label
              htmlFor="subject-filter"
              className="text-sm font-medium text-foreground ml-1"
            >
              Subject
            </label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger id="subject-filter">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchQuery || selectedSubject !== "all") && (
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full md:w-auto gap-2"
            >
              <RotateCcw className="size-4" />
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="min-h-[400px]">
        {paginatedQps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedQps.map((qp) => (
              <div
                key={qp.id}
                className="group relative bg-card border border-border rounded-xl p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="size-6" />
                  </div>
                  <span className="text-sm font-semibold px-2 py-1 bg-muted rounded-md border border-border">
                    {qp.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {qp.subject}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {qp.subject} Question Paper - {qp.year}
                </p>
                <a
                  href={qp.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  View Paper
                  <ExternalLink className="size-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No papers found"
            description="We couldn't find any question papers matching your filters. Try adjusting your search query or subject selection."
            action={
              (searchQuery || selectedSubject !== "all") && (
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              )
            }
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 mx-2">
            <span className="text-sm font-medium">Page {currentPage}</span>
            <span className="text-sm text-muted-foreground">
              of {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
