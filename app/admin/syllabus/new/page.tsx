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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    setIsCreating(true);
    try {
      const response = await fetch("/api/syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, pdfUrl, level: level || null }), 
      });

      if (!response.ok) {
        throw new Error("Failed to create syllabus.");
      }

      toast({
        title: "Success!",
        description: "Syllabus created successfully.",
        variant: "default",
      });
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
            <Label htmlFor="level">Level (Optional)</Label>
            <Select onValueChange={setLevel} value={level} disabled={isCreating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
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
