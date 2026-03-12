import ScrollToTop from '@/components/shared/ScrollToTop';
import WebDesignHero from '@/components/services/web-design/Hero';
import ProblemSection from '@/components/services/web-design/ProblemSection';
import InteractiveDemo from '@/components/services/web-design/InteractiveDemo';
import HowItWorks from '@/components/services/web-design/HowItWorks';
import ResultsSection from '@/components/services/web-design/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Custom Web Design — Fast, Mobile-First Websites That Convert',
  description:
    'Get a custom-designed website built for speed, mobile, and conversions. Pruve creates high-performing websites that turn visitors into paying customers. Request a free quote.',
};

export default function WebDesignRoute() {
  return (
    <main>
      <ScrollToTop />
      <WebDesignHero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
