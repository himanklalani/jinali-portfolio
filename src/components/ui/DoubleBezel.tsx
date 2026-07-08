import React from 'react';

interface DoubleBezelProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function DoubleBezel({ children, className = "", innerClassName = "" }: DoubleBezelProps) {
  return (
    <div className={`double-bezel ${className}`}>
      <div className={`double-bezel-inner ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
