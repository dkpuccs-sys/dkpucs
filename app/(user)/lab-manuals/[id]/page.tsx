import { getLabManualById } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface LabManualContent {
  question: string;
  code: string;
  comments?: string;
}

interface LabManualDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Create page metadata for a lab manual identified by its route `id`.
 *
 * @param params - A promise that resolves to an object containing the route `id` used to locate the lab manual
 * @returns A Metadata object for the lab manual including title, description, keywords, Open Graph and Twitter info; if no lab manual is found, returns metadata with title `"Lab Manual not found"`
 */
export async function generateMetadata({
  params,
}: LabManualDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const labManual = await getLabManualById(id);

  if (!labManual) {
    return {
      title: "Lab Manual not found",
    };
  }

  return {
    title: labManual.title,
    description: labManual.description,
    keywords: [
      "DKPUCS",
      "lab manual",
      "programming exercises",
      "coding practice",
      labManual.language,
      labManual.difficulty,
      labManual.level,
    ].filter(Boolean) as string[],
    openGraph: {
      title: labManual.title,
      description: labManual.description,
      type: "article",
      url: `https://dkpucs.vercel.app/lab-manuals/${id}`,
      section: `${labManual.language || "Programming"} Lab Manual`,
    },
    twitter: {
      card: "summary_large_image",
      title: labManual.title,
      description: labManual.description,
    },
    alternates: {
      canonical: `https://dkpucs.vercel.app/lab-manuals/${id}`,
    },
  };
}

/**
 * Renders the lab manual detail page for a given `id`, fetching the lab manual and displaying its metadata and content.
 *
 * Invokes `notFound()` when no lab manual exists for the provided `id`. The page shows title, published date, optional badges
 * (language, difficulty, level), description, and an ordered list of content sections which may include questions, code blocks
 * (with a link to explain the code via ChatGPT), and comments.
 *
 * @param params - A Promise that resolves to an object containing the route `id` used to fetch the lab manual.
 * @returns The React element representing the lab manual detail page.
 */
export default async function LabManualDetailPage({
  params,
}: LabManualDetailPageProps) {
  const { id } = await params;
  const labManual = await getLabManualById(id);

  if (!labManual) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2">
              {labManual.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 flex-wrap text-sm">
              <span className="text-muted-foreground">
                Published on{" "}
                {new Date(labManual.createdAt).toLocaleDateString()}
              </span>
              {labManual.language && (
                <Badge variant="secondary">{labManual.language}</Badge>
              )}
              {labManual.difficulty && (
                <Badge variant="outline">{labManual.difficulty}</Badge>
              )}
              {labManual.level && <Badge>{labManual.level}</Badge>}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {labManual.description}
            </p>

            <div className="space-y-8">
              {Array.isArray(labManual.content) &&
                (labManual.content as unknown as LabManualContent[]).map(
                  (item: LabManualContent, index: number) => (
                    <div key={index} className="border-t pt-6">
                      {item.question && (
                        <h3 className="text-xl font-semibold mb-3">{`Question ${index + 1}: ${item.question}`}</h3>
                      )}
                      {item.code && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Program:
                            </h4>
                            <a
                              href={`https://chat.openai.com/?q=${encodeURIComponent(`Explain this ${labManual.language || "program"} program:\n\n${item.code}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap transition-colors"
                            >
                              Explain with ChatGPT
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <CodeBlock
                            code={item.code}
                            language={labManual.language || "text"}
                          />
                        </div>
                      )}
                      {item.comments && (
                        <div className="text-sm text-muted-foreground">
                          <h4 className="font-medium mb-1">Comments:</h4>
                          <p>{item.comments}</p>
                        </div>
                      )}
                    </div>
                  ),
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
