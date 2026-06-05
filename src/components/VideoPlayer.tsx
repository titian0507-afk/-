import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, RotateCcw, Cpu } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  externalUrl?: string;
  title: string;
  isVertical?: boolean;
}

export default function VideoPlayer({ src, poster, externalUrl, title, isVertical = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className={`relative group bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-[#D2DBCE]/40 select-none transition-all ${
        isVertical ? 'aspect-[9/16] max-w-[310px] mx-auto w-full' : 'aspect-video w-full'
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
        className="w-full h-full object-cover"
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
          className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/45 cursor-pointer transition-all duration-300 group/center"
        >
          <div className="w-16 h-16 rounded-full bg-[#FAF5EF]/95 text-[#3B5249] flex items-center justify-center shadow-lg transform transition group-hover/center:scale-110 active:scale-95">
            <Play fill="#3B5249" className="w-7 h-7 ml-1" />
          </div>
        </div>
      )}

      {/* Loading Ring Indicator */}
      {isWaiting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="w-12 h-12 border-4 border-[#A2B59F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video Control Overlays */}
      <div 
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-10 ${
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
        <div className="flex items-center justify-between w-full text-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="hover:text-[#A2B59F] transition-colors p-1 rounded-full aspect-square"
              title={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="hover:text-[#A2B59F] transition-colors"
                title={isMuted ? '取消静音' : '静音'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/volume:w-16 h-1 accent-[#FAF5EF] rounded-full cursor-pointer appearance-none transition-all duration-300 bg-stone-700"
              />
            </div>

            {/* Playback rate speed */}
            <button
              onClick={changeSpeed}
              className="text-[10px] select-none font-mono font-medium tracking-wide bg-stone-800 hover:bg-stone-700 px-2.5 py-1.5 rounded-md transition-colors text-[#D2DBCE]"
            >
              {playbackRate}x 倍速
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Full external link if provided */}
            {externalUrl && (
              <a 
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs bg-[#FAF5EF]/15 hover:bg-[#FAF5EF]/25 text-[#FAF5EF] font-mono px-3 py-1.5 rounded-lg border border-[#FAF5EF]/10 transition-colors"
                title="前往完整视频网页播放"
              >
                <span className="font-sans text-[11px] font-light">外部原片</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={toggleFullscreen}
              className="hover:text-[#A2B59F] transition-colors p-1"
              title="全屏播放"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
