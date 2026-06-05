import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Film, 
  Scissors, 
  Palette, 
  Layers, 
  ChevronRight,
  Sparkles,
  Compass,
  Volume2
} from 'lucide-react';

import { PageId, Category } from './types';
import { portfolioCategories } from './data';
import TerracedBackground from './components/TerracedBackground';
import WaveTransition from './components/WaveTransition';
import VideoPlayer from './components/VideoPlayer';
import ColorGradeSlider from './components/ColorGradeSlider';
import GraphicGallery from './components/GraphicGallery';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [targetPage, setTargetPage] = useState<PageId | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Legacy companion; global click listener now automatically manages all ripples across viewport
  const triggerRipple = (e?: any) => {};

  // Track page scroll to drive natural parallax on homepage & setup global click ripple
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleGlobalClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      const newRipple = { x: e.clientX, y: e.clientY, id };
      setRipples(prev => [...(prev || []), newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1500);
    };
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Soft trigger for terraced wave screen transitions
  const triggerTransition = (page: PageId) => {
    if (page === currentPage) return;
    setTargetPage(page);
    setTransitionVisible(true);
  };

  const handleMidway = () => {
    if (targetPage) {
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: 'instant' as any }); // Reset scroll silently
    }
  };

  const handleDone = () => {
    setTransitionVisible(false);
    setTargetPage(null);
  };

  // Find the details of active category if not on home
  const activeCategory = portfolioCategories.find(c => c.id === currentPage);

  // Premium 5-layer physical terraced stack containing cards and frosted glass spacers
  // Cards increase gracefully in size from top to bottom (自上而下变大) using Morandi solid tones: light green, light brown, dark green
  const stackLayers = [
    {
      id: 'creative-short-films',
      type: 'card',
      index: 0,
      cat: portfolioCategories[0],
      blobStyle: {
        radius: '45% 55% 60% 40% / 50% 45% 55% 50%',
        gradient: '#E5EAD9', // Solid Morandi 浅绿 (Muted light sage)
        textColor: '#4A453F',
        accent: '#5E6B56',
        translateSpeed: 0.12,
        rotateSpeed: 0.02,
        widthClass: 'w-[250px] sm:w-[330px] md:w-[370px]', // Smallest at the top (increased from 220px+)
      }
    },
    {
      id: 'glass-spacer-1',
      type: 'glass',
      elevation: 'Altitude 780m',
      title: '空空流光等高带 / ATMOSPHERIC LEVEL',
      subtitle: 'Topographic Frosted Lens Layer',
      radius: '48% 52% 45% 55% / 40% 60% 50% 50%',
      translateSpeed: 0.18,
      rotateSpeed: -0.02,
      widthClass: 'w-[270px] sm:w-[355px] md:w-[400px]', // Increased from 235px+
    },
    {
      id: 'editing-and-post-production',
      type: 'card',
      index: 1,
      cat: portfolioCategories[1],
      blobStyle: {
        radius: '52% 48% 63% 37% / 47% 53% 47% 53%',
        gradient: '#DBCFBF', // Solid Morandi 浅棕 (Warm clay/sand tone)
        textColor: '#4A453F',
        accent: '#8D7A68',
        translateSpeed: 0.24,
        rotateSpeed: -0.03,
        widthClass: 'w-[295px] sm:w-[385px] md:w-[435px]', // Intermediate size (increased from 255px+)
      }
    },
    {
      id: 'glass-spacer-2',
      type: 'glass',
      elevation: 'Altitude 450m',
      title: '云水潺潺网格 / MOISTURE SURFACE',
      subtitle: 'Glassmorphic Interlayer Catalyst',
      radius: '43% 57% 50% 50% / 55% 45% 55% 45%',
      translateSpeed: 0.30,
      rotateSpeed: 0.01,
      widthClass: 'w-[315px] sm:w-[410px] md:w-[465px]', // Increased from 270px+
    },
    {
      id: 'graphic-brand-design',
      type: 'card',
      index: 2,
      cat: portfolioCategories[2],
      blobStyle: {
        radius: '41% 59% 47% 53% / 55% 42% 58% 45%',
        gradient: '#899679', // Solid Morandi 绿色 (Vibrant leaf green)
        textColor: '#FAF9F5', // Soft readable white cream for dark green background
        accent: '#E5EAD9',
        translateSpeed: 0.36,
        rotateSpeed: 0.02,
        widthClass: 'w-[335px] sm:w-[435px] md:w-[500px]', // Biggest at the bottom (increased from 285px+)
      }
    }
  ];

  return (
    <div className="relative min-h-screen font-sans bg-[#F2F0EB] text-[#4A453F] selection:bg-[#3B5249] selection:text-[#FAF5EF] pb-24 overflow-x-hidden">
      {/* Dynamic terrace contours backdrop with scrolling responsiveness */}
      <TerracedBackground scrollY={scrollY} currentPage={currentPage} />

      {/* Multilevel concentric terraced wave click rippler overlay */}
      {ripples.map((ripple) => (
        <div key={ripple.id} className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {/* Layer 1: Outer contour */}
          <motion.div
            key={`ripple-outer-${ripple.id}`}
            className="absolute border border-[#A3AD91]/30 bg-[#E2E8D8]/20"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
              width: '100px',
              height: '100px',
            }}
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ 
              scale: 18, 
              opacity: 0,
              borderRadius: '43% 57% 50% 50% / 55% 45% 55% 45%'
            }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          />
          {/* Layer 2: Middle contour */}
          <motion.div
            key={`ripple-mid-${ripple.id}`}
            className="absolute border border-[#DBCFBF]/40 bg-[#DBCFBF]/15"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              borderRadius: '52% 48% 63% 37% / 47% 53% 47% 53%',
              width: '100px',
              height: '100px',
            }}
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ 
              scale: 13, 
              opacity: 0,
              borderRadius: '48% 52% 45% 55% / 40% 60% 50% 50%'
            }}
            transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
          />
          {/* Layer 3: Inner contour */}
          <motion.div
            key={`ripple-inner-${ripple.id}`}
            className="absolute border border-[#899679]/50 bg-[#899679]/10"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              borderRadius: '41% 59% 47% 53% / 55% 42% 58% 45%',
              width: '100px',
              height: '100px',
            }}
            initial={{ scale: 0.1, opacity: 0.7 }}
            animate={{ 
              scale: 7, 
              opacity: 0,
              borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%'
            }}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      ))}

      {/* Embedded dynamic wave page state swapper transition */}
      <WaveTransition 
        isVisible={transitionVisible}
        onMidway={handleMidway}
        onDone={handleDone}
      />

      {/* Mini Top Brand Header */}
      <header className="sticky top-0 z-30 bg-[#F2F0EB]/75 backdrop-blur-md border-b border-[#D9D3C7]/45 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={(e) => {
              triggerRipple(e);
              triggerTransition('home');
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            {/* Custom vector outline logo resembling layered agricultural steps */}
            <div className="relative w-8 h-8 flex flex-col justify-between items-center py-1 opacity-90">
              <span className="w-2 h-1 rounded-full bg-[#A2B59F] transform group-hover:translate-x-0.5 transition-transform" />
              <span className="w-4 h-1 rounded-full bg-[#8D7A68] transform group-hover:translate-x-1.5 transition-transform" />
              <span className="w-6 h-1 rounded-full bg-[#3B5249] transform group-hover:translate-x-2.5 transition-transform" />
            </div>
            <div>
              <span className="text-sm font-serif font-bold tracking-wider text-[#5D574F] block">罗昊作品空间 / LUO HAO</span>
              <span className="text-[9px] font-mono tracking-wider text-stone-500 uppercase block">Landforms Portfolio</span>
            </div>
          </button>

          {/* Quick Page Nav Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2.5">
            {portfolioCategories.map((cat, idx) => {
              const icons = [<Film className="w-3.5 h-3.5" />, <Scissors className="w-3.5 h-3.5" />, <Palette className="w-3.5 h-3.5" />];
              return (
                <button
                  key={cat.id}
                  onClick={(e) => {
                    triggerRipple(e);
                    triggerTransition(cat.id as PageId);
                  }}
                  className={`flex items-center gap-1.5 text-xs font-sans font-medium px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                    currentPage === cat.id 
                      ? 'bg-[#3B5249]/90 text-[#FAF5EF] shadow-md shadow-[#3B5249]/10' 
                      : 'hover:bg-stone-200/50 text-[#4A453F] hover:text-[#5D574F] border border-transparent'
                  }`}
                >
                  <span className="opacity-80 hidden sm:inline-block">{icons[idx]}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Active Page Portal Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8 sm:pt-14 relative z-10">
        
        {/* HOMEPAGE VIEW: Incorporating Immersive UI Sidebar column + interactive floating discs grid */}
        {currentPage === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch min-h-[calc(100vh-160px)]">
            
            {/* Elegant Sidebar (Left 4 columns on large screens) */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 text-left border-b lg:border-b-0 lg:border-r border-[#D9D3C7] lg:pr-10">
              <div className="flex flex-col">
                <div className="mb-12 sm:mb-16">
                  <span className="text-xs font-mono tracking-widest text-[#8D7A68] uppercase flex items-center gap-2 mb-2 animate-fade-in">
                    <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#A3AD91]" />
                    Creative Media Artisanal Showcase
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#5D574F] leading-tight animate-fade-in">
                    罗昊作品集<br/>
                    <span className="text-xl font-sans font-light opacity-60 text-[#4A453F] block mt-1 tracking-wide uppercase">
                      LUO HAO PORTFOLIO
                    </span>
                  </h1>
                  <div className="mt-5 w-12 h-[1px] bg-[#5D574F]" />
                  
                  <p className="text-xs text-stone-500 font-sans mt-4 leading-relaxed max-w-xs">
                    将地理等高线的自然起伏化作视听符号与交互韵律。三层重叠，记录创意、剪辑和温润平面的创作。
                  </p>
                </div>
                
                {/* Immersive List Indicators (01 / 02 / 03 layout mimicking mockup) */}
                <nav className="space-y-8">
                  {portfolioCategories.map((cat, idx) => (
                    <div 
                      key={cat.id} 
                      onClick={(e) => {
                        triggerRipple(e);
                        triggerTransition(cat.id as PageId);
                      }}
                      className="group cursor-pointer select-none text-left"
                      onMouseEnter={() => setHoveredTier(idx)}
                      onMouseLeave={() => setHoveredTier(null)}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 block mb-1">0{idx + 1}</span>
                      <h2 className="text-lg font-serif font-medium group-hover:italic text-[#4A453F] transition-all flex items-center gap-1">
                        <span>{cat.title}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-1" />
                      </h2>
                      <p className="text-xs font-mono opacity-50 uppercase tracking-wider">{cat.englishTitle}</p>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Bottom sidebar info - Removed "心田" explicitly */}
              <div className="text-[10px] tracking-widest leading-relaxed uppercase opacity-40 font-mono mt-12 lg:mt-0">
                Visual Artistry / Motion / Post-production<br/>
                © 2026 罗昊作品空间
              </div>
            </div>

            {/* INTERACTIVE TERRACED DISCS FLOAT AREA (Right 8 columns on large screens) */}
            <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[550px] w-full flex items-center justify-center py-6">
              
              {/* Visual Texture Overlay from template */}
              <div className="absolute top-4 right-4 pointer-events-none select-none z-0">
                <div className="flex flex-col items-end opacity-15 font-serif">
                   <span className="text-6xl italic leading-none text-[#5D574F]">Flow</span>
                   <span className="text-xs tracking-[1em] uppercase -mr-2 text-[#4A453F]">Texture</span>
                </div>
              </div>

              {/* Central vertical depth connection line */}
              <div className="absolute inset-y-0 w-px bg-dashed border-l border-stone-300/30 -z-10 left-1/2 -translate-x-1/2 pointer-events-none" />

              {/* 5-layer structured stacked layout mapping */}
              {stackLayers.map((item, idx) => {
                const isCard = item.type === 'card';
                const isHovered = (isCard && hoveredTier === item.index) || hoveredLayerId === item.id;
                const activeHoverState = hoveredTier !== null || hoveredLayerId !== null;
                
                const widthClass = isCard ? item.blobStyle.widthClass : item.widthClass;
                const scale = isHovered ? 1.05 : activeHoverState ? 0.90 : 1.0;
                const opacity = isHovered ? 1.0 : activeHoverState ? 0.50 : 0.96;
                
                // Tight, high-density overlapping (only 8.5% height stagger for closer terraced overlapping)
                const topPos = `${10 + idx * 8.5}%`;
                const zIndex = 50 - idx;
                
                const translateSpeed = isCard ? item.blobStyle.translateSpeed : item.translateSpeed;
                const rotateSpeed = isCard ? item.blobStyle.rotateSpeed : item.rotateSpeed;
                const radius = isCard ? item.blobStyle.radius : item.radius;

                // Parallax kinetics
                const dynamicY = (scrollY * translateSpeed) * 0.22;
                const rotateDeg = (scrollY * rotateSpeed) + (idx * 6 - 12);

                if (isCard && item.cat) {
                  const cat = item.cat;
                  const blobStyle = item.blobStyle;
                  const categoryIcons = [
                    <Film className="w-5 h-5" />,
                    <Scissors className="w-5 h-5" />,
                    <Palette className="w-5 h-5" />
                  ];

                  return (
                    <motion.div
                      key={item.id}
                      className={`absolute cursor-pointer select-none origin-center ${widthClass}`}
                      style={{
                        top: topPos,
                        zIndex: zIndex,
                      }}
                      animate={{
                        scale,
                        opacity,
                        y: dynamicY + (idx * 4),
                        rotate: rotateDeg,
                        transition: { duration: 0.45, ease: 'easeOut' }
                      }}
                      onMouseEnter={() => setHoveredLayerId(item.id)}
                      onMouseLeave={() => setHoveredLayerId(null)}
                      onClick={() => {
                        triggerTransition(cat.id as PageId);
                      }}
                      id={`terrace-tier-${cat.id}`}
                    >
                      {/* Lighter, extremely clean container with fine border contrast */}
                      <div
                        className="relative p-6 sm:p-8 w-full aspect-[1.5/1] shadow-2xl transition-all duration-500 flex flex-col justify-between border border-[#D9D3C7]/40"
                        style={{
                          background: blobStyle.gradient,
                          borderRadius: radius,
                          color: blobStyle.textColor,
                          boxShadow: isHovered 
                            ? '0 30px 60px -15px rgba(93, 87, 79, 0.26)' 
                            : '0 12px 35px -20px rgba(74, 69, 63, 0.12)',
                        }}
                      >
                        {/* Top tier layout info */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span 
                              className="p-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/20"
                              style={{ color: blobStyle.accent }}
                            >
                              {categoryIcons[item.index]}
                            </span>
                            <span className="text-[9px] font-mono tracking-wider opacity-85 uppercase">
                              Tier 0{item.index + 1}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-medium opacity-60">
                            {cat.projects.length} 件作品
                          </span>
                        </div>

                        {/* Middle main labels - only keeps the prominent category title */}
                        <div className="my-auto py-3 text-left">
                          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-normal leading-tight" style={{ color: blobStyle.textColor }}>
                            {cat.title}
                          </h3>
                        </div>

                        {/* Bottom action trigger block - only standard action badge */}
                        <div className="flex items-center justify-end w-full border-t pt-3" style={{ borderColor: `${blobStyle.textColor}25` }}>
                          <div 
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-sans font-medium transition-colors border border-stone-200/10"
                            style={{ 
                              backgroundColor: blobStyle.accent === '#E5EAD9' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)',
                              color: blobStyle.textColor 
                            }}
                          >
                            <span>踏入此层</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>

                      {/* Beneath shadow step layer */}
                      <div 
                        className="absolute inset-0 -z-10 translate-y-3 translate-x-1.5 opacity-20 blur-md rounded-full bg-stone-900/30 pointer-events-none transition-transform duration-300"
                        style={{
                          borderRadius: radius,
                          transform: isHovered ? 'translateY(14px) scale(0.97)' : 'translateY(8px) scale(0.95)'
                        }}
                      />
                    </motion.div>
                  );
                } else {
                  // Beautifully styled glass spacer layer "中间加毛玻璃空卡片做过渡"
                  return (
                    <motion.div
                      key={item.id}
                      className={`absolute pointer-events-none select-none origin-center ${widthClass}`}
                      style={{
                        top: topPos,
                        zIndex: zIndex,
                      }}
                      animate={{
                        scale,
                        opacity: activeHoverState ? 0.35 : 0.75,
                        y: dynamicY + (idx * 4),
                        rotate: rotateDeg + 2, // slightly offset rotation
                        transition: { duration: 0.45, ease: 'easeOut' }
                      }}
                    >
                      {/* Frosted Glass visual container with extremely light, delicate outlines */}
                      <div
                        className="relative p-6 sm:p-8 w-full aspect-[1.5/1] border border-white/60 bg-white/15 backdrop-blur-[5px] shadow-sm flex flex-col justify-between"
                        style={{
                          borderRadius: radius,
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.45), 0 8px 32px rgba(93, 87, 79, 0.04)',
                        }}
                      >
                        {/* Top metric contour info */}
                        <div className="flex justify-between items-center opacity-40">
                          <span className="text-[9px] font-mono tracking-widest text-[#8D7A68]">{item.elevation}</span>
                          <div className="flex gap-0.5 h-3.5 items-end">
                            <span className="w-0.5 h-1 bg-[#5D574F]/30" />
                            <span className="w-0.5 h-2 bg-[#5D574F]/30" />
                            <span className="w-0.5 h-3.5 bg-[#5D574F]/30" />
                            <span className="w-0.5 h-2 bg-[#5D574F]/30" />
                            <span className="w-0.5 h-1 bg-[#5D574F]/30" />
                          </div>
                        </div>

                        {/* Middle description branding */}
                        <div className="text-left py-1 my-auto">
                          <h4 className="text-[10px] sm:text-[11px] font-serif font-bold tracking-wide text-[#5D574F]/50">
                            {item.title}
                          </h4>
                          <p className="text-[8px] font-mono tracking-wider text-stone-400 uppercase mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Fine footer index */}
                        <div className="flex justify-between items-center border-t border-[#D9D3C7]/20 pt-2 opacity-30 text-[8px] font-mono uppercase tracking-widest">
                          <span>Terrain Spec</span>
                          <span>Contour Spacer</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* DETAILS PAGE VIEW - CAT 1: CREATIVE SHORT FILMS */}
        {currentPage === 'creative-short-films' && activeCategory && (
          <div className="flex flex-col gap-12 sm:gap-16 animate-fade-in">
            
            {/* Elegant Header with Prominent Back button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#D9D3C7]/60">
              <div className="flex flex-col gap-3 text-left">
                <button 
                  onClick={(e) => {
                    triggerRipple(e);
                    triggerTransition('home');
                  }}
                  className="self-start flex items-center justify-center gap-2 px-5 py-2.5 bg-white/75 hover:bg-white text-stone-700 hover:text-[#3B5249] rounded-xl border border-[#D9D3C7]/80 hover:border-[#3B5249]/50 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group active:scale-95 text-xs font-sans font-semibold mb-2"
                >
                  <ArrowLeft className="w-4.5 h-4.5 transform group-hover:-translate-x-1.5 transition-transform text-[#3B5249]" />
                  <span>返回大主页 / Back to Home Portal</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#3B5249] rounded-full animate-pulse" />
                  <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-[#5D574F] tracking-tight">
                    {activeCategory.title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-widest pl-6">
                  {activeCategory.englishTitle} — {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Works List Area */}
            <div className="flex flex-col gap-14 sm:gap-20">
              {activeCategory.projects.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={project.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F5]/70 backdrop-blur-xs p-5 sm:p-8 rounded-3xl border border-[#D9D3C7]/60 shadow-[0_4px_24px_rgba(74,69,63,0.03)]"
                    id={`project-card-${project.id}`}
                  >
                    {/* Info Sheet (5 Columns - Order switches on Even) */}
                    <div className={`lg:col-span-12 xl:col-span-5 flex flex-col gap-5 text-left ${isEven ? 'xl:order-1' : 'xl:order-2'}`}>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-[#8D7A68] uppercase font-bold">
                          Project 0{index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#5D574F]">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#3B5249] font-sans font-medium italic">
                          {project.subtitle}
                        </p>
                      </div>

                      {project.description && (
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                          {project.description}
                        </p>
                      )}

                      {/* Dynamic Specs table */}
                      {project.details && project.details.length > 0 && (
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-3 border-t border-b border-[#D9D3C7]/45 text-left font-sans text-xs">
                          {project.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex flex-col">
                              <span className="text-[10px] font-mono text-stone-400 font-medium uppercase">{detail.label}</span>
                              <span className="text-[#4A453F] font-semibold font-sans mt-0.5">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Direct External playable web links */}
                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="self-start flex items-center gap-1.5 text-xs font-sans font-semibold text-[#3B5249] hover:underline"
                        >
                          <span>查看原网页高清完整版视频 / HD View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Playable Video Player (7 Columns - Order Switches on Even) */}
                    <div className={`lg:col-span-12 xl:col-span-7 ${isEven ? 'xl:order-2' : 'xl:order-1'}`}>
                      {project.videoUrl && (
                        <VideoPlayer 
                          src={project.videoUrl} 
                          title={project.title}
                          externalUrl={project.externalUrl}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DETAILS PAGE VIEW - CAT 2: POST-PRODUCTION & EDITING */}
        {currentPage === 'post-production-editing' && activeCategory && (
          <div className="flex flex-col gap-12 sm:gap-16 animate-fade-in">
            
            {/* Header with back */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#D9D3C7]/60">
              <div className="flex flex-col gap-3 text-left">
                <button 
                  onClick={(e) => {
                    triggerRipple(e);
                    triggerTransition('home');
                  }}
                  className="self-start flex items-center justify-center gap-2 px-5 py-2.5 bg-white/75 hover:bg-white text-stone-700 hover:text-[#8D7A68] rounded-xl border border-[#D9D3C7]/80 hover:border-[#8D7A68]/50 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group active:scale-95 text-xs font-sans font-semibold mb-2"
                >
                  <ArrowLeft className="w-4.5 h-4.5 transform group-hover:-translate-x-1.5 transition-transform text-[#8D7A68]" />
                  <span>返回大主页 / Back to Home Portal</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#8D7A68] rounded-full animate-pulse" />
                  <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-[#5D574F] tracking-tight">
                    {activeCategory.title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-widest pl-6">
                  {activeCategory.englishTitle} — {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Editing Work layout */}
            <div className="flex flex-col gap-12 sm:gap-20">
              {activeCategory.projects.map((project, index) => {
                return (
                  <div 
                    key={project.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FAF9F5]/70 backdrop-blur-xs p-5 sm:p-8 rounded-3xl border border-[#D9D3C7]/60 shadow-[0_4px_24px_rgba(74,69,63,0.03)]"
                    id={`project-card-${project.id}`}
                  >
                    {/* Media Item Frame (Left 7 Cols) */}
                    <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-4">
                      {project.isColorGrade ? (
                        // Color Grade Interactive Split Slider!
                        <ColorGradeSlider 
                          rawImage={project.rawImageUrl || ''}
                          gradedImage={project.gradedImageUrl || ''}
                          title={project.title}
                        />
                      ) : (
                        // Self-media standard elegant video playback
                        project.videoUrl && (
                          <VideoPlayer 
                            src={project.videoUrl} 
                            title={project.title}
                            externalUrl={project.externalUrl}
                          />
                        )
                      )}
                    </div>

                    {/* Metadata specs & details (Right 5 Cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4 text-left">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-[#8D7A68] uppercase font-bold">
                          Technique 0{index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#5D574F]">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#8D7A68] font-sans font-medium italic">
                          {project.subtitle}
                        </p>
                      </div>

                      {project.description && (
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                          {project.description}
                        </p>
                      )}

                      {/* Technical checklist details */}
                      {project.details && project.details.length > 0 && (
                        <div className="flex flex-col gap-3 py-3 border-t border-[#D9D3C7]/30 mt-2">
                          {project.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex flex-col text-left font-sans text-xs bg-[#FAF9F5]/50 p-3 rounded-xl border border-[#D9D3C7]/40">
                              <span className="text-[9px] font-mono text-stone-400 font-medium uppercase tracking-wider">{detail.label}</span>
                              <span className="text-[#4A453F] font-semibold font-sans mt-0.5">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DETAILS PAGE VIEW - CAT 3: GRAPHIC PACKAGING & IP */}
        {currentPage === 'graphic-design' && activeCategory && (
          <div className="flex flex-col gap-12 sm:gap-16 animate-fade-in">
            
            {/* Header with back */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#D9D3C7]/60">
              <div className="flex flex-col gap-3 text-left">
                <button 
                  onClick={(e) => {
                    triggerRipple(e);
                    triggerTransition('home');
                  }}
                  className="self-start flex items-center justify-center gap-2 px-5 py-2.5 bg-white/75 hover:bg-white text-stone-700 hover:text-[#A2B59F] rounded-xl border border-[#D9D3C7]/80 hover:border-[#A2B59F]/50 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group active:scale-95 text-xs font-sans font-semibold mb-2"
                >
                  <ArrowLeft className="w-4.5 h-4.5 transform group-hover:-translate-x-1.5 transition-transform text-[#A2B59F]" />
                  <span>返回大主页 / Back to Home Portal</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#A2B59F] rounded-full animate-pulse" />
                  <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-[#5D574F] tracking-tight">
                    {activeCategory.title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-widest pl-6">
                  {activeCategory.englishTitle} — {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Design Grid Area */}
            <div className="flex flex-col gap-16">
              {activeCategory.projects.map((project, index) => {
                return (
                  <div 
                    key={project.id}
                    className="flex flex-col gap-5 bg-[#FAF9F5]/70 backdrop-blur-xs p-5 sm:p-8 rounded-3xl border border-[#D9D3C7]/60 shadow-[0_4px_24px_rgba(74,69,63,0.03)] animate-fade-in"
                    id={`project-card-${project.id}`}
                  >
                    {/* Brand Title header */}
                    <div className="flex flex-col gap-1 text-left border-b border-[#D9D3C7]/40 pb-3">
                      <span className="text-[9px] font-mono tracking-widest text-[#8D7A68] uppercase font-bold">
                        Aesthetic Section 0{index + 1}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#5D574F]">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#5B6B56] font-sans italic">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description text content */}
                    {project.description && (
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans text-left max-w-4xl">
                        {project.description}
                      </p>
                    )}

                    {/* Integrated custom gallery showcasing specs, fonts, copy triggers, zoom lightbox */}
                    <GraphicGallery project={project} />

                    {/* Detail metadata table underneath */}
                    {project.details && project.details.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-[#FAF9F5]/60 border border-[#D9D3C7]/50 rounded-2xl text-left text-xs font-sans mt-2">
                        {project.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-stone-400 font-semibold tracking-wider uppercase">{detail.label}</span>
                            <span className="text-[#4A453F] font-sans mt-0.5">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* Styled Footer */}
      <footer className="mt-20 border-t border-[#D2DBCE]/30 pt-8 pb-12 text-center text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-left gap-1">
            <span className="font-sans font-bold text-stone-700 text-sm">© BIENNIAL 2026 罗昊作品空间 / LUO HAO</span>
            <span className="text-[10px] text-stone-400">Terraced Landscape Oblique Design Studio. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="bg-[#5D574F] text-[#FAF9F5] px-2.5 py-1 rounded-md font-sans">学术策展 · 交互等高</span>
            <span className="text-stone-400">格物致用 · 融之于野</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
