"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

/**
 * Renders a form for creating a new question paper.
 *
 * The form collects year, subject, and hyperlink, disables inputs while submitting,
 * shows success or error toasts, refreshes application data, and navigates to the question papers list on success.
 *
 * @returns The React element for the new question paper creation form.
 */
export default function NewQPPage() {
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await fetch("/api/qps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: parseInt(year, 10), subject, hyperlink }),
      });

      if (!response.ok) {
        throw new Error("Failed to create question paper.");
      }

      toast({
        title: "Success!",
        description: "Question paper created successfully.",
        variant: "default",
      });
      router.refresh();
      router.push("/admin/qps");
    } catch (error: any) {
      console.error("Error creating question paper:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create question paper.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>New Question Paper</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year (e.g., 2023)"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject (e.g., Computer Science)"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hyperlink">Hyperlink</Label>
            <Input
              id="hyperlink"
              value={hyperlink}
              onChange={(e) => setHyperlink(e.target.value)}
              placeholder="Enter hyperlink URL"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              {isCreating ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  Creating...
                </>
              ) : (
                "Create Question Paper"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
