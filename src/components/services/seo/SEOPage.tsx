'use client';

import ServicePageTemplate from '@/components/services/ServicePageTemplate';

const features = [
  {
    title: 'Technical SEO Audit',
    description:
      'We crawl your entire site to find broken links, slow pages, indexing issues, and technical blockers killing your rankings.',
  },
  {
    title: 'Keyword Research & Strategy',
    description:
      'Data-driven keyword mapping based on search volume, competition, and buyer intent — so you rank for terms that actually convert.',
  },
  {
    title: 'On-Page Optimization',
    description:
      'Title tags, meta descriptions, heading structure, internal linking, schema markup — every page optimized for maximum visibility.',
  },
  {
    title: 'Local SEO & Google Business',
    description:
      'Dominate local search with optimized Google Business Profile, local citations, review management, and geo-targeted content.',
  },
  {
    title: 'Content Strategy & Creation',
    description:
      'We plan and create SEO-optimized blog posts, landing pages, and pillar content that drives organic traffic month after month.',
  },
  {
    title: 'Monthly Reporting & Analytics',
    description:
      'Transparent monthly reports showing keyword rankings, traffic growth, conversions, and ROI — no vanity metrics.',
  },
];

const howItWorks = [
  {
    number: '01',
    title: 'SEO Audit & Analysis',
    description:
      'We analyze your current rankings, competitors, and website health. You get a detailed report with quick wins and a long-term roadmap.',
  },
  {
    number: '02',
    title: 'Optimize & Execute',
    description:
      'We fix technical issues, optimize your pages, build your content calendar, and start executing the strategy — you approve everything.',
  },
  {
    number: '03',
    title: 'Rank & Scale',
    description:
      'Watch your rankings climb. We continuously refine based on data, scale what works, and keep you ahead of algorithm changes.',
  },
];

const benefits = [
  'Higher Google rankings for your key services',
  'More organic traffic without paying for ads',
  'Local map pack visibility for nearby customers',
  'Content that ranks and converts visitors',
  'Faster website load times (Core Web Vitals)',
  'Competitor analysis and gap strategy',
  'Google Business Profile optimization',
  'Transparent reporting with real ROI metrics',
];

export default function SEOPage() {
  return (
    <ServicePageTemplate
      name="SEO Services"
      tagline="Get found. Get clicked. Get customers."
      description="We help businesses dominate Google search results with proven SEO strategies. From technical audits to local SEO and content — we drive traffic that converts."
      icon="Search"
      accentColor="#C8F135"
      features={features}
      howItWorks={howItWorks}
      benefits={benefits}
    />
  );
}
