import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/ai-receptionist/Hero';
import ProblemSection from '@/components/services/ai-receptionist/ProblemSection';
import InteractiveDemo from '@/components/services/ai-receptionist/InteractiveDemo';
import HowItWorks from '@/components/services/ai-receptionist/HowItWorks';
import ResultsSection from '@/components/services/ai-receptionist/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'AI Receptionist — Answer Every Call 24/7, Book Appointments Automatically',
  description:
    'Never miss a call again. Pruve\'s AI receptionist answers calls 24/7, books appointments, sends confirmations, and fills cancelled slots — without putting a single customer on hold.',
};

export default function AIReceptionistPage() {
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
