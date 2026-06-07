import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WaveTransitionProps {
  isVisible: boolean;
  onMidway: () => void;
  onDone: () => void;
}

export default function WaveTransition({ isVisible, onMidway, onDone }: WaveTransitionProps) {
  const layers = [
    { color: '#E2E8D8', delay: 0 },
    { color: '#C8D1BB', delay: 0.06 },
    { color: '#A3AD91', delay: 0.12 },
    { color: '#8D7A68', delay: 0.18 },
    { color: '#4A453F', delay: 0.24 },
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="wave-transition"
          className="fixed inset-0 z-50 w-full h-full overflow-hidden"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          // Force GPU compositing layer — prevents content repaints underneath from causing flicker
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Diagonal Streamlined Terraced Color Blocks sweeping bottom-left to top-right */}
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                backgroundColor: layer.color,
                zIndex: index + 10,
                width: '180vw',
                height: '180vh',
                left: '-40vw',
                bottom: '-40vh',
                borderRadius: '45% 55% 40% 60% / 40% 50% 50% 60%',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              initial={{
                x: '-120%',
                y: '120%',
                rotate: -12,
                scale: 0.9,
                opacity: 0.98,
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
                  ease: [0.16, 1, 0.3, 1],
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
                  delay: (layers.length - 1 - index) * 0.05,
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
                opacity: [0, 1, 1, 0],
                scale: [0.95, 1, 1.02, 1.05],
                y: [15, 0, -5, -20],
                transition: {
                  times: [0, 0.2, 0.75, 1],
                  duration: 1.6,
                  ease: 'easeInOut',
                },
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

          {/* Midway trigger — delayed to 1.0s so all layers fully cover before DOM swap */}
          <TriggerCallback delay={1.0} onTrigger={onMidway} />
          {/* Done trigger */}
          <TriggerCallback delay={1.75} onTrigger={onDone} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TriggerCallback({ delay, onTrigger }: { delay: number; onTrigger: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTrigger();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, onTrigger]);

  return null;
}