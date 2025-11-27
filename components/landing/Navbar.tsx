"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Announcements", href: "/announcements" },
  { name: "Lab Manuals", href: "/lab-manuals" },
  { name: "QPs", href: "/qps" },
  { name: "Syllabus", href: "/syllabus" },
  { name: "Runner", href: "/runner" },
]

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-none flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-primary font-mono font-bold">D</span>
          </div>
          <span className="font-bold font-mono text-foreground hidden sm:inline tracking-tighter group-hover:text-primary transition-colors">DKPUCS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium font-mono uppercase tracking-wide"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button className="flex flex-col gap-1.5 w-6 h-6 ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span
              className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span
              className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium font-mono uppercase tracking-wide py-2 border-b border-border/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
export default NavBar
