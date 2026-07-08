'use client'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'motion/react'

interface ProTextTypeProps {
  text: string;
  delay?: number;
  className?: string;
  chars?: string;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export function ProTextType({ 
  text, 
  delay = 0, 
  className = "",
  chars = DEFAULT_CHARS
}: ProTextTypeProps) {
  // Initialize with invisible characters to maintain layout width
  const [displayText, setDisplayText] = useState(text.replace(/[^\s]/g, '\u00A0'));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      let iteration = 0;
      let interval: NodeJS.Timeout;

      const startTimeout = setTimeout(() => {
        interval = setInterval(() => {
          setDisplayText((prev) => {
            return text
              .split("")
              .map((char, index) => {
                if (index < iteration) {
                  return text[index];
                }
                if (char === " ") return " ";
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("");
          });

          if (iteration >= text.length) {
            clearInterval(interval);
            setDisplayText(text); // Ensure final state is exactly the original text
          }
          
          iteration += 1 / 3; // Slow down the scrambling settling (smaller = slower)
        }, 30);
      }, delay * 1000);

      return () => {
        clearTimeout(startTimeout);
        if (interval) clearInterval(interval);
      };
    }
  }, [isInView, text, delay, chars]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
}
