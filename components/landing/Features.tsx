"use client"

import Link from "next/link";

const FeatureCard = ({ title, description, video, link }: { title: string; description: string; video: string, link:string }) => {
  return (
    <Link href={link} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
      <video src={video} loop muted autoPlay className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}

const Features = () => (
  <section className="bg-background py-16 px-5 sm:px-10">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <p className="text-sm uppercase text-muted-foreground mb-4">Explore Our Resources</p>
        <p className="text-xl max-w-2xl text-muted-foreground">
          Dive into a comprehensive collection of academic materials, past question papers, and practical guides to help
          you excel in your studies.
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
