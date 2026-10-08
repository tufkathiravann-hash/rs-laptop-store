import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LAPTOPS_DATA } from '../../data/laptops';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, ArrowRight, Layers, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalFleetShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const flagshipLaptops = LAPTOPS_DATA.slice(0, 8);

  useEffect(() => {
    // Only enable pinning on large desktop screens
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 lg:py-24 relative overflow-hidden z-10 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-xs font-mono text-red-500 mb-2 uppercase tracking-widest font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>GSAP PINNED CHOREOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            The Flagship 2026 Fleet.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Scroll horizontally through our certified high-performance workstation builds.
          </p>
        </div>

        <Link
          to="/laptops"
          className="text-xs font-mono font-bold text-red-500 hover:text-white transition-colors flex items-center gap-1.5 group"
        >
          <span>View All 30+ Models</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Horizontal Pin Track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-4 sm:px-6 lg:px-12 overflow-x-auto lg:overflow-visible pb-4 will-change-transform scrollbar-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {flagshipLaptops.map((laptop) => (
          <div
            key={laptop.id}
            className="w-[300px] sm:w-[360px] lg:w-[380px] shrink-0"
          >
            <ProductCard laptop={laptop} />
          </div>
        ))}

        {/* Explore More Card at end of track */}
        <div className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl bg-gradient-to-br from-red-950 via-titanium-900 to-black border border-red-500/40 p-8 flex flex-col justify-between text-center items-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Explore Full Catalog</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Filter by RTX 4090, M3 Max, OLED displays, and custom RAM/SSD capacity.
            </p>
          </div>
          <Link
            to="/laptops"
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-neon-red flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Open Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
