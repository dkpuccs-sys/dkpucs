"use client"

import Link from "next/link";

const FeatureCard = ({ title, description, video, link }: { title: string; description: string; video: string, link: string }) => {
  return (
    <Link href={link} className="group relative overflow-hidden bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-48 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <video src={video} loop muted autoPlay className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="p-6 relative z-20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold font-mono uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h3>
          <span className="text-xs font-mono text-muted-foreground border border-border/50 px-2 py-0.5 group-hover:border-primary/50 group-hover:text-primary transition-colors">0{Math.floor(Math.random() * 9) + 1}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed border-l border-border/50 pl-3 group-hover:border-primary/50 transition-colors">{description}</p>
      </div>
    </Link>
  )
}

const Features = () => (
  <section className="bg-background py-24 px-5 sm:px-10 border-t border-border/50 relative">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
            <p className="text-xs font-mono uppercase text-primary tracking-widest">System Resources</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Explore Modules<span className="text-primary">.</span></h2>
        </div>
        <p className="text-lg max-w-xl text-muted-foreground font-light border-l-2 border-primary/20 pl-4">
          Dive into a comprehensive collection of academic materials, past question papers, and practical guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Syllabus"
          description="Find the detailed syllabus for all your courses and subjects."
          video="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          link="/syllabus"
        />

        <FeatureCard
          title="Question Papers"
          description="Access a vast repository of previous year question papers."
          video="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          link="/qps"
        />

        <FeatureCard
          title="Practicals"
          description="Get access to practical guides and materials for your lab sessions."
          video="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          link="/practicals"
        />
      </div>
    </div>
  </section>
)

export default Features
