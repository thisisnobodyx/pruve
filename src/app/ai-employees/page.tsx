import AIEmployeesPage from '@/components/ai-employees/AIEmployeesPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Employees',
  description: 'Meet your AI workforce. 8 specialized agents that handle calls, messages, content, and more.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <AIEmployeesPage />
    </>
  );
}
