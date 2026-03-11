import ScrollToTop from '@/components/shared/ScrollToTop';
import WhatsAppHero from '@/components/services/whatsapp-agent/Hero';
import ProblemSection from '@/components/services/whatsapp-agent/ProblemSection';
import InteractiveDemo from '@/components/services/whatsapp-agent/InteractiveDemo';
import HowItWorks from '@/components/services/whatsapp-agent/HowItWorks';
import ResultsSection from '@/components/services/whatsapp-agent/ResultsSection';

export const metadata = {
  title: 'WhatsApp Agent — Pruve',
  description:
    'An AI-powered WhatsApp agent that responds to customers instantly, captures leads, takes bookings, and handles FAQs — all without human intervention.',
};

export default function WhatsAppAgentPage() {
  return (
    <main>
      <ScrollToTop />
      <WhatsAppHero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <ResultsSection />
    </main>
  );
}
