'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export function FluidNav() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Beyond', href: '#beyond' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <div className="fixed top-6 md:top-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
        {/* Menu Pill Button (Always On) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-[background-color,transform] hover:bg-white/10 active:scale-[0.97] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span>{isOpen ? 'Close' : 'Menu'}</span>
          <div className="relative h-3 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1px] w-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[1px] w-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              )}
            />
          </div>
        </button>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl"
          >
            <nav className="flex flex-col items-center gap-8 text-center">
              {links.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ transform: 'translateY(100%)', opacity: 0 }}
                    animate={{ transform: 'translateY(0%)', opacity: 1 }}
                    exit={{ transform: 'translateY(100%)', opacity: 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.7,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="block font-serif text-5xl md:text-7xl hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
