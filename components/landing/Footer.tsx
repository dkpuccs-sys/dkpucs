"use client";
import { FaDiscord, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
  };

  const socialLinks = [
    { icon: <FaDiscord />, href: "https://discord.com", label: "Discord" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaGithub />, href: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background border-t border-border/50 relative pt-16 pb-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-mono font-bold text-lg">
                  D
                </span>
              </div>
              <span className="font-bold font-mono text-foreground tracking-tighter group-hover:text-primary transition-colors">
                DKPUCS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              A community for college coders to learn, share, and grow together.{" "}
              <br />
              <span className="font-mono text-xs text-primary/70 mt-2 block">
                System Status: Online
              </span>
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-bold font-mono text-foreground mb-6 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm hover:pl-1 duration-300 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-mono text-center md:text-left">
            © {currentYear} DKPUCS. All rights reserved.{" "}
            <br className="md:hidden" />
            Developed by{" "}
            <a
              href="https://gauresh.is-a.dev"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GP
            </a>{" "}
            and{" "}
            <a
              className="text-primary hover:underline"
              href="https://venjix.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              VP
            </a>
            .
          </p>

          <div className="flex items-center gap-4">
            {/* Social links could go here if uncommented */}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 p-3 cursor-pointer border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
