'use client'

import React, { useRef, useEffect, useState, useMemo, startTransition } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export interface SlideData {
  image: string
  title: string
}

interface DepthCarouselProps {
  slides: SlideData[]
  className?: string
}

function xFor(o: number, c: any) {
  const s = Math.sign(o)
  const a = Math.abs(o)
  const first = c.cardWidth * 0.46 + c.spacing
  const step = c.cardWidth * c.sideScale * 0.62
  return a <= 1 ? o * first : s * (first + (a - 1) * step)
}
function zFor(o: number, c: any) {
  return -Math.min(Math.abs(o), 4) * c.depth
}
function rotFor(o: number, c: any) {
  return -Math.max(-1, Math.min(1, o)) * c.curve
}
function scaleFor(o: number, c: any) {
  return 1 - (1 - c.sideScale) * Math.min(Math.abs(o), 1)
}
function opacityFor(o: number) {
  const a = Math.abs(o)
  return 1 - Math.min(Math.max(a - 3, 0) / 1.3, 1)
}
function blurFor(o: number, c: any) {
  return Math.min(Math.max(Math.abs(o) - 0.35, 0) * 2.6, c.maxBlur)
}

function Card({ slide, index, progress, cfg }: any) {
  const offset = useTransform(progress, (p: number) => index - p)
  const x = useTransform(offset, (o: number) => xFor(o, cfg))
  const z = useTransform(offset, (o: number) => zFor(o, cfg))
  const rotateY = useTransform(offset, (o: number) => rotFor(o, cfg))
  const scale = useTransform(offset, (o: number) => scaleFor(o, cfg))
  const opacity = useTransform(offset, opacityFor)
  const zIndex = useTransform(offset, (o: number) => Math.round(1000 - Math.abs(o) * 10))

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: cfg.cardWidth,
        height: cfg.cardHeight,
        transformStyle: "preserve-3d",
        x, z, rotateY, scale, opacity, zIndex
      }}
    >
      <div 
        style={{
          width: cfg.cardWidth,
          height: cfg.cardHeight,
          borderRadius: cfg.radius,
          overflow: "hidden",
          boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7)",
          background: "rgba(120,120,120,0.12)"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slide.image} alt={slide.title} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none", userSelect: "none" }} />
      </div>

      {cfg.reflection && (
        <div 
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            marginTop: 10,
            width: cfg.cardWidth,
            height: cfg.cardHeight * 0.5,
            borderRadius: cfg.radius,
            overflow: "hidden",
            transform: "scaleY(-1)",
            transformOrigin: "top center",
            opacity: cfg.reflectionStrength,
            pointerEvents: "none",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 62%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 62%)"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
    </motion.div>
  )
}

export function DepthCarousel({ slides, className }: DepthCarouselProps) {
  const n = slides.length
  const reduce = useReducedMotion()
  const target = useMotionValue(0)
  const progress = useSpring(target, { stiffness: 170, damping: 34, mass: 1, restDelta: 0.001 })
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const outerRef = useRef<HTMLDivElement>(null)

  const cfg = useMemo(() => ({
    cardWidth: 460,
    cardHeight: 300,
    sideScale: 0.66,
    spacing: 40,
    depth: 150,
    curve: 42,
    radius: 12,
    maxBlur: 5,
    reflection: true,
    reflectionStrength: 0.3
  }), [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = outerRef.current
    if (!el) return
    
    const clampT = (v: number) => Math.max(0, Math.min(n - 1, v))
    let snapTimer: number
    const commit = (v: number) => {
      const t = clampT(Math.round(v))
      target.set(t)
      startTransition(() => setActive(t))
    }
    
    const scheduleSnap = () => {
      if (snapTimer) window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => commit(target.get()), 160)
    }
    
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(d) < 0.5) return
      e.preventDefault()
      target.set(clampT(target.get() + d * 0.0055))
      scheduleSnap()
    }
    
    let down = false
    let startX = 0
    let startVal = 0
    let lastX = 0
    let lastT = 0
    let vel = 0
    const perCard = Math.max(120, cfg.cardWidth * 0.55)
    
    const onDown = (e: PointerEvent) => {
      down = true
      startX = lastX = e.clientX
      startVal = target.get()
      lastT = performance.now()
      vel = 0
      setDragging(true)
      el.setPointerCapture?.(e.pointerId)
    }
    
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const now = performance.now()
      const dx = e.clientX - startX
      target.set(clampT(startVal - dx / perCard))
      const dt = now - lastT
      if (dt > 0) vel = (e.clientX - lastX) / dt
      lastX = e.clientX
      lastT = now
    }
    
    const onUp = (e: PointerEvent) => {
      if (!down) return
      down = false
      setDragging(false)
      el.releasePointerCapture?.(e.pointerId)
      const projected = target.get() - vel * 150 / perCard
      commit(projected)
    }
    
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    
    return () => {
      if (snapTimer) window.clearTimeout(snapTimer)
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [n, cfg.cardWidth, target])

  const activeCaption = slides[Math.max(0, Math.min(n - 1, active))]?.title
  const edgeStrength = 14
  const edgeSpread = 22

  return (
    <div 
      ref={outerRef} 
      className={cn("relative w-full h-[560px] overflow-hidden flex items-center justify-center touch-pan-y", className)}
      style={{ cursor: dragging ? "grabbing" : "grab" }}
    >
      <div style={{ position: "relative", width: cfg.cardWidth, height: cfg.cardHeight, transformStyle: "preserve-3d", perspective: 1300, perspectiveOrigin: "center" }}>
        {slides.map((slide, i) => (
          <Card key={i} slide={slide} index={i} progress={reduce ? target : progress} cfg={cfg} />
        ))}
      </div>

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${edgeSpread}%`, pointerEvents: "none", zIndex: 1200, background: `linear-gradient(to right, #050505, transparent)` }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${edgeSpread}%`, pointerEvents: "none", zIndex: 1200, background: `linear-gradient(to left, #050505, transparent)` }} />

      <div className="absolute bottom-8 left-0 right-0 flex items-baseline justify-center gap-4 z-[1300] pointer-events-none font-mono text-xs tracking-widest uppercase text-white/90">
        {activeCaption && <span>{activeCaption}</span>}
        <span className="opacity-50">{String(active + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}</span>
      </div>

      <div className="absolute top-8 right-8 opacity-50 z-[1300] pointer-events-none font-mono text-xs tracking-widest uppercase text-white/90">
        Scroll / Drag
      </div>
    </div>
  )
}
