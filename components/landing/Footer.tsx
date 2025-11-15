"use client"
import { FaDiscord, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    Resources: [
      { name: "Blogs", href: "/blogs" },
      { name: "Lab Manuals", href: "/lab-manuals" },
      { name: "Question Papers", href: "/qps" },
      { name: "Syllabus", href: "/syllabus" },
    ],
    Community: [
      { name: "Code Runner", href: "/runner" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ],
  }

  const socialLinks = [
    { icon: <FaDiscord />, href: "https://discord.com", label: "Discord" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaGithub />, href: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-card border-t border-border relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-semibold text-foreground">DKPUCS</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A community for college coders to learn, share, and grow together.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4 text-sm">{category}</h3>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mb-8"></div>

        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>*/}

        <p className="text-muted-foreground text-sm text-center">© {currentYear} DKPUCS. All rights reserved. Developed by <Link href={"https://gauresh.is-a.dev"} className="underline" target="_blank">GP</Link> and <Link className="underline" href={"https://venjix.kreekarvat.in"} target="_blank">VP</Link>.</p>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-24 right-8 p-3 cursor-pointer rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default Footer
