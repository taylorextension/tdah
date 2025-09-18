import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { MethodSection } from './components/MethodSection';
import { OfferSection } from './components/OfferSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { GuaranteeSection } from './components/GuaranteeSection';

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans text-slate-800 antialiased">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <MethodSection />
        <OfferSection />
        <PricingSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCtaSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;