export default function AboutPage() {
  return (
    <main className="w-full bg-background text-foreground min-h-screen relative">
      <div className="absolute inset-0 grid-bg z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col justify-center items-center py-24 px-5">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-primary text-xs uppercase tracking-widest">System Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              About <span className="text-primary">DKPUCS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Initializing the next generation of developers. We are the central processing unit of the college's coding community.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-xl font-bold">M</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed border-l border-primary/20 pl-4">
                To foster a vibrant and inclusive community for students. We aim to provide a platform for academic growth, skill development, and social engagement, preparing our members for future success.
              </p>
            </div>

            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-xl font-bold">V</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed border-l border-primary/20 pl-4">
                To be the leading student organization that empowers individuals to achieve their full potential, promotes collaborative learning, and contributes positively to the college environment.
              </p>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="relative border border-border/50 bg-card/10 p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">What We Do</h2>
                <div className="h-1 w-20 bg-primary mb-6"></div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  / Executing Protocols
                </p>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We organize a variety of events including workshops, seminars, coding competitions, study groups, and social gatherings.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our activities are designed to enhance technical skills, encourage critical thinking, and build strong interpersonal connections among students.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {['Workshops', 'Seminars', 'Hackathons', 'Meetups'].map((item) => (
                    <div key={item} className="text-center p-3 border border-border/50 bg-background/50 text-sm uppercase tracking-wider hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
