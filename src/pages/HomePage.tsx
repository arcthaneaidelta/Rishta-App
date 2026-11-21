import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { QuickSignup } from '../components/home/QuickSignup';
import { FreeForeverSection } from '../components/home/FreeForeverSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { CommunityPreview } from '../components/home/CommunityPreview';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <QuickSignup />
      <FreeForeverSection />
      <HowItWorksSection />
      <CommunityPreview />
      <FinalCTASection />
    </div>
  );
};
