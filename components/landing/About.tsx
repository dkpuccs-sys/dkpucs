const About = () => {
  return (
    <div id="about" className="w-screen py-24 px-5 sm:px-10 bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <p className="text-xs font-mono uppercase text-primary tracking-widest">About The Network</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tighter">
              Association of <br />
              <span className="text-primary">College Students</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-8 leading-relaxed">
              Your one-stop portal for resources, news, and events. We are building a community of developers, designers, and innovators.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border/50 bg-card/30">
                <h3 className="text-3xl font-bold font-mono text-primary mb-1">500+</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Active Members</p>
              </div>
              <div className="p-4 border border-border/50 bg-card/30">
                <h3 className="text-3xl font-bold font-mono text-primary mb-1">50+</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Projects Built</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl opacity-50 rounded-full"></div>
            <div className="relative rounded-none overflow-hidden border border-primary/30">
              <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay"></div>
              <img src="/hero.jpg" alt="College Campus" className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-500" />

              {/* Tech UI Elements on Image */}
              <div className="absolute top-4 right-4 z-20 flex gap-1">
                <div className="w-2 h-2 bg-primary animate-pulse"></div>
                <div className="w-2 h-2 bg-primary/50"></div>
                <div className="w-2 h-2 bg-primary/20"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-background/80 backdrop-blur-sm p-4 border-t border-primary/30">
                <p className="font-mono text-xs text-primary uppercase tracking-widest">System.Image.Render(01)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About