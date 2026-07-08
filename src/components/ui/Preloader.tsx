'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReadyToExit, setIsReadyToExit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Start the minimum cinematic timer (2.5 seconds to reach 99%)
    const minimumTime = 2500;
    const intervalTime = minimumTime / 99;
    
    let currentProgress = 0;
    const counterInterval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 99) {
        clearInterval(counterInterval);
        setProgress(99);
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    // 2. Check for actual asset loading completion
    let assetsLoaded = false;
    
    const handleLoad = () => {
      assetsLoaded = true;
      checkCompletion();
    };

    if (document.readyState === 'complete') {
      assetsLoaded = true;
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 3. Completion Check Logic
    const checkCompletion = () => {
      // If we hit 99 on the timer AND assets are loaded, we can finish.
      if (currentProgress >= 99 && assetsLoaded) {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for the slide-out animation to finish
        }, 400); // Small pause at 100% for impact
      }
    };

    // We need to continuously check if both conditions are met once the timer hits 99
    const completionInterval = setInterval(() => {
      if (currentProgress >= 99) {
        checkCompletion();
        if (currentProgress >= 99 && assetsLoaded) {
          clearInterval(completionInterval);
        }
      }
    }, 100);

    return () => {
      clearInterval(counterInterval);
      clearInterval(completionInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  // Lock body scroll while preloader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ transform: 'translateY(-100%)' }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Ethereal Glass Background for the Preloader */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen">
            <div className="absolute h-[600px] w-[600px] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          </div>

          <div className="noise-overlay" />

          <div className="relative z-10 flex flex-col items-center">
            {/* The Counter */}
            <div className="font-serif text-[8rem] md:text-[12rem] leading-none text-transparent bg-clip-text bg-[linear-gradient(180deg,white,rgba(255,255,255,0.2))] tracking-tighter">
              {progress.toString().padStart(2, '0')}
              <span className="text-4xl md:text-6xl text-white/40 tracking-normal ml-2">%</span>
            </div>
            
            <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white origin-left"
                animate={{ transform: `scaleX(${progress / 100})` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            
            <div className="mt-4 text-xs font-mono tracking-widest text-white/40 uppercase">
              {progress < 99 ? 'Assembling Assets' : progress === 99 ? 'Awaiting Environment' : 'Ready'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
