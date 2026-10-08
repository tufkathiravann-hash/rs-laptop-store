import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateBar = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && barRef.current) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateBar();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-black/50 overflow-hidden">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-red-600 via-rose-500 to-white shadow-[0_0_14px_rgba(255,0,51,0.9)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
