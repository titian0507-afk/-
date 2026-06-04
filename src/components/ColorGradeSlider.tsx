import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Eye } from 'lucide-react';

interface ColorGradeSliderProps {
  rawImage: string;
  gradedImage: string;
  title: string;
}

export default function ColorGradeSlider({ rawImage, gradedImage, title }: ColorGradeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);

  // Update slider position based on coordinates
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    // Keep between 2% and 98%
    setSliderPosition(Math.max(2, Math.min(98, position)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners globally during drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#8D7A68] rounded-full inline-block"></span>
          <h4 className="text-sm font-sans font-medium text-[#504136]">色彩还原度实战对比（左右滑动）</h4>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#8D7A68]">
          <Eye className="w-3.5 h-3.5" />
          <span>拖拽中轴线解构色深</span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-[#D2DBCE]/40 bg-stone-100 select-none cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* RAW / LOG Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={rawImage} 
            alt="Film RAW / LOG footage" 
            className="w-full h-full object-cover filter saturate-[0.35] brightness-[1.05] contrast-[0.85] blur-[0.5px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-black/55 backdrop-blur-sm text-[#FAF5EF] text-[10px] font-mono tracking-wider px-2.5 py-1.5 rounded-md uppercase">
            RAW / Log 原创未校色片源
          </div>
        </div>

        {/* GRADED Beautiful Image (Foreground) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-75"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <img 
            src={gradedImage} 
            alt="Cinematic graded grading" 
            className="w-full h-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-[#3B5249]/85 backdrop-blur-sm text-[#FAF5EF] text-[10px] font-mono tracking-wider px-2.5 py-1.5 rounded-md uppercase">
            Graded 莫兰迪自然调色渲染
          </div>
        </div>

        {/* Slider Handle / Partition bar */}
        <div 
          className="absolute inset-y-0 w-0.5 bg-[#FAF5EF] shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Rounded Slider Handle disk reminiscent of a wooden terraced earth button */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#8D7A68] hover:bg-[#7A6A5A] text-[#FAF5EF] flex items-center justify-center shadow-xl border-2 border-[#FAF5EF] transition-transform duration-150 transform hover:scale-110 active:scale-95"
            style={{ pointerEvents: 'auto', cursor: 'ew-resize' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
          >
            <Sliders className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
