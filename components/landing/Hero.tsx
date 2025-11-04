"use client"
import { useEffect, useState } from "react"
import { TiLocationArrow } from "react-icons/ti"
import Button from "@/components/landing/Button"

const Hero = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const videoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/dkpucs/public/videos/home-mPu9o7uMnHLCZXRLRb4dviVdR3eijx.mp4"

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-background">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-muted">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">Loading...</div>
          </div>
        </div>
      )}

      <div className="relative z-10 h-dvh w-screen overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover"
          poster="https://picsum.photos/1920/1080"
        />

        <div className="absolute left-0 top-0 z-40 size-full bg-black/30">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="text-5xl sm:text-7xl font-bold text-white">DKPUCS</h1>

            <p className="mb-8 max-w-sm font-regular text-lg text-white/90">
              Welcome to the official website for the students of DKPUCS
            </p>

            <Button
              id="explore-button"
              title="Explore"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-primary text-primary-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
