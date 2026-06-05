import React, { useEffect, useState } from 'react';

interface TerracedBackgroundProps {
  scrollY?: number;
  currentPage?: string;
}

export default function TerracedBackground({ scrollY = 0, currentPage = 'home' }: TerracedBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Soft Morandi color palettes for subpage topographic wave fillings
  const waveLayers = [
    { color: 'rgba(226, 232, 216, 0.16)', stroke: 'rgba(141, 155, 121, 0.22)', delay: '0s', scrollFactor: 0.16, animationClass: 'terraceBreath1' },
    { color: 'rgba(219, 207, 191, 0.13)', stroke: 'rgba(141, 122, 104, 0.18)', delay: '-3s', scrollFactor: 0.32, animationClass: 'terraceBreath2' },
    { color: 'rgba(163, 173, 145, 0.12)', stroke: 'rgba(110, 125, 90, 0.20)', delay: '-6s', scrollFactor: 0.48, animationClass: 'terraceBreath3' },
    { color: 'rgba(137, 150, 121, 0.10)', stroke: 'rgba(93, 105, 78, 0.15)', delay: '-9s', scrollFactor: 0.64, animationClass: 'terraceBreath4' },
    { color: 'rgba(242, 240, 235, 0.25)', stroke: 'rgba(93, 87, 79, 0.12)', delay: '-12s', scrollFactor: 0.82, animationClass: 'terraceBreath5' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#F2F0EB] overflow-hidden -z-20 pointer-events-none select-none">
      <style>{`
        @keyframes terraceBreath1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scaleY(1); }
          50% { transform: translateY(-16px) rotate(0.5deg) scaleY(1.05); }
        }
        @keyframes terraceBreath2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scaleY(1); }
          50% { transform: translateY(18px) rotate(-0.5deg) scaleY(0.95); }
        }
        @keyframes terraceBreath3 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scaleY(1); }
          50% { transform: translateY(-12px) rotate(0.3deg) scaleY(1.03); }
        }
        @keyframes terraceBreath4 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scaleY(1); }
          50% { transform: translateY(22px) rotate(-0.3deg) scaleY(0.97); }
        }
        @keyframes terraceBreath5 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scaleY(1); }
          50% { transform: translateY(-20px) rotate(0.4deg) scaleY(1.04); }
        }
      `}</style>

      {/* Ample background glowing cores */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[85%] h-[85%] rounded-full opacity-40 bg-[#E2E8D8] blur-[130px] transition-transform duration-[6000ms] pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px) translateY(${scrollY * -0.15}px)`,
        }}
      />
      <div 
        className="absolute top-[-20%] left-[-20%] w-[75%] h-[75%] rounded-full opacity-35 bg-[#FAF9F6] blur-[110px] transition-transform duration-[7000ms] pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* FULL-STRETCH Topographic Flowing Terraced Wave Contours - Rich breathing dynamics on subpages */}
      {currentPage !== 'home' ? (
        // Spectacular continuous flowing wave contours designed specifically for the project detail subpages
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-80 z-0">
          <svg 
            className="w-full h-full absolute inset-0 pointer-events-none" 
            preserveAspectRatio="none"
            viewBox="0 0 1440 900"
          >
            {waveLayers.map((layer, index) => {
              // Standard scroll parallax: deeper levels sway with a larger amplitude 
              // ("滚动时梯田的层次会起伏得稍微大一些")
              const scrollYOffset = scrollY * layer.scrollFactor * 0.45;
              const hoverX = mousePos.x * (index + 1) * 7;
              const hoverY = mousePos.y * (index + 1) * 5;

              // Topographic organic control curves
              const yBase = 120 + index * 130;
              const p1 = yBase - 35;
              const p2 = yBase + 45;
              const p3 = yBase - 25;
              const p4 = yBase + 35;

              return (
                <g 
                  key={index}
                  style={{
                    animation: `${layer.animationClass} 18s ease-in-out infinite`,
                    animationDelay: layer.delay,
                    transformOrigin: 'center center',
                    transform: `translate(${hoverX}px, ${hoverY + scrollYOffset}px)`
                  }}
                  className="transition-transform duration-[350ms] ease-out"
                >
                  {/* Organic filled terrace contour shape */}
                  <path
                    d={`M-100,950 L-100,${yBase} 
                        C250,${p1} 500,${p2} 720,${yBase} 
                        C950,${p3} 1200,${p4} 1540,${yBase} 
                        L1540,950 Z`}
                    fill={layer.color}
                    className="opacity-95"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        // Homepage elegant lower-corner focused circular terrace contour landscape
        <>
          <div 
            className="absolute -bottom-20 -right-20 w-[900px] h-[900px] bg-[#E2E8D8] rounded-[45%_55%_70%_30%_/_30%_40%_60%_70%] opacity-40 z-0 transition-transform duration-[6000ms] pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px) rotate(${mousePos.x * 3}deg) translateY(${scrollY * -0.1}px)`,
              animation: 'terraceBreath1 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute -bottom-10 -right-10 w-[750px] h-[750px] bg-[#DBCFBF] rounded-[55%_45%_60%_40%_/_40%_60%_40%_60%] opacity-45 z-1 transition-transform duration-[5000ms] pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px) rotate(${mousePos.y * -4}deg) translateY(${scrollY * -0.2}px)`,
              animation: 'terraceBreath2 24s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#899679] rounded-[60%_40%_50%_50%_/_50%_50%_60%_40%] opacity-20 z-2 transition-transform duration-[4000ms] pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -45}px, ${mousePos.y * -45}px) rotate(${mousePos.x * 5}deg) translateY(${scrollY * -0.3}px)`,
              animation: 'terraceBreath3 18s ease-in-out infinite'
            }}
          />
        </>
      )}

      {/* High-fidelity Grain physical layer */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
        </filter>
      </svg>
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.98] mix-blend-multiply" 
        style={{
          filter: 'url(#noiseFilter)',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
}
