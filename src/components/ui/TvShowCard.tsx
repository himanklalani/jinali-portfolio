'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Tv } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const shows = [
  { title: "Modern Family", lesson: "Timing" },
  { title: "The Bear", lesson: "Pace" },
  { title: "Gilmore Girls", lesson: "Voice" },
  { title: "Hacks", lesson: "Reinvention" },
  { title: "Game of Thrones", lesson: "Peak-then-drop" },
  { title: "The Office", lesson: "Relatability" },
]

export function TvShowCard({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Keyframes for the grain animation to simulate static
  const keyframesX = ["0%", "-5%", "-15%", "7%", "-5%", "-15%", "15%", "0%", "3%", "-10%"]
  const keyframesY = ["0%", "-10%", "5%", "-25%", "25%", "10%", "0%", "15%", "35%", "10%"]

  const handleNextShow = () => {
    setCurrentIndex((prev) => (prev + 1) % shows.length)
  }

  const currentShow = shows[currentIndex]

  return (
    <div className={cn("group relative flex flex-col items-center gap-8 w-full max-w-xl mx-auto", className)}>
      
      {/* Header */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/10">
          <Tv className="h-5 w-5 text-white/70" />
        </div>
        <div>
          <h3 className="font-serif text-xl md:text-2xl text-white leading-tight">Currently Watching</h3>
          <p className="text-xs md:text-sm text-white/50">TV taught me everything about arcs.</p>
        </div>
      </div>

      {/* The Cinematic Screen Component */}
      <div 
        className="relative w-full aspect-[16/9] mx-auto cursor-pointer group/screen overflow-hidden bg-[#050505] rounded-3xl border border-white/5 shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
        onClick={handleNextShow}
      >
        {/* Animated Grain Background (BetterGrain style) */}
        <motion.div
          animate={{ x: keyframesX, y: keyframesY }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
          className="absolute -inset-[100%] opacity-25 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
            backgroundSize: "256px 256px"
          }}
        />

        {/* Soft Vignette / Inner Edge Shadow */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] z-10" />

        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-white/5 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Screen Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <span className="block text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-4 font-mono">
                Now Playing
              </span>
              
              <h4 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/90 font-medium tracking-tight drop-shadow-2xl">
                {currentShow.title}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Description / Lessons */}
      <div className="mt-2 flex flex-col gap-3">
        {shows.map((item, i) => (
          <div 
            key={i} 
            className={cn(
              "group/lesson flex items-center justify-between border-b border-white/5 pb-2 text-sm transition-all duration-300 ease-out cursor-default",
              i === currentIndex ? "border-emerald-500/30" : "hover:border-white/20"
            )}
          >
            <span className={cn(
              "transition-colors duration-200 ease-out",
              i === currentIndex ? "text-emerald-400 font-medium" : "text-white/60 group-hover/lesson:text-white"
            )}>
              {item.title}
            </span>
            <span className={cn(
              "font-mono text-xs uppercase tracking-wider transition-colors duration-200 ease-out",
              i === currentIndex ? "text-emerald-400/80 font-bold" : "text-white/30 group-hover/lesson:text-white/60"
            )}>
              {item.lesson}
            </span>
          </div>
        ))}
        <p className="mt-2 text-xs font-light text-white/40 italic text-balance text-center">
          Tap the TV to change the channel.
        </p>
      </div>

    </div>
  )
}
