import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Social Media AI',
  description:
    'An AI social media manager that creates content, schedules posts, responds to comments, and grows your presence across all platforms.',
};

export default function SocialMediaPage() {
  return (
    <ServicePageTemplate
      name="Social Media AI"
      tagline="Post everywhere. Engage everyone."
      description="An AI social media manager that creates content, schedules posts, responds to comments, and grows your presence across all platforms."
      icon="Instagram"
      accentColor="#EC4899"
      features={[
        {
          title: 'AI Content Creation',
          description:
            'Generate platform-native posts, reels scripts, carousel copy, and story ideas. Every piece is tailored to your brand and optimized for engagement.',
        },
        {
          title: 'Cross-Platform Scheduling',
          description:
            'Plan and publish across Instagram, TikTok, LinkedIn, X, and Facebook from a single calendar. Posts go live at peak engagement times automatically.',
        },
        {
          title: 'Automated Comment Responses',
          description:
            'The AI monitors your mentions and comments around the clock, replying with on-brand responses that keep conversations going and followers happy.',
        },
        {
          title: 'Trend & Hashtag Intelligence',
          description:
            'Stay ahead of trends with real-time analysis of what is performing in your niche. Get hashtag recommendations that maximize discoverability.',
        },
        {
          title: 'Audience Growth Engine',
          description:
            'Strategic engagement tactics powered by AI — from optimal posting frequency to community interaction patterns that attract and retain followers.',
        },
        {
          title: 'Reporting & Insights',
          description:
            'Comprehensive dashboards show follower growth, engagement rates, top-performing content, and ROI metrics so you always know what is working.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Connect Your Accounts',
          description:
            'Link your social profiles and share your brand guidelines. We configure the AI to understand your audience, tone, and content goals.',
        },
        {
          number: '02',
          title: 'Review Your Calendar',
          description:
            'The AI generates a full content calendar with posts ready to go. Approve the plan or adjust — then let the system handle the rest.',
        },
        {
          number: '03',
          title: 'Grow on Autopilot',
          description:
            'Posts publish, comments get answered, and your audience grows steadily. Monthly reports show exactly how your social presence is expanding.',
        },
      ]}
      benefits={[
        'Consistent posting across every platform daily',
        'Never leave a comment or DM unanswered',
        'Save 15+ hours per week on social media',
        'Platform-optimized content for higher reach',
        'Real-time trend surfing for maximum relevance',
        'Grow followers without manual engagement grind',
        'Clear ROI tracking for social media spend',
        'One dashboard to manage all your channels',
      ]}
    />
  );
}
