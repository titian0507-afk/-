import React, { useState } from 'react';
import { ZoomIn, X, Smartphone, Image, Layout, Layers, Grid, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import VideoPlayer from './VideoPlayer';

interface GraphicGalleryProps {
  project: Project;
}

export default function GraphicGallery({ project }: GraphicGalleryProps) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  // graphic-a states
  const [ipActiveIdx, setIpActiveIdx] = useState(0);
  const [ipViewMode, setIpViewMode] = useState<'stack' | 'grid'>('stack');

  // graphic-d states
  const [campusTab, setCampusTab] = useState<'h5' | 'admissions' | 'tissue'>('h5');
  const [campusAdmissionsActiveIdx, setCampusAdmissionsActiveIdx] = useState(0);
  const [campusAdmissionsViewMode, setCampusAdmissionsViewMode] = useState<'stack' | 'grid'>('stack');

  // Helper to safely handle image arrays
  const getImages = () => project.images || [];

  return (
    <div className="flex flex-col gap-6 w-full text-left" id="graphic-gallery-root">
      
      {/* 1. 白参参IP设计 */}
      {project.id === 'graphic-a' && (() => {
        const images = getImages();
        return (
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3" id="gallery-header-a">
              <span className="text-xs text-stone-500 font-serif font-bold">三张竖版海报</span>
              <div className="flex bg-stone-100 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setIpViewMode('stack')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    ipViewMode === 'stack' ? 'bg-white text-[#3B5249] font-medium shadow-xs' : 'text-stone-400'
                  }`}
                  id="tab-mode-stack"
                >
                  <Layers className="w-3 h-3" />
                  <span>堆叠</span>
                </button>
                <button
                  onClick={() => setIpViewMode('grid')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    ipViewMode === 'grid' ? 'bg-white text-[#3B5249] font-medium shadow-xs' : 'text-stone-400'
                  }`}
                  id="tab-mode-grid"
                >
                  <Grid className="w-3 h-3" />
                  <span>平铺</span>
                </button>
              </div>
            </div>

            {ipViewMode === 'stack' ? (
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 bg-stone-50 rounded-2xl border border-stone-200/40">
                <div className="relative w-full max-w-[240px] h-[360px] select-none flex items-center justify-center">
                  {images.map((img, idx) => {
                    const offset = (idx - ipActiveIdx + images.length) % images.length;
                    const isTop = offset === 0;
                    const translateSkews = [
                      { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 },
                      { x: 10, y: 12, rotate: 2, scale: 0.95, zIndex: 20, opacity: 0.85 },
                      { x: 20, y: 24, rotate: 4, scale: 0.9, zIndex: 10, opacity: 0.7 }
                    ];
                    const layout = translateSkews[offset] || translateSkews[0];

                    return (
                      <div
                        key={idx}
                        style={{
                          transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg) scale(${layout.scale})`,
                          zIndex: layout.zIndex,
                          opacity: layout.opacity,
                        }}
                        onClick={() => {
                          if (isTop) {
                            setLightboxImg(img);
                          } else {
                            setIpActiveIdx(idx);
                          }
                        }}
                        className={`absolute inset-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md cursor-pointer transition-all duration-500 ease-out origin-bottom ${
                          isTop ? 'hover:scale-[1.02]' : ''
                        }`}
                        id={`ip-poster-${idx}`}
                      >
                        <img
                          src={img}
                          alt="白参参海报"
                          className="w-full h-full object-cover pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIpActiveIdx((prev) => (prev + 1) % images.length)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs transition-colors cursor-pointer"
                      id="btn-next-ip"
                    >
                      <span>切换下一张</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono text-stone-400">
                      {ipActiveIdx + 1} / {images.length}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 py-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImg(img)}
                    className="group relative rounded-xl overflow-hidden aspect-[2/3] bg-stone-100 border border-stone-200 cursor-zoom-in transition-all"
                  >
                    <img
                      src={img}
                      alt="白参参海报"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* 2. 基地研学折页手册设计 */}
      {project.id === 'graphic-b' && (() => {
        const images = getImages();
        return (
          <div className="flex flex-col gap-4 w-full">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-xs text-stone-500 font-serif font-bold">两张横板超长图片</span>
            </div>
            <div className="flex flex-col gap-6 py-2">
              {images.map((img, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-stone-400">研学手册折页 {idx + 1}</span>
                  <div
                    onClick={() => setLightboxImg(img)}
                    className="group relative w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-200 cursor-zoom-in"
                  >
                    <div className="w-full aspect-[2.35/1]">
                      <img
                        src={img}
                        alt="研学折页手册"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 3. 中国第二届（南昌）洪博会H5页面设计 */}
      {project.id === 'graphic-c' && (
        <div className="flex flex-col items-center gap-4 w-full py-2">
          <div className="w-full border-b border-stone-200 pb-2">
            <span className="text-xs text-stone-500 font-serif font-bold">中国第二届（南昌）洪博会H5页面设计 (竖版视频)</span>
          </div>
          <div className="relative w-full max-w-[280px] aspect-[9/16] bg-stone-900 rounded-[36px] p-2 shadow-xl border-4 border-stone-800 overflow-hidden">
            <div className="w-full h-full rounded-[28px] overflow-hidden bg-black relative">
              {project.videoUrl && (
                <VideoPlayer
                  src={project.videoUrl}
                  title="洪博会H5"
                  isVertical={true}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. 校园类 (H5, 招生海报, 诚信纸巾海报) */}
      {project.id === 'graphic-d' && (() => {
        const images = getImages();
        const admissionsImages = images.slice(0, 3);
        const tissueImages = images.slice(3, 5);

        return (
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-3 gap-3">
              <span className="text-xs text-stone-500 font-serif font-bold">校园类企划组</span>
              <div className="flex bg-stone-100 rounded-lg p-1 text-xs font-sans self-start sm:self-auto">
                <button
                  onClick={() => setCampusTab('h5')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    campusTab === 'h5' ? 'bg-white text-[#3B5249] font-medium shadow-xs' : 'text-stone-400'
                  }`}
                  id="tab-campus-h5"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>H5 (树版视频)</span>
                </button>
                <button
                  onClick={() => setCampusTab('admissions')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    campusTab === 'admissions' ? 'bg-white text-[#3B5249] font-medium shadow-xs' : 'text-stone-400'
                  }`}
                  id="tab-campus-admissions"
                >
                  <Image className="w-3 h-3" />
                  <span>招生海报 (3张)</span>
                </button>
                <button
                  onClick={() => setCampusTab('tissue')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    campusTab === 'tissue' ? 'bg-white text-[#3B5249] font-medium shadow-xs' : 'text-stone-400'
                  }`}
                  id="tab-campus-tissue"
                >
                  <Layout className="w-3 h-3" />
                  <span>诚信纸巾 (2张)</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Campus H5 */}
            {campusTab === 'h5' && (
              <div className="flex items-center justify-center py-2 w-full">
                <div className="relative w-full max-w-[280px] aspect-[9/16] bg-stone-900 rounded-[36px] p-2 shadow-xl border-4 border-stone-800 overflow-hidden">
                  <div className="w-full h-full rounded-[28px] overflow-hidden bg-black relative">
                    {project.videoUrl && (
                      <VideoPlayer
                        src={project.videoUrl}
                        title="校园宣传H5"
                        isVertical={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Admissions Posters */}
            {campusTab === 'admissions' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">招生海报组 (3张竖版海报)</span>
                  <div className="flex bg-stone-100 rounded-md p-0.5 text-xs">
                    <button
                      onClick={() => setCampusAdmissionsViewMode('stack')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        campusAdmissionsViewMode === 'stack' ? 'bg-white text-[#3B5249]' : 'text-stone-400'
                      }`}
                    >
                      堆叠
                    </button>
                    <button
                      onClick={() => setCampusAdmissionsViewMode('grid')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        campusAdmissionsViewMode === 'grid' ? 'bg-white text-[#3B5249]' : 'text-stone-400'
                      }`}
                    >
                      平铺
                    </button>
                  </div>
                </div>

                {campusAdmissionsViewMode === 'stack' ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 bg-stone-50 rounded-2xl border border-stone-200/30">
                    <div className="relative w-full max-w-[220px] h-[330px] select-none flex items-center justify-center">
                      {admissionsImages.map((img, idx) => {
                        const offset = (idx - campusAdmissionsActiveIdx + admissionsImages.length) % admissionsImages.length;
                        const isTop = offset === 0;
                        const translateSkews = [
                          { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 },
                          { x: 10, y: 12, rotate: 2, scale: 0.95, zIndex: 20, opacity: 0.85 },
                          { x: 20, y: 24, rotate: 4, scale: 0.9, zIndex: 10, opacity: 0.7 }
                        ];
                        const layout = translateSkews[offset] || translateSkews[0];

                        return (
                          <div
                            key={idx}
                            style={{
                              transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg) scale(${layout.scale})`,
                              zIndex: layout.zIndex,
                              opacity: layout.opacity,
                            }}
                            onClick={() => {
                              if (isTop) {
                                setLightboxImg(img);
                              } else {
                                setCampusAdmissionsActiveIdx(idx);
                              }
                            }}
                            className="absolute inset-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md cursor-pointer transition-all duration-500 origin-bottom"
                          >
                            <img
                              src={img}
                              alt="招生海报"
                              className="w-full h-full object-cover pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCampusAdmissionsActiveIdx((prev) => (prev + 1) % admissionsImages.length)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>下一张</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono text-stone-400">
                        {campusAdmissionsActiveIdx + 1} / {admissionsImages.length}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {admissionsImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImg(img)}
                        className="group relative rounded-xl overflow-hidden aspect-[2/3] bg-stone-100 border border-stone-200 cursor-zoom-in transition-all"
                      >
                        <img
                          src={img}
                          alt="招生海报"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Tissue Paper Posters */}
            {campusTab === 'tissue' && (
              <div className="flex flex-col gap-3">
                <span className="text-[11px] text-stone-400">诚信纸巾海报 (2张竖版海报)</span>
                <div className="grid grid-cols-2 gap-4 py-2">
                  {tissueImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImg(img)}
                      className="group relative rounded-xl overflow-hidden aspect-[2/3] bg-stone-100 border border-stone-200 cursor-zoom-in transition-all"
                    >
                      <img
                        src={img}
                        alt="诚信纸巾海报"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* 5. AE合集（视频） */}
      {project.id === 'graphic-e' && (
        <div className="flex flex-col gap-4 w-full">
          <div className="border-b border-stone-200 pb-2">
            <span className="text-xs text-stone-500 font-serif font-bold">AE合集视频</span>
          </div>
          <div className="w-full py-2">
            {project.videoUrl && (
              <VideoPlayer
                src={project.videoUrl}
                title={project.title}
                isVertical={false}
              />
            )}
          </div>
        </div>
      )}

      {/* Lightbox / Zoom Dialog overlay */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out animate-fade-in"
          onClick={() => setLightboxImg(null)}
          id="custom-gallery-lightbox"
        >
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
            id="btn-close-lightbox"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-full max-h-[85vh] rounded-lg overflow-hidden border border-stone-800/60 shadow-2xl">
            <img 
              src={lightboxImg} 
              alt="放大检视" 
              className="max-w-full max-h-[85vh] object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
}
