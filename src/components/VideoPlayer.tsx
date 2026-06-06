import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  externalUrl?: string;
  title: string;
  isVertical?: boolean;
}

export default function VideoPlayer({ src, poster, externalUrl, title, isVertical = false }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null); // ⭐ 新增：绑定最外层容器的 Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // ⭐ 新增：全屏状态监听
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 监听全屏状态变化，以便动态更新样式
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto hide controls on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log('Video play triggered: ', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const m = !isMuted;
    videoRef.current.muted = m;
    setIsMuted(m);
    if (m) {
      videoRef.current.volume = 0;
    } else {
      videoRef.current.volume = volume;
    }
  };

  const changeSpeed = () => {
    if (!videoRef.current) return;
    let nextRate = 1;
    if (playbackRate === 1) nextRate = 1.25;
    else if (playbackRate === 1.25) nextRate = 1.5;
    else if (playbackRate === 1.5) nextRate = 2;
    else nextRate = 1;

    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  // ⭐ 核心修改：让整个自定义播放器容器全屏，而不是单让视频节点全屏
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen(); // 兼容 Safari
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      ref={containerRef} // ⭐ 绑定容器 Ref
      className={`relative group bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-[#D2DBCE]/40 select-none transition-all flex items-center justify-center ${
        isFullscreen
          ? 'w-screen h-screen rounded-none border-none' // 全屏状态下的容器样式
          : isVertical 
            ? 'aspect-[9/16] max-w-[310px] mx-auto w-full' 
            : 'aspect-video w-full'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      id={`video-player-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* HTML video node */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        // ⭐ 样式修改：非全屏时用 object-cover 铺满漂亮裁剪；全屏时如果是竖屏视频，使用 object-contain 保证其不拉伸，四周黑边居中展示
        className={`w-full h-full transition-all ${
          isFullscreen && isVertical ? 'object-contain max-w-[56.25vh]' : 'object-cover'
        }`}
        preload="metadata"
        playsInline
        webkit-playsinline="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsWaiting(true)}
        onPlaying={() => setIsWaiting(false)}
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
      />

      {/* Play large/ambient overlay button when paused */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/45 cursor-pointer transition-all duration-300 group/center z-10"
        >
          <div className="w-16 h-16 rounded-full bg-[#FAF5EF]/95 text-[#3B5249] flex items-center justify-center shadow-lg transform transition group-hover/center:scale-110 active:scale-95">
            <Play fill="#3B5249" className="w-7 h-7 ml-1" />
          </div>
        </div>
      )}

      {/* Loading Ring Indicator */}
      {isWaiting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none z-10">
          <div className="w-12 h-12 border-4 border-[#A2B59F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video Control Overlays */}
      <div 
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Seek track bar */}
        <div className="flex items-center gap-3 w-full group/seek">
          <span className="text-[10px] font-mono text-[#D2DBCE] w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.05"
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-stone-700 hover:h-1.5 accent-[#FAF5EF] rounded-lg appearance-none cursor-pointer transition-all"
            style={{
              background: `linear-gradient(to right, #A2B59F ${
                (currentTime / (duration || 100)) * 100
              }%, #44403c ${(currentTime / (duration || 100)) * 100}%)`,
            }}
          />
          <span className="text-[10px] font-mono text-[#D2DBCE] w-8">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Controls */}
