"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Copy, Trash2 } from "lucide-react"

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL?: string }) => Promise<any>
  }
}

export function CodeRunner() {
  const [code, setCode] = useState(`# Welcome to Python Runner
# Try writing some Python code here!

print("Hello, World!")`)

  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState("")
  const [isPyodideReady, setIsPyodideReady] = useState(false)
  const [isPyodideLoading, setIsPyodideLoading] = useState(true)

  const pyodideRef = useRef<any | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadPyodideScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined") {
          reject(new Error("Window is not available"))
          return
        }

        if (window.loadPyodide) {
          resolve()
          return
        }

        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Failed to load Pyodide script"))
        document.body.appendChild(script)
      })
    }

    const initPyodide = async () => {
      try {
        setIsPyodideLoading(true)
        setError("")

        await loadPyodideScript()
        if (cancelled) return

        if (!window.loadPyodide) {
          throw new Error("Pyodide loader is not available on window")
        }

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
        })

        if (cancelled) return

        pyodideRef.current = pyodide
        setIsPyodideReady(true)
      } catch (err: any) {
        if (!cancelled) {
          console.error("Failed to initialize Pyodide:", err)
          setError("Failed to initialize Python runtime. Please refresh the page and try again.")
          setIsPyodideReady(false)
        }
      } finally {
        if (!cancelled) {
          setIsPyodideLoading(false)
        }
      }
    }

    initPyodide()

    return () => {
      cancelled = true
    }
  }, [])

  const executePythonCode = async () => {
    if (!code.trim()) return

    if (!pyodideRef.current) {
      setError("Python runtime is still loading. Please wait a moment and try again.")
      return
    }

    setIsRunning(true)
    setOutput("")
    setError("")

    try {
      const pyodide = pyodideRef.current

      const wrappedCode = `import sys, io, traceback
_buffer = io.StringIO()
_old_stdout, _old_stderr = sys.stdout, sys.stderr
sys.stdout, sys.stderr = _buffer, _buffer
_ns = {}
code = ${JSON.stringify(code)}
try:
    exec(code, _ns)
except Exception:
    traceback.print_exc()
finally:
    sys.stdout, sys.stderr = _old_stdout, _old_stderr
_output = _buffer.getvalue()
_output` as string

      const result = await pyodide.runPythonAsync(wrappedCode)
      const textResult = typeof result === "string" ? result : String(result ?? "")

      setOutput(textResult.trim() || "(no output)")
    } catch (err: any) {
      console.error("Python execution error:", err)
      setError(`Error while executing Python code: ${err?.message || "Unknown error"}`)
    } finally {
      setIsRunning(false)
    }
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
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Python Code Runner</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Write and execute Python code directly in your browser. Perfect for learning, testing snippets, and quick
          experimentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="flex flex-col h-full min-h-96">
          <h2 className="text-xl font-semibold text-foreground mb-4">Output</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm font-mono">{error}</p>
            </div>
          )}

          <div className="flex-1 p-4 bg-card border border-border rounded-lg">
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap wrap-break-words">
              {output || (
                <span className="text-muted-foreground">{isRunning ? "Executing..." : "Output will appear here"}</span>
              )}
            </pre>
          </div>
=
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Simplified Python runner supporting basic syntax, functions, and data types. Complex libraries and imports
              are not supported.
            </p>
          </div>
        </div>
      </div>
=
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
