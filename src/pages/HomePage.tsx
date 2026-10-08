import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { KineticMarquee } from '../components/home/KineticMarquee';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { HorizontalFleetShowcase } from '../components/home/HorizontalFleetShowcase';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { GamingShowcase } from '../components/home/GamingShowcase';
import { StickyStackShowcase } from '../components/home/StickyStackShowcase';
import { CreatorShowcase } from '../components/home/CreatorShowcase';
import { DealsSection } from '../components/home/DealsSection';
import { SpecVisualizer } from '../components/home/SpecVisualizer';
import { WhyChooseRS } from '../components/home/WhyChooseRS';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero with 3D Tilt & Model Switcher (Black Stage) */}
      <HeroSection />

      {/* 2. GSAP Kinetic Typography Scrub Line (Black Stage) */}
      <KineticMarquee />

      {/* 3. Structured Category Cards (Crisp White Stage) */}
      <CategoryGrid />

      {/* 4. GSAP Pinned Horizontal Fleet Track (Deep Black Stage) */}
      <HorizontalFleetShowcase />

      {/* 5. Filterable Featured Hardware Showcase (Black Stage) */}
      <FeaturedSection />

      {/* 6. Dramatic RTX 4090 Gaming Showcase (Blazing Crimson Red Stage) */}
      <GamingShowcase />

      {/* 7. GSAP Sticky Stack Architecture Blueprint (Crisp White Stage) */}
      <StickyStackShowcase />

      {/* 8. Studio-Grade Creator Showcase (Crisp White Stage) */}
      <CreatorShowcase />

      {/* 9. Live Flash Deals with Countdown (Black Stage) */}
      <DealsSection />

      {/* 10. Interactive Component & Silicon Teardown (Black Stage) */}
      <SpecVisualizer />

      {/* 11. Value Pillars & Warranties (Crisp White Stage) */}
      <WhyChooseRS />

      {/* 12. VIP Club Newsletter Drop (Blazing Crimson Red Stage) */}
      <NewsletterSection />
    </div>
  );
};
