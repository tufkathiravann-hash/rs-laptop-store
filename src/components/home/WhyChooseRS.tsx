import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  RotateCcw,
  Headphones,
  Award,
  Truck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const WhyChooseRS: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: '100% Certified Genuine Hardware',
      description: 'Every laptop is sourced directly from tier-1 manufacturers with intact original seals and serial verification.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'Zero-Downtime Hot Swap',
      description: 'If your machine develops any hardware defect during warranty, we courier a replacement unit before picking up the defective one.'
    },
    {
      icon: <Award className="w-6 h-6 text-red-400" />,
      title: 'Factory Custom Configurator',
      description: 'Get your machine with upgraded 64GB+ DDR5 and 4TB NVMe SSD installed in clean-room environments without voiding OEM warranty.'
    },
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: 'Insured White-Glove Shipping',
      description: 'Dispatched with tamper-proof security seals, shock monitoring indicators, and free next-day express delivery in India.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-red-500" />,
      title: '30-Day Risk-Free Trial',
      description: 'Test your machine with your actual creative, gaming, or enterprise workloads with full 30-day money-back guarantee.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-red-400" />,
      title: '24/7 Senior Tech Concierge',
      description: 'Speak directly to certified hardware engineers for thermal tuning, driver optimization, and BIOS calibration.'
    }
  ];

  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-xs font-mono text-red-600 uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The RS Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-display">
            Why Discerning Engineers Choose RS.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We don't just sell laptops; we build and back the computing fleet that powers modern innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-7 rounded-3xl bg-slate-900 text-white hover:bg-black border border-slate-800 hover:border-red-600/50 transition-all duration-300 space-y-3.5 group shadow-xl hover:shadow-2xl hover:shadow-red-950/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
