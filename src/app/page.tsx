import HeroSection from '@/components/home/HeroSection';
import ScrollToTop from '@/components/shared/ScrollToTop';
import MarqueeBar from '@/components/home/MarqueeBar';
import WhatWeDo from '@/components/home/WhatWeDo';
import LiveDemo from '@/components/home/LiveDemo';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import InteractiveTools from '@/components/home/InteractiveTools';
import CaseStudies from '@/components/home/CaseStudies';
import PricingPreview from '@/components/home/PricingPreview';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <MarqueeBar />
      <WhatWeDo />
      <LiveDemo />
      <ServicesShowcase />
      <HowItWorks />
      <InteractiveTools />
      <CaseStudies />
      <PricingPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
