'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

export function CharacterAvatar() {
  const [isWinking, setIsWinking] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsWinking(true)}
      onHoverEnd={() => setIsWinking(false)}
      onTapStart={() => setIsWinking(true)}
      onTapCancel={() => setIsWinking(false)}
      onTap={() => {
        setIsWinking(true)
        setTimeout(() => setIsWinking(false), 500)
      }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full flex items-center justify-center p-1.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.602 171.877" className="w-full h-full object-contain" overflow="visible">
          <g>
            <path d="M 39.409 13.975 C 68.609 -5.625 122.409 -2.525 128.409 10.475 C 207.909 2.975 204.409 105.975 201.409 123.975 C 199.054 138.107 175.409 146.975 152.909 141.975 C 140.697 139.261 72.409 134.475 45.409 137.475 C 18.409 140.475 4.994 123.975 1.909 114.975 C -4.091 97.475 2.909 38.475 39.409 13.975 Z" fill="#0A0A0A" strokeWidth="5" stroke="#FFFFFF" strokeMiterlimit="10" strokeDasharray=""></path>
            <path d="M 152.448 154.844 C 104.782 189.967 50.424 163.344 39.948 141.344 C 23.397 106.587 47.737 75.802 70.448 51.344 C 82.332 38.546 100.537 19.211 118.448 31.344 C 136.359 43.477 168.765 75.844 173.448 99.844 C 176.277 114.344 180.948 133.844 152.448 154.844 Z" fill="#E5E5E5" strokeWidth="6" stroke="#000000" strokeMiterlimit="10" strokeDasharray=""></path>
            {/* Right Eye */}
            <path d="M 134.803 104.581 C 134.148 107.556 136.156 109.585 139.045 110.221 C 141.934 110.858 145.718 109.809 145.462 105.988 C 145.207 102.167 142.737 99.741 139.848 99.105 C 136.96 98.468 135.071 100.876 134.803 104.581 Z" fill="#000000"></path>
            
            {/* Left Eye (Open) */}
            <motion.path 
              d="M 69.984 104.166 C 70.697 107.402 68.874 109.53 66.176 110.124 C 63.48 110.718 59.886 109.462 60.003 105.34 C 60.119 101.219 62.363 98.676 65.06 98.082 C 67.757 97.489 69.612 100.152 69.984 104.166 Z" 
              fill="#000000"
              animate={{ opacity: isWinking ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            />
            
            {/* Left Eye (Closed / Winking) */}
            <motion.path 
              d="M 61 107 Q 66 110 71 107" 
              fill="transparent"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: isWinking ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            />

            {/* Mouth */}
            <path d="M 86 130.433 C 92.665 140.663 114.875 143.999 121.2 127" fill="transparent" strokeWidth="6" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
            <path d="M 139.495 77.053 C 142.595 77.829 147.005 78.301 147.435 76.583 C 147.866 74.865 146.403 72.244 141.196 70.774 C 135.988 69.305 133.508 69.797 132.614 73.368 C 131.869 76.344 135.675 76.427 139.495 77.053 Z" fill="#000000"></path>
            <path d="M 68.011 79.053 C 64.911 79.829 60.501 80.301 60.071 78.583 C 59.64 76.865 61.102 74.244 66.31 72.774 C 71.517 71.305 73.998 71.797 74.892 75.368 C 75.637 78.344 71.831 78.427 68.011 79.053 Z" fill="#000000"></path>
            <path d="M 106.231 19.433 C 105.038 18.378 103.492 17.863 101.909 18.031 C 100.327 18.199 98.838 19.037 97.793 20.33 C 96.749 21.622 96.243 23.255 96.411 24.836 C 96.579 26.42 97.408 27.822 98.69 28.767 C 99.67 29.484 100.612 30.253 101.509 31.071 C 106.802 35.756 110.796 42.538 108.298 45.706 C 105.855 49.408 102.024 52.73 98.007 56.403 C 96.011 58.298 93.848 60.155 91.979 63.235 C 91.085 64.752 90.27 66.948 90.56 69.267 C 90.832 71.571 92.007 73.365 93.136 74.637 C 95.292 77.183 99.105 79.462 103.009 79.068 C 106.852 78.708 109.778 76.796 112.073 74.301 L 112.676 73.265 C 113.093 71.567 113.285 69.943 112.778 67.939 C 112.499 66.9 111.844 65.65 110.693 64.858 C 109.548 64.058 108.288 63.889 107.282 63.92 C 106.703 63.952 106.158 64.205 105.76 64.626 C 105.358 65.04 105.132 65.593 105.129 66.17 C 105.129 66.741 105.356 67.292 105.76 67.714 C 106.163 68.135 106.711 68.395 107.282 68.42 C 107.707 68.449 107.904 68.58 107.918 68.636 C 107.932 68.686 107.99 68.773 108.046 69.113 C 108.153 69.734 108.004 70.878 107.675 71.742 L 108.278 70.705 C 106.729 72.155 104.478 73.187 102.742 73.116 C 101.01 73.076 99.58 72.116 98.284 70.369 C 97.725 69.613 97.528 68.966 97.567 68.623 C 97.592 68.286 97.745 67.84 98.248 67.139 C 99.259 65.735 101.227 64.116 103.233 62.567 C 107.305 59.411 111.991 56.193 115.91 51.35 C 119.943 46.608 119.525 39.286 117.562 34.792 C 115.649 30.027 112.854 26.287 109.745 22.867 C 108.636 21.66 107.463 20.514 106.231 19.433 Z" fill="#000000"></path>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  )
}
