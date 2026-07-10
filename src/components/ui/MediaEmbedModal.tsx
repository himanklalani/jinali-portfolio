'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import DomeGallery from './DomeGallery';

interface MenuItem {
  title: string;
  image: string;
  link: string;
  description: string;
}

export function MediaEmbedModal({ items }: { items: MenuItem[] }) {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const getEmbedUrl = (url: string) => {
    if (url.includes('instagram.com')) {
      const clean = url.split('?')[0].replace(/\/$/, '');
      return clean + '/embed';
    }
    return url;
  };

  const isEmbeddable = (url: string) => {
    return url.includes('instagram.com');
  };

  const handleItemClick = (index: number) => {
    const item = items[index];
    if (isEmbeddable(item.link)) {
      setActiveMedia(item.link);
    } else {
      window.open(item.link, '_blank');
    }
  };

  return (
    <>
      <DomeGallery 
        images={items.map(item => ({ src: item.image, alt: item.title }))} 
        onItemClick={handleItemClick}
        grayscale={false}
      />

      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12"
            onClick={() => setActiveMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-md h-[85vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white/80 border border-white/10 hover:bg-white/20 hover:text-white transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-lg"
              >
                ✕
              </button>
              
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                Loading...
              </div>

              <iframe 
                src={getEmbedUrl(activeMedia)}
                className="relative z-10 w-full h-full border-none bg-white"
                allow="encrypted-media"
                scrolling="no"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
