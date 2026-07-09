'use client';

import React from 'react';
import Image from 'next/image';

const brands: { name: string; src: string; needsBg?: boolean }[] = [
  { name: 'Campus', src: '/logo/CAMPUS.png', needsBg: true },
  { name: 'Clinique', src: '/logo/Clinique-Logo-SVG_004.svg' },
  { name: 'Maybelline', src: '/logo/Maybelline-logo-3.svg' },
  { name: 'Nars', src: '/logo/NARS-Cosmetics-Logo-SVG.svg', needsBg: true },
  { name: 'Noise', src: '/logo/Noise.svg', needsBg: true },
  { name: 'Saint Laurent', src: '/logo/Saint-Laurent-Logo-1.svg', needsBg: true },
  { name: 'Tira', src: '/logo/Tira_logo.webp' },
  { name: 'Amazon', src: '/logo/amazon.svg', needsBg: true },
  { name: 'Beco', src: '/logo/beco.jpeg' },
  { name: 'Caudalie', src: '/logo/caudalie-seeklogo-2.svg', needsBg: true },
  { name: 'Crocs', src: '/logo/crocs-wordmark.svg' },
  { name: 'Foxtale', src: '/logo/foxtale.png', needsBg: true },
  { name: 'Instax', src: '/logo/instax.svg', needsBg: true },
  { name: 'Kerastase', src: '/logo/kerastase.svg', needsBg: true },
  { name: 'Kiehls', src: '/logo/kiehls-logo.svg', needsBg: true },
  { name: 'Mercedes', src: '/logo/mercedes.svg' },
  { name: 'Myntra', src: '/logo/myntra.png' },
  { name: 'Nykaa', src: '/logo/nykaa-1.svg' },
  { name: 'OnePlus', src: '/logo/oneplus-2.svg' },
  { name: 'Rayban Meta', src: '/logo/rayban meta.png', needsBg: true },
  { name: 'Skechers', src: '/logo/skechers-3.svg' },
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
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-10 text-center px-4">
        Brands & IPs Built With
      </p>

      <div className="relative w-full overflow-hidden">
        {/* We duplicate the array inside the track to create a seamless infinite loop */}
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center justify-center flex-shrink-0 w-[15vw] min-w-[120px] md:min-w-[180px] px-8 cursor-default">
              <div className={`relative h-12 md:h-16 flex items-center justify-center transition-all ${brand.needsBg ? 'w-24 md:w-32 bg-white/90 px-4 py-2 rounded-xl' : 'w-12 md:w-16'}`}>
                <Image 
                  src={brand.src} 
                  alt={brand.name} 
                  fill
                  sizes="(max-width: 768px) 48px, 64px"
                  className="object-contain opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
