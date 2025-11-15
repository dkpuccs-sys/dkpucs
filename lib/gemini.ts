import { GoogleGenerativeAI } from "@google/generative-ai"

let cachedModel: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Please add it to your environment (e.g. .env.local).")
  }

  if (!cachedModel) {
    const genAI = new GoogleGenerativeAI(apiKey)
    
    cachedModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  }

  return cachedModel
}
