import { getDiscussions } from "@/lib/data"

export default async function DiscussionPage() {
  let discussions = []
  try {
    discussions = await getDiscussions()
  } catch (error) {
    console.error("Error fetching discussions:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Discussion Forum</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect with fellow coders, share ideas, ask questions, and learn from the community.
          </p>
        </div>

        {/* Discussion Threads */}
        {discussions.length > 0 ? (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-foreground flex-1 truncate">{discussion.title}</h2>
                      <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                        {discussion.tag || "General"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{discussion.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{discussion.author || "Anonymous"}</span>
                      <span>•</span>
                      <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{discussion.replies || 0} replies</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2">No discussions yet</p>
              <p className="text-sm text-muted-foreground">Be the first to start a discussion!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
