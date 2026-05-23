"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const StreamingText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startAnimation = () => {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayedText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          timeoutId = setTimeout(startAnimation, 2000);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const initialTimeout = setTimeout(startAnimation, delay * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
};

const Hero = () => {
  const videoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/karnatakapuccs/public/videos/home-mPu9o7uMnHLCZXRLRb4dviVdR3eijx.mp4";

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden bg-background"
    >
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

        {/* Scanline Effect */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]"></div>

        <div className="absolute left-0 top-0 z-40 size-full flex items-center">
          <div className="container mx-auto px-5 sm:px-10">
            <div className="max-w-4xl">
              <div className="hero-content inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/10 backdrop-blur-sm">
                <span className="text-primary font-mono text-xs uppercase tracking-widest">
                  Official Portal v1.0
                </span>
              </div>

              <h1 className="hero-content text-6xl sm:text-8xl font-bold text-foreground tracking-tighter mb-6 flex items-center tech-text-glow">
                <StreamingText text="KarnatakaPUCCS" />
                <span className="text-primary animate-pulse ml-1">_</span>
              </h1>

              <div className="hero-content mb-8 max-w-2xl font-mono text-lg text-muted-foreground border-l-2 border-primary/50 pl-6">
                <p>
                  Welcome to the official website for the students of Karnataka
                  PUC Computer Science.
                </p>
                <p className="mt-2 text-primary flex items-center">
                  <span className="mr-2">&gt;</span>
                  <span>Initialize sequence...</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
