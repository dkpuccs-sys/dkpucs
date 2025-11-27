const Hero = () => {
  const videoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/dkpucs/public/videos/home-mPu9o7uMnHLCZXRLRb4dviVdR3eijx.mp4"

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-background">
      <div className="relative z-10 h-dvh w-screen overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover opacity-50 grayscale"
          poster="https://picsum.photos/1920/1080"
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 grid-bg z-20 pointer-events-none"></div>

        <div className="absolute left-0 top-0 z-40 size-full flex items-center">
          <div className="container mx-auto px-5 sm:px-10">
            <div className="max-w-4xl">
              <div className="inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/10 backdrop-blur-sm">
                <span className="text-primary font-mono text-xs uppercase tracking-widest">Official Portal v1.0</span>
              </div>

              <h1 className="text-6xl sm:text-8xl font-bold text-foreground tracking-tighter mb-6">
                DKPUCS<span className="text-primary">_</span>
              </h1>

              <p className="mb-8 max-w-2xl font-mono text-lg text-muted-foreground border-l-2 border-primary/50 pl-6">
                Welcome to the official website for the students of DKPUCS. <br />
                <span className="text-primary">Initialize sequence...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
