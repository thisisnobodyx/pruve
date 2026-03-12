import AboutPage from '@/components/about/AboutPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — The Team Behind Your AI Employees',
  description: 'Pruve is an AI automation agency that builds intelligent employees for small businesses. Learn about our mission to make AI accessible to every business owner.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <AboutPage />
    </>
  );
}
