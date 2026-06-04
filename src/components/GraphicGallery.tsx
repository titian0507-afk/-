import React, { useState } from 'react';
import { ZoomIn, X, Palette, Feather, Award } from 'lucide-react';
import { Project } from '../types';

interface GraphicGalleryProps {
  project: Project;
}

export default function GraphicGallery({ project }: GraphicGalleryProps) {
  const [activeImage, setActiveImage] = useState<string>(project.images?.[0] || '');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Customized earthy color hex tags and named details matching our Morandi scheme
  const designPalettes = project.id === 'graphic-a' 
    ? [
        { name: '云雾青山绿', hex: '#3B5249', text: 'white' },
        { name: '嫩芽绿', hex: '#5B6B56', text: 'white' },
        { name: '枯木皮茶褐', hex: '#8D7A68', text: 'white' },
        { name: '再生麦香纸', hex: '#C2B29F', text: 'black' },
        { name: '粗砂陶黄', hex: '#FAF5EF', text: 'black' },
      ]
    : [
        { name: '长白山老参', hex: '#FAF5EF', text: 'black' },
        { name: '森林苔原绿', hex: '#859E81', text: 'white' },
        { name: '参须红褐', hex: '#A68D75', text: 'white' },
        { name: '肥沃黑沃泥', hex: '#504136', text: 'white' },
        { name: '云雾银霜', hex: '#FAF9F6', text: 'black' },
      ];

  const designFonts = project.id === 'graphic-a'
    ? { title: 'DengXian / 华文细黑', desc: '等高线流线配图，辅以不规则铅印风衬线字体，传递东方手作温度。' }
    : { title: 'Futura Light / PingFang Bold', desc: '极为现代的高端无衬线几何字形，搭配圆润的人参须叶片流体轮廓。' };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Primary Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Gallery Interactive Mockup Preview (Left / 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div 
            className="relative group overflow-hidden rounded-2xl bg-[#FAF5EF] aspect-video border border-[#D2DBCE]/40 shadow-lg cursor-zoom-in"
            onClick={() => setLightboxImg(activeImage)}
          >
            <img 
              src={activeImage} 
              alt={project.title} 
              className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Zoom Icon indicator */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#3B5249]">
                <ZoomIn className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Thumbnails Row */}
          {project.images && project.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? 'border-[#3B5249] ring-2 ring-[#3B5249]/20 scale-95' : 'border-[#FAF5EF] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Specs Sheet (Right / 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Natural Color Palette Pebble Selector */}
          <div className="bg-[#FAF5EF]/60 border border-[#D2DBCE]/30 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-[#3B5249]">
              <Palette className="w-4 h-4" />
              <h4 className="text-xs font-sans font-medium tracking-wider uppercase">Morandi Forest 色彩规格</h4>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {designPalettes.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF5EF] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-6 h-6 rounded-full border border-stone-200/40 shadow-inner inline-block"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-xs text-stone-700 font-medium font-sans">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 tracking-wide">{item.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Sheet */}
          <div className="bg-[#FAF5EF]/60 border border-[#D2DBCE]/30 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-3 text-[#3B5249]">
              <Feather className="w-4 h-4" />
              <h4 className="text-xs font-sans font-medium tracking-wider uppercase">设计字体美学</h4>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-sans font-bold text-stone-800">{designFonts.title}</span>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">{designFonts.desc}</p>
            </div>
          </div>

          {/* Craft Specs */}
          <div className="bg-[#FAF5EF]/60 border border-[#D2DBCE]/30 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-3 text-[#3B5249]">
              <Award className="w-4 h-4" />
              <h4 className="text-xs font-sans font-medium tracking-wider uppercase">绿色环保持证材料</h4>
            </div>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              全包装均经国家 FSC 森林体系认证，选用 100% 环保无毒大豆油墨印刷，完美呼应人与大地、梯田稻香的生机共融概念。
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Portal Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/90 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out select-none"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={lightboxImg} 
            alt="Enlarged view" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-fade-in"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
