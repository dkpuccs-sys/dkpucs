import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Story from "@/components/landing/Story";
import Contact from "@/components/landing/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DKPUCS - Learn, Code, Grow",
  description: "Official website for DKPUCS students at Venkataramana Swamy College, Bantwal. Access previous year question papers, syllabus, textbooks, lab manuals, blogs, and online Python compiler.",
  keywords: [
    "DKPUCS",
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
    title: "DKPUCS - Learn, Code, Grow",
    description: "Official website for DKPUCS students. Access academic resources and join our coding community.",
    url: "https://dkpucs.vercel.app",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app",
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
