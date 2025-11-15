const About = () => {
  return (
    <div id="about" className="min-h-screen w-screen py-16 px-5 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase text-muted-foreground mb-4">DKPUCS Official Portal</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Association of College Students</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your one-stop portal for resources, news, and events.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden">
          <img src="/hero.jpg" alt="College Campus" className="w-full h-96 object-cover" />
        </div>
      </div>
    </div>
  )
}

export default About