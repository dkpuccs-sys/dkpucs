import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import NavBar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Story from "@/components/landing/Story";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}