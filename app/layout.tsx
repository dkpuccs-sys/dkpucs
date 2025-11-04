import type React from "react"
import NavBar from "@/components/landing/Navbar"
import { ChatBot } from "@/components/chat-bot"
import "./globals.css"

export const metadata = {
  title: "CodingClub - Learn, Code, Grow",
  description: "College coding club community for learning and competitive programming",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <NavBar />
        <div className="pt-20">{children}</div>
        <ChatBot />
      </body>
    </html>
  )
}
