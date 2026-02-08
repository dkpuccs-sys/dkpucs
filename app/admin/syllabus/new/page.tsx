"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  { ssr: false },
);
const SelectContent = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectContent),
  { ssr: false },
);
const SelectItem = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectItem),
  { ssr: false },
);
const SelectTrigger = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectTrigger),
  { ssr: false },
);
const SelectValue = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectValue),
  { ssr: false },
);

/**
 * Render a form for creating a new syllabus and handle its submission.
 *
 * The component manages local form state (title, description, PDF URL, required level),
 * disables inputs while creating, and renders nothing until the component is mounted on the client.
 * Submitting the form creates the syllabus via a POST to `/api/syllabus`, shows success or error toasts,
 * and on success refreshes and navigates to `/admin/syllabus`.
 *
 * @returns The JSX element for the New Syllabus page.
 */
export default function NewSyllabusPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [level, setLevel] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!level) {
      toast({
        title: "Level required",
        description: "Please select a level before submitting.",
        variant: "destructive",
      });
      return;
    }
    setIsCreating(true);
    try {
      const response = await fetch("/api/syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          pdfUrl,
          level,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create syllabus.");
      }

      toast({
        title: "Success!",
        description: "Syllabus created successfully.",
        variant: "default",
      });
      router.refresh();
      router.push("/admin/syllabus");
    } catch (error: any) {
      console.error("Error creating syllabus:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create syllabus.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>New Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter syllabus title"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter syllabus description"
              required
              disabled={isCreating}
              className="border border-border min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="Enter PDF URL"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="level">Level</Label>
            <Select
              onValueChange={setLevel}
              value={level}
              disabled={isCreating}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st PU">1st PU</SelectItem>
                <SelectItem value="2nd PU">2nd PU</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
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
                "Create Syllabus"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
