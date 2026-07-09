'use client';

import React from 'react';
import Image from 'next/image';

const brands = [
  { name: 'Bumble', src: '/brands/bumble.png' },
  { name: 'Swiggy', src: '/brands/swiggy.png' },
  { name: 'Clinique', src: '/brands/clinique.png' },
  { name: 'Mercedes Benz', src: '/brands/mercedes.png' },
  { name: 'Label Ritu Kumar', src: '/brands/ritukumar.png' },
  { name: 'Casa Bacardi', src: '/brands/bacardi.png' },
  { name: 'H&M', src: '/brands/hm.png' },
  { name: 'Nykaa', src: '/brands/nykaa.png' },
  { name: 'Love Beauty & Planet', src: '/brands/lovebeauty.png' },
  { name: 'Noise', src: '/brands/noise.png' },
  { name: 'Coach', src: '/brands/coach.png' },
  { name: 'Mars', src: '/brands/mars.png' },
  { name: 'Zara', src: '/brands/zara.png' },
  { name: 'Myntra', src: '/brands/myntra.png' },
  { name: 'BGMI', src: '/brands/bgmi.png' },
];

export const BrandMarquee = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-center justify-center py-12 md:py-20 border-t border-white/5 bg-[#050505]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: 200%;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-10 text-center px-4">
        Brands & IPs Built With
      </p>

      <div className="relative w-full flex overflow-hidden">
        {/* We duplicate the array inside the track to create a seamless infinite loop */}
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center justify-center flex-shrink-0 w-[15vw] min-w-[120px] md:min-w-[180px] px-8 cursor-default">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <Image 
                  src={brand.src} 
                  alt={brand.name} 
                  fill
                  sizes="(max-width: 768px) 48px, 64px"
                  className="object-contain opacity-40 brightness-0 invert transition-all duration-500 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
