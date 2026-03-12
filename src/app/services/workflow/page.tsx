import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/workflow/Hero';
import ProblemSection from '@/components/services/workflow/ProblemSection';
import InteractiveDemo from '@/components/services/workflow/InteractiveDemo';
import HowItWorks from '@/components/services/workflow/HowItWorks';
import ResultsSection from '@/components/services/workflow/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Workflow Automation — Pruve',
  description:
    'Custom workflow automations that connect your tools, eliminate manual busywork, and keep your business running like clockwork.',
};

export default function WorkflowPage() {
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
