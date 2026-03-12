import AIEmployeesPage from '@/components/ai-employees/AIEmployeesPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Employees — Your 24/7 Digital Workforce',
  description: 'Meet your AI employees — 8 specialized agents that answer calls, capture leads, write content, manage social media, and automate operations around the clock.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <AIEmployeesPage />
    </>
  );
}
