import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WaveTransitionProps {
  isVisible: boolean;
  onMidway: () => void; // Triggered when fully covered, safe to change view state
  onDone: () => void;   // Triggered when animation completes
}

export default function WaveTransition({ isVisible, onMidway, onDone }: WaveTransitionProps) {
  // 5 elegant Morandi contour levels that slide diagonally from bottom-left to top-right
  const layers = [
    { color: '#E2E8D8', delay: 0 },     // Level 1: Light Terrace Green
    { color: '#C8D1BB', delay: 0.06 },   // Level 2: Gentle Sprout Moss
    { color: '#A3AD91', delay: 0.12 },   // Level 3: Clay Sage
    { color: '#8D7A68', delay: 0.18 },   // Level 4: Terrace Clay Soil
    { color: '#4A453F', delay: 0.24 },   // Level 5: Absolute Deep Earth Charcoal
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 pointer-events-none w-full h-full overflow-hidden">
          {/* Diagonal Streamlined Terraced Color Blocks sweeping bottom-left to top-right */}
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              className="absolute pointer-events-auto"
              style={{
                backgroundColor: layer.color,
                zIndex: index + 10,
                // Make the panel extra large and rotated to completely cover the screen without reveals at corners
                width: '180vw',
                height: '180vh',
                left: '-40vw',
                bottom: '-40vh',
                borderRadius: '45% 55% 40% 60% / 40% 50% 50% 60%', // Organic terraced waveform borders
              }}
              initial={{ 
                x: '-120%', 
                y: '120%', 
                rotate: -12, 
                scale: 0.9,
                opacity: 0.98 
              }}
              animate={{
                x: '0%',
                y: '0%',
                rotate: -6,
                scale: 1.05,
                opacity: 1,
                transition: {
                  duration: 0.75,
                  delay: layer.delay,
                  ease: [0.16, 1, 0.3, 1], // Power4.easeOut for fluid movement
                },
              }}
              exit={{
                x: '120%',
                y: '-120%',
                rotate: 0,
                scale: 0.9,
                opacity: 0.9,
                transition: {
                  duration: 0.75,
                  delay: (layers.length - 1 - index) * 0.05, // Reverse stagger to pull the top layers first
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
            />
          ))}

          {/* High-end sophisticated typography layer visible during pure cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[80] pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ 
                opacity: [0, 1, 1, 0], // Smooth fade in and out curve matching transition timing
                scale: [0.95, 1, 1.02, 1.05],
                y: [15, 0, -5, -20],
                transition: { 
                  times: [0, 0.2, 0.75, 1],
                  duration: 1.6, 
                  ease: 'easeInOut' 
                } 
              }}
              className="text-center px-4"
            >
              <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-[0.22em] uppercase italic text-[#FAF9F5] drop-shadow-sm">
                TERRACED FIELDS
              </h2>
              <div className="w-20 h-[1px] bg-[#FAF9F5]/40 mx-auto my-3" />
              <p className="text-[10px] sm:text-xs font-mono tracking-[0.45em] uppercase text-[#E2E8D8] opacity-90">
                SCULPTED BY NATURE / CURATED BY LUO HAO
              </p>
            </motion.div>
          </div>

          {/* Invisible trigger mid-way (safe to swap DOM pages when fully covered) */}
          <TriggerCallback delay={0.65} onTrigger={onMidway} />
          {/* Invisible trigger final exit */}
          <TriggerCallback delay={1.45} onTrigger={onDone} />
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper container that triggers callbacks in sync with animations
function TriggerCallback({ delay, onTrigger }: { delay: number; onTrigger: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTrigger();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, onTrigger]);

  return null;
}
