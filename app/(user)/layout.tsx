import type React from "react";
import NavBar from "@/components/landing/Navbar";
// import { ChatBot } from "@/components/chat-bot"
import Footer from "@/components/landing/Footer";

/**
 * Layout component that provides a fixed decorative background, navigation bar, content area, and footer.
 *
 * @param children - The page content to render inside the layout between the navigation bar and the footer.
 * @returns The JSX element representing the composed page layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden relative">
      <div className="fixed inset-0 grid-bg pointer-events-none -z-10" />
      <div className="min-h-[calc(100vh-18vh)]">
        <NavBar />
        <div className="pt-18 grow">{children}</div>
        {/* <ChatBot /> */}
      </div>
      <Footer />
    </div>
  );
}
