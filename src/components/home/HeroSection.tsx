import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { LAPTOPS_DATA } from '../../data/laptops';
import { useCurrency } from '../../context/CurrencyContext';

export const HeroSection: React.FC = () => {
  const { format } = useCurrency();

  const heroLaptops = [
    LAPTOPS_DATA.find((l) => l.id === 'rog-scar-18-2024') || LAPTOPS_DATA[0],
    LAPTOPS_DATA.find((l) => l.id === 'macbook-pro-16-m3max') || LAPTOPS_DATA[1],
    LAPTOPS_DATA.find((l) => l.id === 'razer-blade-16-dual-mode') || LAPTOPS_DATA[2]
  ];

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const currentHero = heroLaptops[activeHeroIndex];

  // 3D Card mouse tilt effect
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -(y / rect.height) * 14,
      rotateY: (x / rect.width) * 14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient Red & White Radial Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[400px] sm:h-[650px] bg-gradient-radial from-red-600/25 via-red-950/20 to-transparent blur-3xl pointer-events-none rounded-full"
      />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-white/5 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Kinetic Headlines & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6 text-center lg:text-left"
        >
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-titanium-900/90 border border-red-500/40 text-xs font-mono text-slate-200 shadow-neon-red/20 backdrop-blur-xl"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-bold tracking-wider">NEXT-GEN COMPUTING 2026</span>
            <span className="text-slate-600">•</span>
            <span className="text-white font-medium">Flagship Indian Fleet</span>
          </motion.div>

          {/* Main Kinetic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] font-display"
          >
            The Pinnacle of <br />
            <span className="gradient-text-cyan drop-shadow-[0_0_35px_rgba(255,0,51,0.5)]">
              Portable Power.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
          >
            Immerse yourself in precision-engineered computing. Featuring desktop-class 175W RTX 4090 graphics, Liquid Retina XDR displays, liquid metal thermals, and local AI neural engines.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link
              to={`/product/${currentHero.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:opacity-95 text-white font-extrabold text-sm shadow-neon-red flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Explore {currentHero.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              to="/laptops"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-titanium-900 hover:bg-titanium-800 text-white font-semibold text-sm border border-white/20 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4 text-red-500" />
              <span>Browse All 30+ Rigs</span>
            </Link>
          </motion.div>

          {/* Value props in hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left"
          >
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-red-500">RTX 4090 175W</div>
              <div className="text-[11px] text-slate-400">Peak Thermal Headroom</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-white">100% DCI-P3</div>
              <div className="text-[11px] text-slate-400">Calibrated OLED &amp; Mini-LED</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-red-500">2-Year VIP Care</div>
              <div className="text-[11px] text-slate-400">Zero-Downtime Hot Swap</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Tilt Flagship Stage with Framer Motion Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-center justify-center space-y-6"
        >
          {/* 3D Tilt Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-full max-w-lg aspect-[16/11] bg-gradient-to-b from-titanium-900/95 via-titanium-950/95 to-black rounded-3xl border border-white/15 p-6 shadow-2xl flex items-center justify-center group overflow-hidden cyber-border"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-cyber-glow opacity-80 pointer-events-none" />

            {/* Floating Top Specs Tag */}
            <motion.div
              key={`tag-${currentHero.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 backdrop-blur-md border border-red-500/40 text-xs font-mono text-red-500 shadow-md"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{currentHero.specs.processor.split('(')[0]}</span>
            </motion.div>

            <motion.div
              key={`price-${currentHero.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 z-20 font-mono text-sm font-bold text-white bg-black/90 px-3.5 py-1 rounded-full border border-white/20 shadow-md"
            >
              {format(currentHero.price)}
            </motion.div>

            {/* Laptop Big Image with AnimatePresence */}
            <Link to={`/product/${currentHero.id}`} className="w-full h-full flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentHero.id}
                  src={currentHero.images[0]}
                  alt={currentHero.name}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== window.location.origin + '/images/laptop-placeholder.svg') {
                      target.src = '/images/laptop-placeholder.svg';
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="max-h-[300px] max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>
            </Link>

            {/* Floating Bottom Spec Pill */}
            <motion.div
              key={`spec-${currentHero.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-xl bg-black/95 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200 whitespace-nowrap shadow-lg"
            >
              <span>{currentHero.specs.gpu.split('(')[0]}</span>
              <span className="text-slate-600">•</span>
              <span className="text-red-500 font-bold">{currentHero.specs.refreshRate}</span>
            </motion.div>
          </div>

          {/* Interactive Model Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-titanium-900/90 border border-white/10 backdrop-blur-xl shadow-xl">
            {heroLaptops.map((laptop, index) => (
              <button
                key={laptop.id}
                onClick={() => setActiveHeroIndex(index)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  activeHeroIndex === index
                    ? 'bg-red-600 text-white font-bold shadow-neon-red scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{laptop.brand}</span>
                <span className="opacity-80 hidden sm:inline">{laptop.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
