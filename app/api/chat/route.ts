import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { knowledgeBase } from "@/lib/knowledge-base";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

/**
 * Finds up to two knowledge-base documents most relevant to the given query.
 *
 * Matches on keywords from the query (words longer than two characters) and ranks documents by the number of matching keywords.
 *
 * @param query - The user query used to search the local knowledge base.
 * @returns A single string containing up to two matching documents joined by two newlines (`"\n\n"`); an empty string if there are no matches.
 */
function retrieveContext(query: string): string {
  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);
  const relevantContext: { doc: string; score: number }[] = [];

  for (const doc of knowledgeBase) {
    let score = 0;
    for (const keyword of keywords) {
      if (doc.toLowerCase().includes(keyword)) {
        score++;
      }
    }
    if (score > 0) {
      relevantContext.push({ doc, score });
    }
  }

  relevantContext.sort((a, b) => b.score - a.score);
  return relevantContext
    .slice(0, 2)
    .map((item) => item.doc)
    .join("\n\n");
}

/**
 * Handle POST requests for the chat endpoint, validating messages, enriching context, and streaming an AI-generated reply.
 *
 * Validates and filters incoming chat messages, constructs a system instruction (including relevant site context when available),
 * ensures the Gemini API key is present, invokes the streaming AI generation, and returns the streamed response or an appropriate
 * HTTP error response.
 *
 * @returns A Response that contains the streamed AI assistant reply on success; a 400 Response for invalid or empty input; or a 500 Response for a missing GEMINI_API_KEY or generation errors.
 */
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON in request body.", { status: 400 });
  }

  const messages = body?.messages || [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("No messages provided.", { status: 400 });
  }

  const filteredMessages: ChatMessage[] = messages.filter(
    (m: any) =>
      m &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      (m.role === "user" || m.role === "model"),
  );

  if (filteredMessages.length === 0) {
    return new Response("No valid messages with content provided.", {
      status: 400,
    });
  }

  const latestUserMessage = filteredMessages
    .filter((m) => m.role === "user")
    .pop();

  let systemInstruction = `You are a helpful and knowledgeable AI assistant for the DKPUCS (District Karnataka PU Computer Science) website. 

Your role is to help students navigate the website, find resources, and answer questions about:
- Blogs and educational articles
- Syllabus and course materials with PDF downloads
- Question Papers (QPs) - past year papers organized by subject and year
- Practicals - coding exercises with difficulty levels and programming languages
- Textbooks organized by section and subject
- Announcements and important updates
- Code Runner for online code testing
- General website navigation and features

Key Website Sections:
1. Home: Landing page with hero section, about us, features, story, and contact
2. Blogs: Educational articles filterable by level (1st PU, 2nd PU, Other)
3. Syllabus: Course syllabi with PDF download options, filterable by level
4. Question Papers (QPs): Past year papers filterable by subject and year
5. Practicals: Coding practicals with difficulty and language filters
6. Textbooks: Recommended books organized by section
7. Announcements: Important updates and news
8. Runner: Online code execution environment

Website Features:
- Responsive design for mobile and desktop
- Dark mode support
- AI chatbot (you!) for instant assistance
- Search and filtering capabilities
- Admin panel for content management
- Analytics tracking

Always provide accurate, helpful information based on the website structure and content. If you don't know something specific, acknowledge it and guide users on where they might find the information on the website.`;

  if (latestUserMessage) {
    const context = retrieveContext(latestUserMessage.content);
    if (context) {
      systemInstruction += `\n\nHere is additional relevant information based on the user's query:\n\n${context}\n\nUse this context to provide a more specific and detailed answer. If the context does not fully answer the question, you may use your general knowledge.`;
    } else {
      systemInstruction += `\n\nThe user is asking about the DKPUCS website. Provide helpful information about website features, navigation, and available resources based on the comprehensive website information provided above. You may also use your general knowledge to answer questions.`;
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      "GEMINI_API_KEY is not set. Please add it to your environment variables.",
      { status: 500 },
    );
  }

  try {
    const result = await streamText({
      model: google("models/gemini-2.0-flash"),
      maxRetries: 0,
      messages: filteredMessages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      system: systemInstruction,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      "Failed to generate response. Please try again later.",
      { status: 500 },
    );
  }
}
