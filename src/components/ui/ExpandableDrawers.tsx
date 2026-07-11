'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BELIEFS = [
  { 
    title: "Strategy first", 
    desc: "Ideas without a plan are just ideas. I like starting with the outcome and working backwards." 
  },
  { 
    title: "Cultural honesty", 
    desc: "Not every trend is the right fit. The best campaigns feel natural, not forced." 
  },
  { 
    title: "Talent respect", 
    desc: "Authenticity comes from giving creators the freedom to create." 
  },
  { 
    title: "Attention to detail", 
    desc: "The smallest details often make the biggest difference" 
  }
];

const Drawer = ({ title, desc, isOpen, onClick }: { title: string, desc: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10 overflow-hidden last:border-b-0">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <h4 className="text-xl font-medium text-white group-hover:text-white/80 transition-colors duration-300">
          {title}
        </h4>
        
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center text-white/50 group-hover:text-white transition-colors duration-300"
          >
            {/* Plus Icon that rotates into X */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <path d="M12 5V19M5 12H19" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.1 }
            }}
          >
            <div className="pb-6 text-white/60 font-light leading-relaxed pr-8">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ExpandableDrawers = () => {
  // Using an array of boolean state to allow multiple drawers to be open independently
  const [openStates, setOpenStates] = useState<boolean[]>(new Array(BELIEFS.length).fill(false));

  const toggleDrawer = (index: number) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
  };

  return (
    <div className="w-full flex flex-col border-t border-white/10">
      {BELIEFS.map((belief, i) => (
        <Drawer 
          key={i}
          title={belief.title}
          desc={belief.desc}
          isOpen={openStates[i]}
          onClick={() => toggleDrawer(i)}
        />
      ))}
    </div>
  );
};
