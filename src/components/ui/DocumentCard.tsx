'use client'

import { useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

export function DocumentCard() {
  const [isOpen, setIsOpen] = useState(false)

  const springConfig = { stiffness: 280, damping: 20, mass: 0.9 }

  const coverRotateY = useSpring(0, springConfig)
  const paperX = useSpring(0, springConfig)
  const cardY = useSpring(0, { stiffness: 200, damping: 20 })

  const paperOpacity = useTransform(coverRotateY, [-70, -20, 0], [1, 0.3, 0])

  const toggle = () => {
    if (isOpen) {
      coverRotateY.set(0)
      paperX.set(0)
      cardY.set(0)
    } else {
      coverRotateY.set(-70)
      paperX.set(50)
      cardY.set(-6)
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="relative cursor-pointer select-none"
        style={{
          width: 300,
          height: 230,
          perspective: 900,
          y: cardY,
        }}
        onClick={toggle}
      >
        {/* ── BACK BODY — always visible, holds the paper ── */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, #3B82F6, #1D4ED8)',
            boxShadow: '0 20px 50px rgba(29, 78, 216, 0.4), 0 6px 16px rgba(0,0,0,0.25)',
            zIndex: 1,
          }}
        >
          {/* folder tab */}
          <div className="absolute -top-[14px] left-6 h-[14px] w-24 rounded-t-lg bg-[#2563EB]" />

          {/* ── WHITE PAPER (revealed when open) ── */}
          <motion.div
            className="absolute inset-2 rounded-xl overflow-hidden"
            style={{ x: paperX, opacity: paperOpacity, zIndex: 2 }}
          >
            {/* Paper background */}
            <div className="absolute inset-0 bg-[#F8F7F4]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/30">
                  Internal · JM
                </span>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-serif text-blue-600 text-[8px]">JM</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-black/8 w-full" />

              {/* Email */}
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/30">Email</span>
                <a
                  href="mailto:jinalimehta2301@gmail.com"
                  className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  jinalimehta2301@gmail.com
                  <span className="text-[10px]">↗</span>
                </a>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-black/8 w-full" />

              {/* LinkedIn */}
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/30">LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/jinalimehta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  linkedin.com/in/jinalimehta
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── FRONT COVER — rotates open on click ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            rotateY: coverRotateY,
            zIndex: 10,
            transformOrigin: 'left center',
            background: 'linear-gradient(155deg, #60A5FA 0%, #2563EB 60%, #1E40AF 100%)',
            boxShadow: '0 20px 50px rgba(29,78,216,0.45), 0 6px 16px rgba(0,0,0,0.3)',
          }}
        >
          {/* Tab */}
          <div className="absolute -top-[14px] left-6 h-[14px] w-24 rounded-t-lg bg-[#3B82F6]" />

          {/* Sheen */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%)',
            }}
          />

          {/* JM monogram */}
          <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center bg-white/10">
            <span className="font-serif text-white text-[11px] font-medium">JM</span>
          </div>

          {/* Cover text */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-7 pb-8 gap-1.5">
            <div className="w-8 h-[1px] bg-white/40 mb-1" />
            <h3 className="font-serif text-3xl text-white font-light leading-tight drop-shadow-md">
              Contact
            </h3>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 mt-1">
              Jinali Mehta
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Tap hint */}
      <motion.span
        className="font-mono text-[9px] uppercase tracking-widest text-white/30"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Tap to open
      </motion.span>
    </div>
  )
}
