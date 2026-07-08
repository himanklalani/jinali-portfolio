'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface BlockRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  blockColor?: string;
}

export function BlockReveal({ 
  children, 
  delay = 0, 
  className = "",
  blockColor = "bg-white/20"
}: BlockRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={`relative overflow-hidden w-fit ${className}`}>
      {/* The Sweeping Block */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={isInView ? { x: ["-100%", "0%", "101%"] } : {}}
        transition={{ 
          duration: 1.4, 
          delay, 
          times: [0, 0.5, 1],
          ease: [0.76, 0, 0.24, 1] // Dramatic cubic-bezier for a sharp snap
        }}
        className={`absolute inset-0 z-20 ${blockColor}`}
      />
      
      {/* The Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ 
          duration: 0.01, 
          delay: delay + 0.7 // Reveals instantly at the apex of the block sweep
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
