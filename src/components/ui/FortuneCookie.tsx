'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function FortuneCookie() {
  const [frame, setFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const totalFrames = 31;
  const frameInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Preload images for smooth playback
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/fortune_cookie/frame_${i.toString().padStart(3, '0')}.jpg`;
    }
  }, []);

  const handleClick = () => {
    if (isPlaying || isFinished) return;
    setIsPlaying(true);
    
    frameInterval.current = setInterval(() => {
      setFrame(prev => {
        if (prev >= totalFrames) {
          if (frameInterval.current) clearInterval(frameInterval.current);
          setIsPlaying(false);
          setIsFinished(true);
          return totalFrames;
        }
        return prev + 1;
      });
    }, 40); // 25fps
  };

  return (
    <div 
      className="relative w-full max-w-[240px] aspect-square mx-auto cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
      onClick={handleClick}
    >
      <img 
        src={`/fortune_cookie/frame_${frame.toString().padStart(3, '0')}.jpg`}
        alt="Interactive Fortune Cookie"
        className="w-full h-full object-cover scale-[1.05]"
        draggable={false}
      />
      
      {!isPlaying && !isFinished && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
           <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-semibold tracking-widest uppercase text-white/80 border border-white/20">
             Tap to open
           </span>
        </div>
      )}
      
      <AnimatePresence>
        {frame >= 25 && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="absolute top-[56%] left-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg]">
              <div className="font-mono text-black/90 text-[10px] uppercase tracking-[0.2em] mix-blend-multiply opacity-100 font-bold text-center flex flex-col gap-0.5">
                <span>You're meant</span>
                <span>to be here</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
