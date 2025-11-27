import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { PathBasedTracker } from "@/components/path-based-tracker"
import { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: "DKPUCS - Learn, Code, Grow",
    template: "%s | DKPUCS",
  },
  description: "Your go-to resource for previous year question papers, textbooks, and lab manuals. Join our community to learn, code, and grow.",
  keywords: ["DKPUCS", "college", "coding", "club", "community", "programming", "question papers", "textbooks", "lab manuals"],
  openGraph: {
    title: "DKPUCS - Learn, Code, Grow",
    description: "Your go-to resource for previous year question papers, textbooks, and lab manuals. Join our community to learn, code, and grow.",
    url: "https://dkpucs.vercel.app",
    siteName: "DKPUCS",
    images: [
      {
        url: "https://dkpucs.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DKPUCS - Learn, Code, Grow",
    description: "Your go-to resource for previous year question papers, textbooks, and lab manuals. Join our community to learn, code, and grow.",
    images: ["https://dkpucs.vercel.app/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`overflow-x-hidden ${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={null}>
              {children}
            </Suspense>
            <PathBasedTracker />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
