import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/multi-channel/Hero';
import ProblemSection from '@/components/services/multi-channel/ProblemSection';
import InteractiveDemo from '@/components/services/multi-channel/InteractiveDemo';
import HowItWorks from '@/components/services/multi-channel/HowItWorks';
import ResultsSection from '@/components/services/multi-channel/ResultsSection';

export const metadata = {
  title: 'Multi-Channel Inbox — Pruve',
  description:
    'Deploy a single AI agent across WhatsApp, Instagram, Telegram, email, and web chat — with a unified inbox for every conversation.',
};

export default function MultiChannelPage() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <ResultsSection />
    </main>
  );
}
