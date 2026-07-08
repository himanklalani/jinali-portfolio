'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TvShowCard({ className }: { className?: string }) {
  // Keyframes for the grain animation to simulate static
  const keyframesX = ["0%", "-5%", "-15%", "7%", "-5%", "-15%", "15%", "0%", "3%", "-10%"]
  const keyframesY = ["0%", "-10%", "5%", "-25%", "25%", "10%", "0%", "15%", "35%", "10%"]

  return (
    <div className={cn("group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md overflow-hidden", className)}>
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10">
          <Tv className="h-5 w-5 text-white/70" />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-white">Currently Watching</h3>
          <p className="text-sm text-white/50">TV taught me everything about arcs.</p>
        </div>
      </div>

      {/* The TV Screen Component */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
        {/* Grain Background */}
        <motion.div
          animate={{ x: keyframesX, y: keyframesY }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear"
          }}
          className="absolute -inset-[200%] opacity-20 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
            backgroundSize: "250px 250px"
          }}
        />

        {/* CRT Scanlines Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 6px 100%'
          }}
        />

        {/* Screen Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
             initial={{ opacity: 0.8 }}
             animate={{ opacity: [0.8, 1, 0.9, 1, 0.8] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             className="relative"
          >
            <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-emerald-400/80 mb-2 font-mono">Input: HDMI 1</span>
            <h4 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Modern Family
            </h4>
          </motion.div>
        </div>

        {/* Screen Glare */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/5 to-white/10" />
      </div>

      {/* Description / Lessons */}
      <div className="mt-2 flex flex-col gap-3">
        {[
          { show: "The Bear", lesson: "Pace" },
          { show: "Gilmore Girls", lesson: "Voice" },
          { show: "Hacks", lesson: "Reinvention" },
          { show: "Game of Thrones", lesson: "Peak-then-drop" },
        ].map((item, i) => (
          <div key={i} className="group/lesson flex items-center justify-between border-b border-white/5 pb-2 text-sm transition-colors hover:border-white/20 cursor-default">
            <span className="text-white/60 group-hover/lesson:text-white transition-colors">{item.show}</span>
            <span className="font-mono text-xs text-white/30 uppercase tracking-wider group-hover/lesson:text-emerald-400/80 transition-colors">{item.lesson}</span>
          </div>
        ))}
        <p className="mt-2 text-xs font-light text-white/40 italic text-balance">
          Pick a show, I'll tell you what it's taught me about campaigns.
        </p>
      </div>

    </div>
  )
}
