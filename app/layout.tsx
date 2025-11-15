import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { PageViewTracker } from "@/components/page-view-tracker"

export const metadata = {
  title: "DKPUCS - Learn, Code, Grow",
  description: "College coding club community for learning and competitive programming",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <PageViewTracker />
        </ThemeProvider>
      </body>
    </html>
  )
}
