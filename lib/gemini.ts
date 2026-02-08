import { GoogleGenerativeAI } from "@google/generative-ai";

let cachedModel: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null =
  null;

/**
 * Retrieve a cached Gemini generative model instance, creating and caching it on first call.
 *
 * @returns A generative model instance for "gemini-2.5-flash".
 * @throws Error if the `GEMINI_API_KEY` environment variable is not set.
 */
export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please add it to your environment (e.g. .env.local).",
    );
  }

  if (!cachedModel) {
    const genAI = new GoogleGenerativeAI(apiKey);

    cachedModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  return cachedModel;
}
