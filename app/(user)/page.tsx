import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Story from "@/components/landing/Story";
import Contact from "@/components/landing/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KarnatakaPUCCS - Learn, Code, Grow",
  description:
    "Official website for KarnatakaPUCCS students at Venkataramana Swamy College, Bantwal. Access previous year question papers, syllabus, textbooks, lab manuals, blogs, and online Python compiler.",
  keywords: [
    "KarnatakaPUCCS",
    "computer science",
    "coding club",
    "Bantwal",
    "Karnataka",
    "question papers",
    "syllabus",
    "textbooks",
    "lab manuals",
    "Python compiler",
    "programming",
    "competitive programming",
  ],
  openGraph: {
    title: "KarnatakaPUCCS - Learn, Code, Grow",
    description:
      "Official website for KarnatakaPUCCS students. Access academic resources and join our coding community.",
    url: "https://karnatakapuccs.vercel.app",
    type: "website",
  },
  alternates: {
    canonical: "https://karnatakapuccs.vercel.app",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
    </main>
  );
}
