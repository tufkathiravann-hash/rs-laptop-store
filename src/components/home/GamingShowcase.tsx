import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Zap, ShieldAlert, Cpu, ArrowRight, Gauge } from 'lucide-react';
import { LAPTOPS_DATA } from '../../data/laptops';
import { useCurrency } from '../../context/CurrencyContext';
import { SafeImage } from '../common/SafeImage';

export const GamingShowcase: React.FC = () => {
  const rogScar = LAPTOPS_DATA.find((l) => l.id === 'rog-scar-18-2024') || LAPTOPS_DATA[0];
  const { format } = useCurrency();

  return (
    <section className="bg-gradient-to-br from-red-700 via-red-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      {/* Animated ambient lighting glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/30 blur-3xl pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white shadow-lg">
            <Flame className="w-4 h-4 text-red-400" />
            <span>UNLEASH MAX-TGP POWER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display">
            Liquid Metal Cooling. <br />
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
              175W RTX 4090 Domination.
            </span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
            Engineered with Conductonaut Extreme liquid metal and tri-fan full-surround heatsinks. Push frame rates beyond 240 FPS with zero thermal throttling under heavy 4K ray-traced gaming or local AI training.
          </p>

          {/* Spec stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/80 border border-white/20 space-y-1 shadow-xl">
              <div className="text-xl font-bold font-mono text-white">240Hz / 3ms</div>
              <div className="text-[11px] text-slate-300">ROG Nebula HDR Mini-LED</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/80 border border-white/20 space-y-1 shadow-xl">
              <div className="text-xl font-bold font-mono text-red-400">5.8 GHz Peak</div>
              <div className="text-[11px] text-slate-300">i9-14900HX 24-Cores</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/80 border border-white/20 space-y-1 shadow-xl">
              <div className="text-xl font-bold font-mono text-yellow-300">1100 Nits</div>
              <div className="text-[11px] text-slate-300">2000+ Dimming Zones</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to={`/product/${rogScar.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-black font-black text-xs shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Configure SCAR 18 ({format(rogScar.price)})</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </Link>
            <Link
              to="/laptops?category=gaming"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black/80 hover:bg-black text-white border border-white/20 text-xs font-mono font-bold transition-colors flex items-center justify-center"
            >
              View All Gaming Rigs &rarr;
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative group p-6 rounded-3xl bg-black/40 border border-white/20 shadow-2xl"
          >
            <SafeImage
              src={rogScar.images[0]}
              alt={rogScar.name}
              className="max-h-[340px] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
