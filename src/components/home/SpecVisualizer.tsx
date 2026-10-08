import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Flame, Tv, Battery, ShieldCheck, Sparkles } from 'lucide-react';

export const SpecVisualizer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<'cpu' | 'gpu' | 'cooling' | 'display' | 'battery'>('cooling');

  const components = [
    {
      id: 'cooling' as const,
      label: 'Liquid Metal & Vapor Chamber',
      icon: <Flame className="w-4 h-4 text-red-400" />,
      title: 'Conductonaut Extreme Liquid Metal',
      description: 'Provides up to 15°C lower CPU temps compared to traditional thermal paste, allowing sustained 175W power delivery without thermal throttling.',
      specs: ['0.05mm ultra-thin copper vapor chamber', 'Tri-fan 360° exhaust ventilation', '0dB ambient quiet mode under light loads']
    },
    {
      id: 'cpu' as const,
      label: 'Intel Core Ultra & M3 Max',
      icon: <Cpu className="w-4 h-4 text-red-500" />,
      title: 'Hybrid Silicon Architecture with Local NPU',
      description: 'Combines ultra-dense performance cores with dedicated neural processing units (NPU) for real-time generative AI, noise cancellation, and local LLM inference.',
      specs: ['Up to 24 Cores / 32 Threads', '5.8 GHz peak single-core clock', 'Integrated 45 TOPS AI Boost engine']
    },
    {
      id: 'gpu' as const,
      label: 'NVIDIA RTX 4090 16GB GDDR6',
      icon: <Zap className="w-4 h-4 text-white" />,
      title: 'Ada Lovelace Architecture & DLSS 3.5',
      description: 'Full desktop-grade silicon packaged for mobile. 4th Gen Tensor Cores and 3rd Gen RT Cores deliver optical multi-frame generation and full ray tracing.',
      specs: ['16GB high-speed GDDR6 VRAM', '175W Maximum TGP with Dynamic Boost', 'NVIDIA Studio driver acceleration']
    },
    {
      id: 'display' as const,
      label: 'Mini-LED & OLED Lumina',
      icon: <Tv className="w-4 h-4 text-red-400" />,
      title: 'ProMotion 240Hz & 1000+ Nits HDR',
      description: 'Over 2,000 individual local dimming zones provide inky true blacks, infinite contrast ratio, and 100% DCI-P3 color reproduction.',
      specs: ['1,000,000:1 Dynamic Contrast Ratio', '0.2ms pixel response time', 'Pantone & Calman color verified']
    },
    {
      id: 'battery' as const,
      label: '99.9Wh Flight-Legal Cell',
      icon: <Battery className="w-4 h-4 text-yellow-400" />,
      title: 'High-Density Silicon-Anode Battery',
      description: 'Engineered right at the FAA 100Wh legal airline flight maximum. Paired with GaN fast charging for 0-80% top-up in 30 minutes.',
      specs: ['99.99 Watt-Hours maximum capacity', 'Up to 22 hours video playback', '140W USB-C GaN fast charge']
    }
  ];

  const current = components.find((c) => c.id === activeComponent) || components[0];

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-xs font-mono text-red-500 uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Hardware Teardown</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Precision Engineering from the Inside Out.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click any component to inspect the cutting-edge aerospace materials and thermal architecture.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center flex-wrap gap-2">
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComponent(comp.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeComponent === comp.id
                  ? 'bg-red-600 text-white font-bold shadow-neon-red scale-105'
                  : 'bg-titanium-900 hover:bg-titanium-800 text-slate-300 border border-white/10'
              }`}
            >
              {comp.icon}
              <span>{comp.label}</span>
            </button>
          ))}
        </div>

        {/* Card Visual Breakdown with Framer Motion transitions */}
        <div className="p-6 sm:p-10 rounded-3xl bg-titanium-900/80 border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Left Diagram */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-6 shadow-inner">
            <div className="absolute inset-0 bg-red-600/10 opacity-40 pointer-events-none" />
            <motion.img
              key={current.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.6 }}
              src="/images/laptops/tech-1.jpg"
              alt="Silicon motherboard close-up"
              className="w-full h-full object-cover rounded-xl filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-titanium-950/95 backdrop-blur-xl border border-white/15 shadow-xl">
              <span className="text-xs font-mono text-white font-bold">{current.label}</span>
              <span className="text-[10px] font-mono text-red-500 font-bold">RS LAB INSPECTED</span>
            </div>
          </div>

          {/* Right Explanatory Specs with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-600/15 border border-red-500/30 text-xs font-mono text-red-500 font-bold">
                {current.icon}
                <span>ACTIVE SUBSYSTEM</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug font-display">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Architectural Highlights
                </span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {current.specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
