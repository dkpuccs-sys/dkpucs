"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

/**
 * Render the New Lab Manual admin page with a form to create a lab manual.
 *
 * The form collects title, description, difficulty, language, level, and a list of code snippets (each containing question, code, and comments).
 *
 * @returns The JSX element for the New Lab Manual form page.
 */
export default function NewLabManualPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [content, setContent] = useState<
    Array<{ question: string; code: string; comments: string }>
  >([]);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!difficulty || !language || !level) {
      toast({
        title: "Missing fields",
        description: "Please select difficulty, language, and level.",
        variant: "destructive",
      });
      return;
    }
    setIsCreating(true);
    try {
      const response = await fetch("/api/lab-manuals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          difficulty,
          language,
          level,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create lab manual.");
      }

      toast({
        title: "Success!",
        description: "Lab Manual created successfully.",
        variant: "default",
      });
      router.refresh();
      router.push("/admin/lab-manuals");
    } catch (error: any) {
      console.error("Error creating lab manual:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create lab manual.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>New Lab Manual</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lab manual title"
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
              placeholder="Enter lab manual description"
              required
              rows={5}
              disabled={isCreating}
              className="border border-border"
            />
          </div>

          <div className="grid gap-4">
            <Label>Content (Code Snippets)</Label>
            {content.map((item, index) => (
              <div key={index} className="border p-4 rounded-md grid gap-2">
                <Label htmlFor={`question-${index}`}>Question</Label>
                <Input
                  id={`question-${index}`}
                  value={item.question}
                  onChange={(e) => {
                    setContent(
                      content.map((c, i) =>
                        i === index ? { ...c, question: e.target.value } : c,
                      ),
                    );
                  }}
                  placeholder="Enter question for this snippet"
                  disabled={isCreating}
                  className="border border-border"
                />
                <Label htmlFor={`code-${index}`}>Code</Label>
                <Textarea
                  id={`code-${index}`}
                  value={item.code}
                  onChange={(e) => {
                    setContent(
                      content.map((c, i) =>
                        i === index ? { ...c, code: e.target.value } : c,
                      ),
                    );
                  }}
                  placeholder="Enter code snippet"
                  rows={5}
                  disabled={isCreating}
                  className="border border-border"
                />
                <Label htmlFor={`comments-${index}`}>Comments</Label>
                <Textarea
                  id={`comments-${index}`}
                  value={item.comments}
                  onChange={(e) => {
                    setContent(
                      content.map((c, i) =>
                        i === index ? { ...c, comments: e.target.value } : c,
                      ),
                    );
                  }}
                  placeholder="Enter comments for this snippet"
                  rows={3}
                  disabled={isCreating}
                  className="border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newContent = content.filter((_, i) => i !== index);
                    setContent(newContent);
                  }}
                  disabled={isCreating}
                >
                  Remove Snippet
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setContent([
                  ...content,
                  { question: "", code: "", comments: "" },
                ])
              }
              disabled={isCreating}
            >
              Add Code Snippet
            </Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              onValueChange={setDifficulty}
              value={difficulty}
              disabled={isCreating}
            >
              <SelectTrigger className="border border-border">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <Select
              onValueChange={setLanguage}
              value={language}
              disabled={isCreating}
            >
              <SelectTrigger className="border border-border">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C++">C++</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="level">Level</Label>
            <Select
              onValueChange={setLevel}
              value={level}
              disabled={isCreating}
            >
              <SelectTrigger className="border border-border">
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
                  Creating Lab Manual...
                </>
              ) : (
                "Create Lab Manual"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
