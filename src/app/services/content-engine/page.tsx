import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Content Engine',
  description:
    'AI-generated blog posts, social media captions, email newsletters, and ad copy — tailored to your brand voice and published automatically.',
};

export default function ContentEnginePage() {
  return (
    <ServicePageTemplate
      name="Content Engine"
      tagline="Content on autopilot."
      description="AI-generated blog posts, social media captions, email newsletters, and ad copy — tailored to your brand voice and published automatically."
      icon="PenTool"
      accentColor="#F59E0B"
      features={[
        {
          title: 'AI Blog Generation',
          description:
            'Publish SEO-optimized blog posts on a schedule. Our AI researches trending topics in your niche and writes long-form articles that drive organic traffic.',
        },
        {
          title: 'Social Post Creation',
          description:
            'Generate scroll-stopping captions, carousels, and thread ideas for every platform. Each post is crafted to match platform-specific best practices.',
        },
        {
          title: 'Email Campaign Builder',
          description:
            'Create full email sequences — from welcome series to product launches — with subject lines optimized for open rates and copy that converts.',
        },
        {
          title: 'Brand Voice Matching',
          description:
            'Train the AI on your existing content so every piece sounds authentically you. Maintain a consistent tone across all channels without manual editing.',
        },
        {
          title: 'Auto-Scheduling & Publishing',
          description:
            'Set it and forget it. Content is queued and published at optimal times across your blog, social accounts, and email platform automatically.',
        },
        {
          title: 'Performance Analytics',
          description:
            'Track which content drives the most engagement and conversions. The AI learns from performance data to continuously improve future output.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Define Your Brand',
          description:
            'Share your brand guidelines, sample content, and target audience. We configure the AI to capture your unique voice and messaging strategy.',
        },
        {
          number: '02',
          title: 'Generate & Review',
          description:
            'The engine produces a content calendar with drafts across all channels. Approve, tweak, or let it auto-publish — you control the level of oversight.',
        },
        {
          number: '03',
          title: 'Publish & Optimize',
          description:
            'Content goes live on schedule. Performance data feeds back into the system so the AI refines topics, timing, and messaging over time.',
        },
      ]}
      benefits={[
        'Save 20+ hours per week on content creation',
        'Consistent brand voice across every channel',
        'SEO-optimized posts that rank on Google',
        'Never miss a publishing deadline again',
        'Scale content output without hiring writers',
        'Data-driven topics that resonate with audiences',
        'Multi-format content from a single brief',
        'Continuous improvement through performance learning',
      ]}
    />
  );
}
