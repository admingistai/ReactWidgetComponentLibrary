/**
 * SearchingAnimation - Animated molecule component for vertical text carousel
 * Shows "Searching through [content type]" with smooth Framer Motion animations
 * Fixed to match working example structure and styling
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

interface SearchingAnimationProps {
  items?: string[];
  interval?: number;
  prefix?: string;
  isActive?: boolean;
  className?: string;
}

// Default content types for New York Times search
const DEFAULT_ITEMS = [
  "articles",
  "books", 
  "videos",
  "podcasts",
  "archives",
  "newsletters"
];

export function SearchingAnimation({
  items = DEFAULT_ITEMS,
  interval = 2000,
  prefix = "Searching through",
  isActive = true,
  className = ''
}: SearchingAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotation effect
  useEffect(() => {
    if (!isActive || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, isActive]);

  // Get visible items (same logic as working example)
  const getVisibleItems = () => {
    const prev = items[(currentIndex - 1 + items.length) % items.length];
    const current = items[currentIndex];
    const next = items[(currentIndex + 1) % items.length];
    return { prev, current, next };
  };

  const { prev, current, next } = getVisibleItems();

  // Gradient text style for previous/next items
  const gradientStyle = {
    background: `linear-gradient(${tokens.colors.gradient.direction}, ${tokens.colors.gradient.start} 0%, ${tokens.colors.gradient.end} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div 
      className={`flex items-center gap-3 ${className}`}
      aria-live="polite"
      aria-label={`Searching animation showing content types: ${items.join(', ')}`}
    >
      {/* Static prefix text with gradient */}
      <span className="font-medium italic" style={gradientStyle}>
        {prefix}
      </span>
      
      {/* Animated vertical stack container */}
      <div className="relative h-20 w-32 flex flex-col justify-center items-start">
        <AnimatePresence mode="popLayout">
          {/* Previous item - positioned above current */}
          <motion.div
            key={`prev-${currentIndex}`}
            className="absolute text-sm font-medium italic"
            style={gradientStyle}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -24, opacity: 0.5 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              opacity: { duration: 0.3 }
            }}
          >
            {prev}
          </motion.div>
          
          {/* Current item - centered and highlighted */}
          <motion.div
            key={`current-${currentIndex}`}
            className="absolute text-white text-lg font-medium italic"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              opacity: { duration: 0.3 }
            }}
          >
            {current}...
          </motion.div>
          
          {/* Next item - positioned below current */}
          <motion.div
            key={`next-${currentIndex}`}
            className="absolute text-sm font-medium italic"
            style={gradientStyle}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 24, opacity: 0.5 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              opacity: { duration: 0.3 }
            }}
          >
            {next}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}