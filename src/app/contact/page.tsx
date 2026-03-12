import ContactPage from '@/components/contact/ContactPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free Strategy Call',
  description: 'Ready to automate your business? Contact Pruve for a free consultation. Tell us about your business and we\'ll show you how AI can save you time and money.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <ContactPage />
    </>
  );
}
