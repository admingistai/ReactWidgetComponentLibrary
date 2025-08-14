/**
 * LandingPage - Main landing page for NYTimes Widget Library
 * Showcases the widget capabilities with beautiful design and animations
 */

import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { TechStack } from '@/components/landing/TechStack';
import { CTASection } from '@/components/landing/CTASection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section with gradient background */}
      <HeroSection />
      
      {/* Features showcase grid */}
      <FeaturesGrid />
      
      {/* Interactive widget demo */}
      <InteractiveDemo />
      
      {/* Technology stack showcase */}
      <TechStack />
      
      {/* Call to action section */}
      <CTASection />
    </div>
  );
}