import PricingPage from '@/components/pricing/PricingPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PRUVE Pricing — Hire Your AI Employee',
  description: 'Transparent pricing for your AI employee. Three plans — The Operator, The Manager, and The Executive. No hidden fees, no contracts. Setup in 7 days.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <PricingPage />
    </>
  );
}
