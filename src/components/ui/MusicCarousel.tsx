'use client'

import React, { useState, useCallback } from "react"
import { motion, PanInfo, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface Track {
  id: string
  title: string
  artist: string
  coverImage: string
  songLink: string
}

interface MusicCarouselProps {
  tracks: Track[]
  className?: string
  cardWidth?: number
  cardHeight?: number
}

export function MusicCarousel({ 
  tracks, 
  className,
  cardWidth = 260,
  cardHeight = 260
}: MusicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  
  const gap = 40
  const sideScale = 0.75
  const centerScale = 1
  const rotateY = 35
  const perspective = 1200
  const length = tracks.length

  const getCardPosition = (index: number) => {
    let diff = index - currentIndex
    if (diff > length / 2) diff -= length
    if (diff < -length / 2) diff += length
    
    const absDistance = Math.abs(diff)
    const isCenter = diff === 0
    const isLeft = diff < 0
    
    const distanceFactor = Math.min(absDistance, 3)
    const scale = isCenter ? centerScale : Math.max(0.4, sideScale - distanceFactor * 0.1)
    const direction = isLeft ? -1 : diff > 0 ? 1 : 0
    const xOffset = isCenter ? 0 : direction * (cardWidth * 0.5 + gap + absDistance * 40)
    const zOffset = isCenter ? 100 : -absDistance * 50
    const yRotation = isCenter ? 0 : isLeft ? rotateY : -rotateY
    const zIndex = 100 - absDistance
    
    return { x: xOffset, scale, z: zOffset, rotateY: yRotation, zIndex, isCenter }
  }

  const navigateTo = useCallback((index: number) => {
    setCurrentIndex(index)
    setPlayingIndex(null) // Reset playing state when navigating
  }, [])

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const { offset, velocity } = info
    const swipeThreshold = 50
    const swipeVelocityThreshold = 500
    
    const shouldNavigate = Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > swipeVelocityThreshold
    if (shouldNavigate) {
      if (offset.x > 0) {
        navigateTo((currentIndex - 1 + length) % length)
      } else {
        navigateTo((currentIndex + 1) % length)
      }
    }
  }, [currentIndex, length, navigateTo])

  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      navigateTo(index)
    } else {
      // Toggle vinyl pop-out
      setPlayingIndex(playingIndex === index ? null : index)
    }
  }

  const handleVinylClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation()
    window.open(link, '_blank', 'noopener,noreferrer')
    setPlayingIndex(null)
  }

  if (length === 0) return null

  return (
    <div 
      className={cn("relative flex flex-col items-center justify-center overflow-visible", className)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing w-full h-[450px]"
      >
        {tracks.map((track, index) => {
          const pos = getCardPosition(index)
          const isPlaying = playingIndex === index

          return (
            <motion.div
              key={track.id}
              animate={{ 
                x: pos.x, 
                scale: pos.scale, 
                z: pos.z, 
                rotateY: pos.rotateY 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              className="absolute flex items-center justify-center"
              style={{ 
                zIndex: pos.zIndex, 
                transformStyle: "preserve-3d",
                width: cardWidth,
                height: cardHeight,
                pointerEvents: "none"
              }}
            >
              <div 
                onClick={() => handleCardClick(index)}
                className={cn(
                  "relative w-full h-full transition-all duration-500 ease-out", 
                  pos.isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-40 blur-[2px]"
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Vinyl Disc */}
                <motion.div
                  onClick={(e) => handleVinylClick(e, track.songLink)}
                  animate={isPlaying ? { x: '55%', rotate: 180 } : { x: '0%', rotate: 0 }}
                  whileHover={!isPlaying && pos.isCenter ? { x: '15%', rotate: 25 } : undefined}
                  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                  className="absolute inset-0 w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/5 cursor-pointer z-0"
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
                      <img src={track.coverImage} alt="Label" className="w-full h-full object-cover opacity-80" />
                   </div>
                   
                   {/* Center Hole */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#050505] rounded-full border border-black/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                </motion.div>

                {/* Album Cover */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 z-10 bg-black cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover block" />
                  
                  {/* Bottom Text Overlay Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                    <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/70 mb-1 font-mono">
                      {track.artist}
                    </div>
                    <div className="text-xl font-bold font-serif leading-tight">
                      {track.title}
                    </div>
                  </div>
                </div>

                {/* Reflection (Underneath) */}
                <div 
                  className="absolute top-[100%] left-0 right-0 h-[100px] overflow-hidden pointer-events-none mt-2 rounded-2xl z-10"
                  style={{ 
                    transform: "scaleY(-1)", 
                    opacity: pos.isCenter ? 0.4 : 0.4 * pos.scale 
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={track.coverImage} alt="" className="w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent" />
                  <div className="absolute inset-0 backdrop-blur-[6px]" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Navigation Indicators */}
      <div className="flex gap-2 z-20 mt-8">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => navigateTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to ${track.title}`}
          />
        ))}
      </div>
    </div>
  )
}
