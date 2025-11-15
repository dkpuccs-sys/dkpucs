import type React from "react"
import NavBar from "@/components/landing/Navbar"
import { ChatBot } from "@/components/chat-bot"
import Footer from "@/components/landing/Footer"
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
    <div className="overflow-x-hidden">
      <PageViewTracker />
      <NavBar />
      <div className="pt-18">{children}</div>
      {/* <ChatBot /> */}
      <Footer />
    </div>
  )
}
