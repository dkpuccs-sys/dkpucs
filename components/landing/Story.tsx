"use client"
import Button from "@/components/landing/Button"

const Story = () => {
  return (
    <div id="story" className="min-h-dvh w-screen bg-card py-20 px-5 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase text-muted-foreground mb-4">Our College Community</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">A vibrant community of learners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="https://picsum.photos/500/500" alt="Community" className="rounded-lg w-full h-96 object-cover" />

          <div>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with fellow students, share knowledge, and grow together in our dynamic and supportive community.
            </p>
            <Button id="community-btn" title="Join Discussion" containerClass="bg-primary text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story
