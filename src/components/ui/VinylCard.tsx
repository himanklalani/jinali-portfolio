'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

interface VinylCardProps {
  title: string
  type: string
  year: string
  coverImage: string
  songLink: string
}

export function VinylCard({ title, type, year, coverImage, songLink }: VinylCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleCoverClick = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVinylClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPlaying) {
      window.open(songLink, '_blank', 'noopener,noreferrer')
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }

  return (
    <div 
      className="relative flex flex-col gap-4 w-full max-w-[220px] cursor-pointer group"
      onClick={handleCoverClick}
    >
      <div className="relative aspect-square w-full">
        {/* Vinyl Disc */}
        <motion.div
          onClick={handleVinylClick}
          animate={isPlaying ? { x: '60%', rotate: 180 } : { x: '0%', rotate: 0 }}
          whileHover={!isPlaying ? { x: '15%', rotate: 25 } : undefined}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="absolute inset-0 w-full h-full rounded-full overflow-hidden shadow-xl border border-white/5"
        >
           {/* Vinyl Grooves Background */}
           <div className="absolute inset-0 bg-[#0a0a0a] rounded-full" style={{
              background: 'repeating-radial-gradient(circle at center, #1a1a1a, #1a1a1a 2px, #0f0f0f 2px, #0f0f0f 4px)'
           }} />
           
           {/* Reflection */}
           <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent mix-blend-overlay rounded-full" />
           
           {/* Center Label */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full overflow-hidden border-[3px] border-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Label" className="w-full h-full object-cover opacity-80" />
           </div>
           
           {/* Center Hole */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#050505] rounded-full border border-black/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
        </motion.div>

        {/* Album Cover / Sleeve */}
        <motion.div 
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden shadow-2xl z-10 border border-white/10"
          animate={isPlaying ? { scale: 0.98 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          
          {/* Subtly glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 z-10">
        <h4 className="text-white font-medium text-sm group-hover:text-white/80 transition-colors">{title}</h4>
        <div className="flex items-center gap-2 text-white/40 text-xs font-light">
          <span>{type}</span>
          <span className="text-[10px]">●</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  )
}
