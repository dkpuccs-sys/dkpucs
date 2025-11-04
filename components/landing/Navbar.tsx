"use client"
import { useState } from "react"
import Link from "next/link"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Practicals", href: "/practicals" },
  { name: "QPs", href: "/qps" },
  { name: "Syllabus", href: "/syllabus" },
  { name: "Discussion", href: "/discussion" },
  { name: "Runner", href: "/runner" },
]

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">C</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">CodingClub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex flex-col gap-1.5 w-6 h-6" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span
            className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span
            className={`h-0.5 w-full bg-foreground transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
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
