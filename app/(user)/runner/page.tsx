"use client"

import { CodeRunner } from "@/components/code-runner"
import { PythonCompilerCards } from "@/components/python-compiler-cards"
import Link from "next/link"

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
