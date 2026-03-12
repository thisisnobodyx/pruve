import ScrollToTop from '@/components/shared/ScrollToTop';
import WhatsAppHero from '@/components/services/whatsapp-agent/Hero';
import ProblemSection from '@/components/services/whatsapp-agent/ProblemSection';
import InteractiveDemo from '@/components/services/whatsapp-agent/InteractiveDemo';
import HowItWorks from '@/components/services/whatsapp-agent/HowItWorks';
import ResultsSection from '@/components/services/whatsapp-agent/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'AI WhatsApp Agent — Instant Replies, Bookings & Lead Capture 24/7',
  description:
    'An AI-powered WhatsApp agent that responds to customers instantly, captures leads, takes bookings, and handles FAQs — all without human intervention. Never miss a message again.',
};

export default function WhatsAppAgentPage() {
  return (
    <main>
      <ScrollToTop />
      <WhatsAppHero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
