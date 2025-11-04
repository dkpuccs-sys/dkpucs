"use client"

import { useState } from "react"
import { Play, Copy, Trash2 } from "lucide-react"

export function CodeRunner() {
  const [code, setCode] = useState(`# Welcome to Python Runner
# Try writing some Python code here!

print("Hello, World!")`)

  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState("")

  const executePythonCode = () => {
    setIsRunning(true)
    setOutput("")
    setError("")

    try {
      const output: string[] = []

      // Create a sandbox environment
      const pythonEnv = {
        print: (...args: any[]) => {
          output.push(args.map((arg) => String(arg)).join(" "))
        },
        len: (obj: any) => {
          if (typeof obj === "string") return obj.length
          if (Array.isArray(obj)) return obj.length
          return 0
        },
        range: (start: number, end?: number, step = 1) => {
          const result = []
          const actualEnd = end === undefined ? start : end
          const actualStart = end === undefined ? 0 : start
          for (let i = actualStart; i < actualEnd; i += step) {
            result.push(i)
          }
          return result
        },
        sum: (arr: any[]) => {
          if (!Array.isArray(arr)) return 0
          return arr.reduce((a, b) => (a || 0) + (b || 0), 0)
        },
        max: (arr: any[]) => {
          if (!Array.isArray(arr) || arr.length === 0) return Number.NEGATIVE_INFINITY
          return Math.max(...arr.map((x) => Number(x)))
        },
        min: (arr: any[]) => {
          if (!Array.isArray(arr) || arr.length === 0) return Number.POSITIVE_INFINITY
          return Math.min(...arr.map((x) => Number(x)))
        },
        abs: (n: number) => Math.abs(n),
        str: (val: any) => String(val),
        int: (val: any) => Number.parseInt(String(val)),
        float: (val: any) => Number.parseFloat(String(val)),
        list: (arr: any[] = []) => [...arr],
        dict: (obj: any = {}) => ({ ...obj }),
      }

      const executeFunc = new Function(...Object.keys(pythonEnv), convertPythonToJS(code))
      executeFunc(...Object.values(pythonEnv))

      setOutput(output.length > 0 ? output.join("\n") : "(no output)")
    } catch (err: any) {
      setError(`Error: ${err?.message || "An error occurred while executing the code"}`)
      console.error("[v0] Code execution error:", err)
    } finally {
      setIsRunning(false)
    }
  }

  const convertPythonToJS = (pythonCode: string): string => {
    let jsCode = pythonCode

    // Handle f-strings
    jsCode = jsCode.replace(/f"([^"]*)"/g, "`$1`")
    jsCode = jsCode.replace(/f'([^']*)'/g, "`$1`")

    // Handle print function
    jsCode = jsCode.replace(/print$$(.*?)$$(?=\n|$|;)/g, "print($1)")

    return jsCode
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const resetCode = () => {
    setCode("")
    setOutput("")
    setError("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Python Code Runner</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Write and execute Python code directly in your browser. Perfect for learning, testing snippets, and quick
          experimentation.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="flex flex-col h-full min-h-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Code Editor</h2>
            <div className="flex gap-2">
              <button onClick={copyCode} className="p-2 hover:bg-muted rounded transition-colors" title="Copy code">
                <Copy size={20} className="text-muted-foreground" />
              </button>
              <button onClick={resetCode} className="p-2 hover:bg-muted rounded transition-colors" title="Clear code">
                <Trash2 size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-card border border-border rounded-lg font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Write your Python code here..."
            spellCheck="false"
          />

          <button
            onClick={executePythonCode}
            disabled={isRunning || !code.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Play size={20} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full min-h-96">
          <h2 className="text-xl font-semibold text-foreground mb-4">Output</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm font-mono">{error}</p>
            </div>
          )}

          {/* Output Display */}
          <div className="flex-1 p-4 bg-card border border-border rounded-lg">
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap break-words">
              {output || (
                <span className="text-muted-foreground">{isRunning ? "Executing..." : "Output will appear here"}</span>
              )}
            </pre>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Simplified Python runner supporting basic syntax, functions, and data types. Complex libraries and imports
              are not supported.
            </p>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Hello World",
              code: 'print("Hello, World!")',
            },
            {
              title: "Arithmetic",
              code: "print(2 + 2)\nprint(10 * 5)\nprint(20 / 4)",
            },
            {
              title: "Variables",
              code: 'name = "Python"\nversion = 3.11\nprint(f"{name} {version}")',
            },
            {
              title: "Lists",
              code: "numbers = [1, 2, 3, 4, 5]\nprint(sum(numbers))\nprint(len(numbers))",
            },
            {
              title: "Loops",
              code: "for i in range(5):\n    print(i)",
            },
            {
              title: "Conditionals",
              code: 'age = 18\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
            },
          ].map((example) => (
            <button
              key={example.title}
              onClick={() => setCode(example.code)}
              className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors text-left"
            >
              <h3 className="font-semibold text-foreground mb-2">{example.title}</h3>
              <code className="text-xs text-muted-foreground font-mono line-clamp-3">{example.code}</code>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
