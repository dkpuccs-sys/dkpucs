import { getPracticals } from "@/lib/data"

export default async function PracticalsPage() {
  let practicals = []
  try {
    practicals = await getPracticals()
  } catch (error) {
    console.error("Error fetching practicals:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Practicals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hands-on coding exercises to strengthen your programming skills and build real-world problem-solving
            abilities.
          </p>
        </div>

        {/* Practicals Grid */}
        {practicals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicals.map((practical) => (
              <div
                key={practical.id}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                    {practical.difficulty || "Intermediate"}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">{practical.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{practical.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{practical.language || "Python"}</span>
                  <a
                    href={practical.hyperlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 text-sm font-medium"
                  >
                    Start Coding
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2">No practicals available yet</p>
              <p className="text-sm text-muted-foreground">Check back soon for more hands-on coding exercises.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
