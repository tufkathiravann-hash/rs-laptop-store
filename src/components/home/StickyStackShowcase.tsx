import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Zap, Award, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { SafeImage } from '../common/SafeImage';

gsap.registerPlugin(ScrollTrigger);

export const StickyStackShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { format } = useCurrency();

  const chapters = [
    {
      step: '01',
      tag: 'THERMAL MASTERY',
      title: 'Conductonaut Extreme Liquid Metal',
      desc: 'Applied in clean-room environments to both CPU and GPU dies. Replaces conventional silicone thermal paste to lower operating temperatures by up to 15°C under sustained 175W power draw.',
      badge: 'Zero Thermal Throttling',
      image: '/images/showcase/thermal.jpg',
      stat: '15°C Cooler',
      statLabel: 'Under Peak Synthetic Load'
    },
    {
      step: '02',
      tag: 'OPTICAL EXCELLENCE',
      title: 'Delta E < 1 Calman Factory Calibration',
      desc: 'Each panel undergoes multi-point optical spectroradiometer profiling. 100% DCI-P3 wide color gamut and 1600-nit HDR ensure every frame matches Hollywood color grading standards.',
      badge: '100% DCI-P3 Color Gamut',
      image: '/images/showcase/optical.jpg',
      stat: 'Delta E < 1',
      statLabel: 'Individual Spectrometer Tuning'
    },
    {
      step: '03',
      tag: 'SERVICE CONCIERGE',
      title: 'Zero-Downtime Hot Swap Warranty',
      desc: 'Should any hardware defect occur during your 2-year warranty period, our insured courier dispatches a brand new replacement machine to your door before retrieving the defective laptop.',
      badge: '2-Year VIP Care Included',
      image: '/images/showcase/warranty.jpg',
      stat: 'Zero Downtime',
      statLabel: 'Next-Day Courier Replacement'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.sticky-stack-card');
      cards.forEach((card, idx) => {
        if (idx < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92 - idx * 0.03,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[idx + 1],
              start: 'top 70%',
              end: 'top 30%',
              scrub: true
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-xs font-mono text-red-600 uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GSAP STACKING CHAPTERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-display">
            The RS Architecture Blueprint.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Scroll through the engineering layers that differentiate RS custom laptops from off-the-shelf computers.
          </p>
        </div>

        {/* Stack Cards Container */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {chapters.map((ch, idx) => (
            <div
              key={idx}
              className="sticky-stack-card sticky top-24 rounded-3xl bg-black text-white p-8 sm:p-12 border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left text */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-red-500">{ch.step}</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                    {ch.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white font-display leading-snug">
                  {ch.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ch.desc}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">{ch.stat}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{ch.statLabel}</div>
                  </div>
                  <Link
                    to="/about"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <span>Lab Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-5 relative aspect-[16/11] rounded-2xl bg-titanium-950 border border-white/15 overflow-hidden flex items-center justify-center p-4 shadow-xl">
                <SafeImage
                  src={ch.image}
                  alt={ch.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
