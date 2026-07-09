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

      {/* The TV Screen Component */}
      <div 
        className="relative w-full max-w-[420px] aspect-[4/3] mx-auto cursor-pointer group/tv"
        onClick={handleNextShow}
      >
        {/* CRT Screen Content — sits BEHIND the TV PNG */}
        <div className="absolute top-[18%] bottom-[20%] left-[16%] right-[22%] overflow-hidden bg-[#050505] z-10 flex items-center justify-center rounded-[20px] shadow-[inset_0_0_40px_rgba(0,0,0,1)]">
          
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

          {/* CRT Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 z-10 mix-blend-overlay"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.08), rgba(0, 255, 0, 0.04), rgba(0, 0, 255, 0.08))',
              backgroundSize: '100% 3px, 6px 100%'
            }}
          />

          {/* Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: [0.8, 1, 0.9, 1, 0.8], scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center justify-center"
              >
                <span className="block text-[0.45rem] uppercase tracking-[0.4em] text-emerald-400/90 mb-2 font-mono" style={{ textShadow: "0 0 5px rgba(52,211,153,0.5)" }}>
                  HDMI 1
                </span>
                <h4 
                  className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight leading-tight"
                  style={{
                    textShadow: `-1.5px 0 1px rgba(255,0,0,0.8), 1.5px 0 1px rgba(0,0,255,0.8), 0 0 15px rgba(255,255,255,0.6)`
                  }}
                >
                  {currentShow.title}
                </h4>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screen Glare */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-bl from-white/0 via-white/5 to-white/10 z-30" />
        </div>

        {/* TV PNG on top — bezel naturally masks the screen content above */}
        <Image 
          src="/tv_mockup_new.png" 
          alt="Retro TV" 
          fill
          sizes="420px"
          className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none drop-shadow-2xl"
        />
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
