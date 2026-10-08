import React, { useState } from 'react';
import { ZoomIn, Sparkles, Shield, RotateCw, Maximize2 } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  isFlashDeal?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isNew,
  isFlashDeal
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const currentImage = images[activeIdx] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div
        className="relative aspect-[16/11] bg-titanium-950/90 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-6 cursor-crosshair group shadow-2xl"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isFlashDeal && (
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 text-white tracking-wider shadow-lg">
              ⚡ FLASH DEAL SPECIAL
            </span>
          )}
          {isNew && (
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyber-cyan text-titanium-950 tracking-wider">
              NEW FLAGSHIP 2026
            </span>
          )}
        </div>

        {/* Floating Resolution Pill */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-titanium-900/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>4K Ultra-Res Master Shots</span>
        </div>

        {/* Regular Image */}
        <SafeImage
          src={currentImage}
          alt={productName}
          className={`max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-all duration-300 ${
            isZoomed ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
        />

        {/* Interactive Magnifier Zoom Lens */}
        {isZoomed && (
          <div
            className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-150"
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '220%'
            }}
          />
        )}

        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-titanium-900/90 text-[11px] font-mono text-slate-400 border border-white/10">
          <ZoomIn className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="hidden sm:inline">Hover to inspect micro-chassis</span>
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`aspect-[16/10] rounded-xl bg-titanium-950/80 border p-1 overflow-hidden transition-all duration-200 ${
              activeIdx === idx
                ? 'border-cyber-cyan ring-2 ring-cyber-cyan/30 shadow-neon-cyan/40 scale-102'
                : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
            }`}
          >
            <SafeImage src={img} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
          </button>
        ))}
      </div>
    </div>
  );
};
