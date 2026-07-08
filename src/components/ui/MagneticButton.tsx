'use client'
import { useRef } from 'react'
import { motion, useSpring, useMotionTemplate } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  withArrow?: boolean;
}

export function MagneticButton({ children, onClick, className = "", withArrow = true }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((e.clientX - left - width / 2) * 0.3)
    y.set((e.clientY - top - height / 2) * 0.3)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const transform = useMotionTemplate`translate(${x}px, ${y}px)`

  return (
    <motion.button 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave}
      style={{ transform }}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-4 rounded-full bg-white text-black font-medium active:scale-[0.97] transition-[background-color,color] duration-300 ${withArrow ? 'pl-6 pr-2 py-2' : 'px-6 py-3'} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-black/20 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </div>
      )}
    </motion.button>
  )
}
