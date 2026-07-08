'use client'

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

type InteractiveBookProps = {
  pages: React.ReactNode[]
  className?: string
  width?: number
  height?: number
}

export function InteractiveBook({ 
  pages, 
  className,
}: InteractiveBookProps) {
  // Ensure even number of pages
  const allPages = pages.length % 2 === 0 ? pages : [...pages, <div key="blank" className="w-full h-full bg-[#111]" />]
  
  const leafPairs: [React.ReactNode, React.ReactNode][] = []
  for (let i = 0; i < allPages.length; i += 2) {
    leafPairs.push([allPages[i], allPages[i + 1]])
  }
  
  const totalLeaves = leafPairs.length
  const [flippedCount, setFlippedCount] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleClick = async () => {
    if (isAnimating) return
    
    if (flippedCount < totalLeaves) {
      // Flip next page
      setFlippedCount(prev => prev + 1)
    } else {
      // Close book
      setIsAnimating(true)
      for (let i = totalLeaves - 1; i >= 0; i--) {
        setFlippedCount(i)
        await new Promise(r => setTimeout(r, 120))
      }
      setIsAnimating(false)
    }
  }

  return (
    <div 
      className={cn("relative flex items-center justify-center cursor-pointer perspective-[2500px]", className)}
      onClick={handleClick}
    >
      <motion.div
        animate={{ 
          x: flippedCount === 0 ? "0%" : "50%", // Shift right when opened to keep it centered
        }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-[140px] h-[200px] sm:w-[160px] sm:h-[230px] md:w-[150px] md:h-[210px] lg:w-[180px] lg:h-[260px]"
      >
        {leafPairs.map(([frontContent, backContent], index) => {
          const isFlipped = index < flippedCount
          const isFlipping = index === flippedCount - 1
          const zOffset = isFlipped ? index * 0.4 : (totalLeaves - index) * 0.4
          const zIndex = isFlipping ? 100 : isFlipped ? index : totalLeaves - index

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 origin-left"
              style={{
                transformStyle: "preserve-3d",
                zIndex,
                transform: `translateZ(${zOffset}px)`,
                willChange: "transform"
              }}
            >
              {/* Front Face (Right Page) */}
              <div 
                className="absolute inset-0 overflow-hidden border border-white/10 bg-[#0a0a0a]"
                style={{ 
                  backfaceVisibility: "hidden", 
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "0 12px 12px 0",
                }}
              >
                {frontContent}
                {/* Spine Shadow */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none"
                  style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)" }} 
                />
              </div>

              {/* Back Face (Left Page) */}
              <div 
                className="absolute inset-0 overflow-hidden border border-white/10 bg-[#0a0a0a]"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "12px 0 0 12px",
                  transform: "rotateY(180deg) translateZ(0.1px)"
                }}
              >
                {backContent}
                {/* Spine Shadow */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none"
                  style={{ background: "linear-gradient(to left, rgba(0,0,0,0.6), transparent)" }} 
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Interaction Hint */}
      <motion.div 
        animate={{ opacity: flippedCount === 0 ? 1 : 0 }}
        className="absolute bottom-0 text-xs tracking-widest text-white/40 uppercase font-mono"
      >
        Click to open
      </motion.div>
    </div>
  )
}
