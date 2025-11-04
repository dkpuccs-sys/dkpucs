import AnimatedTitle from "@/components/landing/AnimatedTitle";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center py-20 px-5">
      <AnimatedTitle
        title="About Our <br /> College Club"
        containerClass="mt-5 !text-black text-center"
      />

      <div className="max-w-4xl mx-auto mt-10 space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-3xl font-bold text-black mb-4">Our Mission</h2>
          <p>
            The DKPUCS Club is dedicated to fostering a vibrant and inclusive community for students of our college. We aim to provide a platform for academic growth, skill development, and social engagement, preparing our members for future success.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-black mb-4">Our Vision</h2>
          <p>
            To be the leading student organization that empowers individuals to achieve their full potential, promotes collaborative learning, and contributes positively to the college environment and beyond.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-black mb-4">What We Do</h2>
          <p>
            We organize a variety of events including workshops, seminars, coding competitions, study groups, and social gatherings. Our activities are designed to enhance technical skills, encourage critical thinking, and build strong interpersonal connections among students.
          </p>
        </section>
      </div>
    </div>
  );
}
