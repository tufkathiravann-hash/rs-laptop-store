import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { LAPTOPS_DATA } from '../../data/laptops';
import { useCurrency } from '../../context/CurrencyContext';
import { SafeImage } from '../common/SafeImage';

export const CreatorShowcase: React.FC = () => {
  const mbp = LAPTOPS_DATA.find((l) => l.id === 'macbook-pro-16-m3max') || LAPTOPS_DATA[1];
  const { format } = useCurrency();

  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Visual */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl"
          >
            <SafeImage
              src={mbp.images[0]}
              alt={mbp.name}
              className="max-h-[320px] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

        {/* Right Text */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-xs font-mono text-red-600 font-bold">
            <Palette className="w-3.5 h-3.5" />
            <span>PRO CINEMA WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight font-display">
            Pixel Perfection. <br />
            <span className="text-red-600">1600 Nits Liquid Retina XDR.</span>
          </h2>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Grade 8K RAW video, orchestrate 100+ audio tracks in Dolby Atmos, and render complex Blender 3D geometry with zero fan noise and up to 128GB Unified Memory.
          </p>

          <div className="space-y-3">
            {[
              'Factory-calibrated Delta E < 1 Pantone & Calman validated color',
              'Dual hardware ProRes decode and encode acceleration engines',
              'Zero performance drop when running purely on battery power'
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
            <Link
              to={`/product/${mbp.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-neon-red flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Customize M3 Max ({format(mbp.price)})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/laptops?category=creator"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-black transition-colors flex items-center justify-center"
            >
              View Creator Studio Collection &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
