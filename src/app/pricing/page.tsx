import PricingPage from '@/components/pricing/PricingPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for AI automation. Choose the plan that fits your business.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <PricingPage />
    </>
  );
}
