'use client';

import ServicePageTemplate from '@/components/services/ServicePageTemplate';

const features = [
  {
    title: 'Custom Design, Not Templates',
    description:
      'Every pixel is designed for your brand. No cookie-cutter templates — just a site that looks and feels uniquely yours.',
  },
  {
    title: 'Mobile-First & Responsive',
    description:
      'Over 70% of traffic is mobile. Your site will look flawless on every screen size, from phone to desktop.',
  },
  {
    title: 'Lightning-Fast Performance',
    description:
      'Sub-2-second load times with optimized images, clean code, and modern hosting. Speed converts visitors into customers.',
  },
  {
    title: 'SEO-Ready Foundation',
    description:
      'Built with clean semantic code, proper meta tags, schema markup, and Core Web Vitals optimization from day one.',
  },
  {
    title: 'Conversion-Focused Layout',
    description:
      'Strategic placement of CTAs, social proof, and trust signals designed to turn visitors into leads and customers.',
  },
  {
    title: 'Easy Content Management',
    description:
      'Update text, images, and pages yourself with an intuitive CMS — no developer needed for day-to-day changes.',
  },
];

const howItWorks = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We learn your business, audience, and goals. Then we map out the site architecture, user flow, and design direction.',
  },
  {
    number: '02',
    title: 'Design & Build',
    description:
      'You get a custom design mockup for approval. Once signed off, we develop the full site with animations, forms, and integrations.',
  },
  {
    number: '03',
    title: 'Launch & Support',
    description:
      'We test everything, optimize for speed, and launch. You get 30 days of free support plus training on managing your content.',
  },
];

const benefits = [
  'Designed to match your brand identity perfectly',
  'Optimized for Google Core Web Vitals',
  'Built-in lead capture forms and CTAs',
  'SSL, security, and hosting setup included',
  'Analytics and tracking configured on launch',
  'Integrations with your existing tools (CRM, email, etc.)',
  'ADA accessibility best practices',
  'Ongoing maintenance plans available',
];

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      name="Web Design"
      tagline="Websites that convert — not just look pretty."
      description="We design and build high-performance websites tailored to your business. Fast, mobile-first, and engineered to turn visitors into customers."
      icon="Palette"
      accentColor="#7C3AED"
      features={features}
      howItWorks={howItWorks}
      benefits={benefits}
    />
  );
}
