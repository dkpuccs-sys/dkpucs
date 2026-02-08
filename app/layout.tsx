import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { PathBasedTracker } from "@/components/path-based-tracker";
import { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dkpucs.vercel.app"),
  title: {
    default: "DKPUCS - Learn, Code, Grow",
    template: "%s | DKPUCS",
  },
  description:
    "Official website for DKPUCS students. Access previous year question papers, syllabus, textbooks, lab manuals, blogs, and online Python compiler. Join our coding community to learn, code, and grow together.",
  keywords: [
    "DKPUCS",
    "college",
    "coding",
    "club",
    "community",
    "programming",
    "question papers",
    "textbooks",
    "lab manuals",
    "syllabus",
    "Python compiler",
    "coding practice",
    "competitive programming",
    "computer science",
    "Karnataka",
    "Bantwal",
    "education",
  ],
  authors: [{ name: "DKPUCS Team" }],
  creator: "DKPUCS",
  publisher: "DKPUCS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dkpucs.vercel.app",
    siteName: "DKPUCS",
    title: "DKPUCS - Learn, Code, Grow",
    description:
      "Official website for DKPUCS students. Access previous year question papers, syllabus, textbooks, lab manuals, and online Python compiler.",
    images: [
      {
        url: "https://dkpucs.vercel.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "DKPUCS - Learn, Code, Grow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DKPUCS - Learn, Code, Grow",
    description:
      "Official website for DKPUCS students. Access previous year question papers, syllabus, textbooks, lab manuals, and online Python compiler.",
    images: ["https://dkpucs.vercel.app/android-chrome-512x512.png"],
    creator: "@dkpucs",
    site: "@dkpucs",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app",
  },
  category: "education",
};

/**
 * Root layout component that provides the global HTML structure, theme provider, and site-wide trackers.
 *
 * @param children - The page content to render inside the layout
 * @returns The root HTML element containing the themed body, rendered children, and path-based tracker
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`overflow-x-hidden ${jetbrainsMono.variable} font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={null}>{children}</Suspense>
            <PathBasedTracker />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
