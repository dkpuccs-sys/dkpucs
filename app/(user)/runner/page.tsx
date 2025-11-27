import { CodeRunner } from "@/components/code-runner"
import { PythonCompilerCards } from "@/components/python-compiler-cards"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Python Compiler",
  description: "Free online Python compiler and code runner. Write, run, and test your Python code instantly in the browser. Perfect for learning, testing, and practicing Python programming.",
  keywords: [
    "Python compiler",
    "online Python compiler",
    "Python code runner",
    "run Python online",
    "Python IDE",
    "Python online editor",
    "DKPUCS",
    "code runner",
    "Python practice",
    "programming online",
  ],
  openGraph: {
    title: "Python Compiler - DKPUCS",
    description: "Free online Python compiler. Write, run, and test your Python code instantly.",
    url: "https://dkpucs.vercel.app/runner",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/runner",
  },
}

export default function RunnerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        If you encounter issues with the code in this runner, consider using an AI assistant like <Link href={'https://chat.openai.com'} className="text-purple-500 underline" target="_blank">ChatGPT</Link> for debugging help.
      </div>
      <CodeRunner />
      <div className="p-4 text-center text-lg font-semibold">
        Or try one of these online Python compilers:
      </div>
      <PythonCompilerCards />
    </div>
  )
}

