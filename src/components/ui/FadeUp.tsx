'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  isReady?: boolean;
}

export function FadeUp({ children, delay = 0, className = "", yOffset = 64, isReady = true }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, transform: `translateY(${yOffset}px)` }}
      animate={isInView && isReady ? { opacity: 1, transform: "translateY(0px)" } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.32, 0.72, 0, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
