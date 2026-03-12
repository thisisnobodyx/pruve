import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/multi-channel/Hero';
import ProblemSection from '@/components/services/multi-channel/ProblemSection';
import InteractiveDemo from '@/components/services/multi-channel/InteractiveDemo';
import HowItWorks from '@/components/services/multi-channel/HowItWorks';
import ResultsSection from '@/components/services/multi-channel/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Multi-Channel AI Agent — One Brain Across Every Platform',
  description:
    'Deploy one AI agent across WhatsApp, Instagram, Facebook, Telegram, email, and web chat. Unified inbox, cross-channel context, and instant responses on every platform.',
};

export default function MultiChannelPage() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
