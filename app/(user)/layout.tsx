import type React from "react"
import NavBar from "@/components/landing/Navbar"
// import { ChatBot } from "@/components/chat-bot"
import Footer from "@/components/landing/Footer"
import { PageViewTracker } from "@/components/page-view-tracker"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-x-hidden">
      <PageViewTracker />
      <div className="min-h-[calc(100vh-18vh)]">
        <NavBar />
        <div className="pt-18 grow">{children}</div>
        {/* <ChatBot /> */}
      </div>
      <Footer />
    </div>
  )
}
