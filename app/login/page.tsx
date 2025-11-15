"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        password,
        callbackUrl,
      })

      if (!result) {
        setError("Unexpected error. Please try again.")
      } else if (result.error) {
        setError("Invalid admin password.")
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      console.error("Login error", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the admin password to access the management dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!password || isLoading}
            className="w-full py-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
