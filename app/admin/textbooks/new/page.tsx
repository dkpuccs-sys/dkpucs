"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewTextbookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [section, setSection] = useState("PU_1"); 
  const [subject, setSubject] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { toast } = useToast(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await fetch("/api/textbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author: author || null, hyperlink, section, subject }),
      });

      if (!response.ok) {
        throw new Error("Failed to create textbook.");
      }

      toast({
        title: "Success!",
        description: "Textbook created successfully.",
        variant: "default",
      });
      router.refresh(); 
      router.push("/admin/textbooks");
    } catch (error: any) {
      console.error("Error creating textbook:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create textbook.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>New Textbook</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter textbook title"
              required
              disabled={isCreating}
              className="border border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author (Optional)</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
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
          <div className="grid gap-2">
            <Label htmlFor="section">Section</Label>
            <Select onValueChange={setSection} value={section} disabled={isCreating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PU_1">1st PU</SelectItem>
                <SelectItem value="PU_2">2nd PU</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
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
                "Create Textbook"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
