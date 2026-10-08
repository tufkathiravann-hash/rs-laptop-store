import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  Award,
  Globe,
  Users,
  Activity,
  CheckCircle2,
  Lock,
  Flame
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2021',
      title: 'Genesis of RS Laptops',
      desc: 'Founded by senior hardware engineers tired of compromise between gaming power and enterprise build quality.'
    },
    {
      year: '2023',
      title: 'Clean-Room Upgrade Lab',
      desc: 'Commissioned our ISO Class 5 clean-room facility for dust-free thermal paste and NVMe modifications.'
    },
    {
      year: '2025',
      title: 'Global Zero-Downtime Guarantee',
      desc: 'Expanded next-day swap courier network across 38 countries with 24/7 dedicated hardware concierge.'
    },
    {
      year: '2026',
      title: 'Next-Gen Mobile Workstation Fleet',
      desc: 'Pioneered custom AI-tuned liquid-metal cooling integrations for 175W RTX 4090 and M3 Max silicon.'
    }
  ];

  const labs = [
    {
      title: 'Thermal & Acoustic Stress Chamber',
      desc: 'Every machine is stress-tested under 100% synthetic load in 45°C ambient chambers to guarantee zero thermal throttling.',
      icon: <Activity className="w-6 h-6 text-red-500" />
    },
    {
      title: 'Optical Color Calibration Bench',
      desc: 'Calibrated using Konica Minolta CS-200 spectroradiometers to ensure 100% DCI-P3 gamut and Delta E < 1 accuracy.',
      icon: <Sparkles className="w-6 h-6 text-red-400" />
    },
    {
      title: 'Zero-Downtime Global Logistics',
      desc: 'Strategically positioned hubs in Mumbai, Bengaluru, Delhi, London, and San Francisco for rapid insured dispatch.',
      icon: <Globe className="w-6 h-6 text-red-500" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'About RS Heritage' }]} />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-xs font-mono text-red-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span>OUR ENGINEERING MANIFESTO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          We Build for Those Who <br />
          <span className="text-red-500">Demand the Impossible.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          RS Laptops was created to bridge the gap between generic factory assembly lines and extreme custom performance. We curate, tune, test, and deliver the world's most capable mobile computing hardware.
        </p>
      </div>

      {/* Lab Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-4 hover:border-red-500/40 transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-neon-red">
              {lab.icon}
            </div>
            <h3 className="text-base font-bold text-white">{lab.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{lab.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Timeline */}
      <div className="p-8 sm:p-12 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-8 shadow-2xl">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono text-red-500 uppercase tracking-wider font-bold">Evolutionary Milestones</span>
          <h2 className="text-2xl font-black text-white font-display">The Journey of RS Precision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="relative p-6 rounded-3xl bg-black border border-white/10 hover:border-red-500/40 space-y-2 shadow-lg transition-all"
            >
              <span className="text-xl font-mono font-black text-red-500">{m.year}</span>
              <h4 className="text-sm font-bold text-white">{m.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certified Quality Badges */}
      <div className="p-8 rounded-3xl bg-titanium-900/90 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Certified Factory Partner</h3>
          <p className="text-xs text-slate-300">
            Authorized tier-1 partner with ASUS ROG, Razer, Apple, Dell Technologies, and Lenovo.
          </p>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-slate-300 font-bold">
          <span>ISO 9001:2015</span>
          <span className="text-red-500">•</span>
          <span>PCI-DSS Level 1</span>
          <span className="text-red-500">•</span>
          <span>256-Bit SSL</span>
        </div>
      </div>
    </motion.div>
  );
};
