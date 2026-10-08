import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const KineticMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic Line 1 moves left on scroll
      if (line1Ref.current && containerRef.current) {
        gsap.to(line1Ref.current, {
          xPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      // Kinetic Line 2 moves right on scroll
      if (line2Ref.current && containerRef.current) {
        gsap.to(line2Ref.current, {
          xPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-14 bg-black text-white overflow-hidden border-y border-white/10 select-none relative z-10"
    >
      {/* Line 1: Leftward scrub */}
      <div
        ref={line1Ref}
        className="flex whitespace-nowrap gap-8 text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase will-change-transform"
      >
        <span className="text-white">ROG SCAR 18 RTX 4090</span>
        <span className="text-red-500 font-serif italic">•</span>
        <span className="text-red-500 text-glow">LIQUID METAL THERMALS</span>
        <span className="text-white font-serif italic">•</span>
        <span className="text-white">APPLE M3 MAX 128GB</span>
        <span className="text-red-500 font-serif italic">•</span>
        <span className="text-red-500">240HZ MINI-LED HDR</span>
        <span className="text-white font-serif italic">•</span>
        <span className="text-white">ZERO THROTTLING GUARANTEE</span>
        <span className="text-red-500 font-serif italic">•</span>
      </div>

      {/* Line 2: Rightward scrub with outlined styling */}
      <div
        ref={line2Ref}
        className="flex whitespace-nowrap gap-8 text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase mt-3 will-change-transform -translate-x-[20%]"
      >
        <span className="text-red-500">INDIA NEXT-DAY AIR</span>
        <span className="text-white font-serif italic">•</span>
        <span className="text-white">FRAMEWORK MODULAR 16</span>
        <span className="text-red-500 font-serif italic">•</span>
        <span className="text-red-500">DELL XPS 16 4K OLED</span>
        <span className="text-white font-serif italic">•</span>
        <span className="text-white">RAZER BLADE DUAL-MODE</span>
        <span className="text-red-500 font-serif italic">•</span>
        <span className="text-red-500">2-YEAR VIP CONCIERGE</span>
        <span className="text-white font-serif italic">•</span>
      </div>
    </div>
  );
};
