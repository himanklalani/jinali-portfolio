'use client'

import { useState, useEffect, useRef, useId } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const VINTAGE_FILTER = "sepia(0.65) contrast(1.15) brightness(0.9) saturate(0.6)"
const VIGNETTE = "radial-gradient(ellipse at center, transparent 50%, rgba(20,10,0,0.65) 100%)"
const MIN_FILL_PX = 4000

function buildTiledImages(images: string[], frameSize: number, frameGap: number) {
  if (images.length === 0) return []
  const singleSetPx = images.length * frameSize + Math.max(0, images.length - 1) * frameGap
  const repeats = Math.ceil(MIN_FILL_PX / singleSetPx)
  const tiled = []
  for (let r = 0; r < repeats; r++) {
    for (const img of images) {
      tiled.push(img)
    }
  }
  return tiled
}

function PerfRow({
  isH, length, thickness, stripColor, holeW, holeH, holeR, gap, uid, patternOffset = 0
}: any) {
  const svgW = isH ? length : thickness
  const svgH = isH ? thickness : length
  const tileLen = holeW + gap
  const patW = isH ? tileLen : thickness
  const patH = isH ? thickness : tileLen
  const holeX = isH ? gap / 2 : (thickness - holeW) / 2
  const holeY = isH ? (thickness - holeH) / 2 : gap / 2
  
  const patX = isH ? -patternOffset : 0
  const patY = isH ? 0 : -patternOffset
  const patId = `pp-${uid}`
  const maskId = `pm-${uid}`
  
  return (
    <svg width={svgW} height={svgH} style={{ display: "block", flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={patId} x={patX} y={patY} width={patW} height={patH} patternUnits="userSpaceOnUse">
          <rect width={patW} height={patH} fill="white" />
          <rect x={holeX} y={holeY} width={holeW} height={holeH} rx={holeR} ry={holeR} fill="black" />
        </pattern>
        <mask id={maskId}>
          <rect width={svgW} height={svgH} fill={`url(#${patId})`} />
        </mask>
      </defs>
      <rect width={svgW} height={svgH} fill={stripColor} mask={`url(#${maskId})`} />
    </svg>
  )
}

function Frame({ src, displayIndex, isVin, frameWidth, frameHeight, brandLabel }: any) {
  return (
    <div style={{ position: "relative", width: frameWidth, height: frameHeight, flexShrink: 0, overflow: "hidden" }}>
      {/* Use Next.js optimized Image component */}
      <Image 
        src={src} 
        alt="" 
        fill
        sizes="180px"
        className="object-cover pointer-events-none"
        style={{ filter: isVin ? VINTAGE_FILTER : "none", display: "block" }} 
      />
      <div style={{ position: "absolute", inset: 0, background: VIGNETTE, opacity: isVin ? 1 : 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 4, right: 5, fontFamily: "'Courier New', monospace", fontSize: 10, color: isVin ? "rgba(200,160,70,0.75)" : "rgba(255,255,255,0.35)", pointerEvents: "none", letterSpacing: "0.1em" }}>
        {String(displayIndex + 1).padStart(2, "0")}A
      </div>
      {brandLabel && (
        <div style={{ position: "absolute", bottom: 4, left: 5, fontFamily: "'Courier New', monospace", fontSize: 9, color: isVin ? "rgba(180,140,60,0.55)" : "rgba(255,255,255,0.2)", letterSpacing: "0.12em", textTransform: "uppercase", pointerEvents: "none" }}>
          {brandLabel}
        </div>
      )}
    </div>
  )
}

function StripHalf({
  tiledImages, originalCount, isVin, frameWidth, frameHeight, brandLabel, stripColor, perfThickness, holeW, holeH, holeR, holeGap, frameGap, perfOffset, halfId
}: any) {
  const frameSize = frameWidth
  const framesLength = tiledImages.length * frameSize + tiledImages.length * frameGap
  const tileLen = holeW + holeGap
  const phaseOffset = perfOffset % tileLen
  
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <PerfRow isH={true} length={framesLength} thickness={perfThickness} stripColor={stripColor} holeW={holeW} holeH={holeH} holeR={holeR} gap={holeGap} uid={`${halfId}-t`} patternOffset={phaseOffset} />
      <div style={{ display: "flex", flexDirection: "row", flexShrink: 0, background: stripColor, gap: frameGap, paddingRight: frameGap }}>
        {tiledImages.map((src: string, i: number) => {
          const origIdx = i % originalCount
          return (
            <Frame key={i} src={src} displayIndex={origIdx} isVin={isVin} frameWidth={frameWidth} frameHeight={frameHeight} brandLabel={brandLabel} />
          )
        })}
      </div>
      <PerfRow isH={true} length={framesLength} thickness={perfThickness} stripColor={stripColor} holeW={holeW} holeH={holeH} holeR={holeR} gap={holeGap} uid={`${halfId}-b`} patternOffset={phaseOffset} />
    </div>
  )
}

interface FilmStripProps {
  images: string[]
  speed?: number
  mode?: "clean" | "vintage"
  className?: string
  brandLabel?: string
}

export function FilmStrip({
  images,
  speed = 60,
  mode = "vintage",
  className,
  brandLabel = "JINALI MEHTA"
}: FilmStripProps) {
  const baseId = useId().replace(/:/g, '')
  const instanceId = useRef(`fs-${baseId}`)
  const tickerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  
  const frameWidth = 180
  const frameHeight = 120
  const stripColor = "#111111"
  const perfThickness = 24
  const holeWidth = 16
  const holeHeight = 11
  const holeRadius = 2
  const holeGap = 10
  const frameGap = 2
  const fadeWidth = 100
  
  const isVin = mode === "vintage"
  
  const tiledImages = buildTiledImages(images, frameWidth, frameGap)
  const halfLength = tiledImages.length * frameWidth + tiledImages.length * frameGap

  useEffect(() => {
    let lastTime: number | null = null
    function tick(now: number) {
      if (!pausedRef.current) {
        if (lastTime !== null) {
          const delta = now - lastTime
          const pxPerMs = halfLength / (speed * 1000)
          const step = pxPerMs * delta
          posRef.current += step
          if (posRef.current >= halfLength) posRef.current -= halfLength
        }
        lastTime = now
      } else {
        lastTime = null
      }
      
      const el = tickerRef.current
      if (el) {
        el.style.transform = `translate3d(-${posRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [halfLength, speed])

  const halfProps = {
    tiledImages, originalCount: images.length, isVin, frameWidth, frameHeight, brandLabel, stripColor, perfThickness, holeW: holeWidth, holeH: holeHeight, holeR: holeRadius, holeGap, frameGap
  }
  
  const tileLen = holeWidth + holeGap
  const setBOffset = halfLength % tileLen
  const fadeMask = `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`

  return (
    <div 
      className={cn("relative overflow-hidden flex items-center justify-center opacity-90", className)}
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask
      }}
      onMouseEnter={() => pausedRef.current = true}
      onMouseLeave={() => pausedRef.current = false}
    >
      <div ref={tickerRef} style={{ display: "flex", flexDirection: "row", willChange: "transform" }}>
        <StripHalf {...halfProps} halfId={`${instanceId.current}-a`} perfOffset={0} />
        <StripHalf {...halfProps} halfId={`${instanceId.current}-b`} perfOffset={setBOffset} />
      </div>
    </div>
  )
}
