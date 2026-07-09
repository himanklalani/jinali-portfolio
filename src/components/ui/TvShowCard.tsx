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
    <div className={cn("group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md overflow-hidden", className)}>
      
      {/* Header */}
      <div className="flex items-center gap-3">
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
        className="relative w-full aspect-[4/3] cursor-pointer group/tv overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]"
        onClick={handleNextShow}
      >
        <Image 
          src="/tv_mockup.avif" 
          alt="Retro TV" 
          fill
          className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none drop-shadow-2xl opacity-90 mix-blend-screen"
        />

        {/* Inner Screen Area */}
        <div className="absolute inset-0 overflow-hidden bg-black z-10 flex items-center justify-center scale-95">
          {/* Grain Background */}
          <motion.div
            animate={{ x: keyframesX, y: keyframesY }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="absolute -inset-[200%] opacity-20 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
              backgroundSize: "250px 250px"
            }}
          />

          {/* CRT Scanlines Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay z-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 6px 100%'
            }}
          />

          {/* Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: [0.8, 1, 0.9, 1, 0.8], scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center justify-center"
              >
                <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-emerald-400/80 mb-2 font-mono">
                  Input: HDMI 1
                </span>
                <h4 className="font-serif text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  {currentShow.title}
                </h4>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screen Glare */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/5 to-white/10 z-10 rounded-xl" />
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
