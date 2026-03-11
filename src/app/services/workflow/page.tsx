import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Workflow Automation',
  description:
    'Custom workflow automations that connect your tools, eliminate manual busywork, and keep your business running like clockwork.',
};

export default function WorkflowPage() {
  return (
    <ServicePageTemplate
      name="Workflow Automation"
      tagline="Connect everything. Automate anything."
      description="Custom workflow automations that connect your tools, eliminate manual busywork, and keep your business running like clockwork."
      icon="GitBranch"
      accentColor="#FF6B35"
      features={[
        {
          title: 'Seamless Tool Integration',
          description:
            'Connect your CRM, email, project management, accounting, and hundreds of other apps into unified workflows. No more copy-pasting between platforms.',
        },
        {
          title: 'Smart Triggers & Actions',
          description:
            'Workflows fire automatically when events happen — a new lead arrives, an invoice is overdue, or a form is submitted. Zero manual intervention required.',
        },
        {
          title: 'Conditional Logic Paths',
          description:
            'Build branching workflows with if/then rules, filters, and decision trees. Route data intelligently based on any criteria you define.',
        },
        {
          title: 'Error Handling & Retries',
          description:
            'Built-in fault tolerance ensures workflows recover gracefully from API failures. Automatic retries and fallback paths keep everything running smoothly.',
        },
        {
          title: 'Real-Time Monitoring',
          description:
            'A live dashboard shows every workflow execution, success rate, and bottleneck. Get instant alerts if anything needs attention.',
        },
        {
          title: 'Pre-Built Templates',
          description:
            'Start fast with templates for common processes like lead nurturing, invoice follow-ups, onboarding sequences, and reporting pipelines.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Map Your Processes',
          description:
            'We audit your current tools and workflows to identify repetitive tasks and bottlenecks. Together we design the ideal automated process.',
        },
        {
          number: '02',
          title: 'Build & Connect',
          description:
            'We wire up your integrations, configure triggers and logic paths, and test every scenario thoroughly before going live.',
        },
        {
          number: '03',
          title: 'Monitor & Scale',
          description:
            'Your automations run around the clock. We monitor performance, handle edge cases, and expand workflows as your business grows.',
        },
      ]}
      benefits={[
        'Eliminate hours of manual data entry daily',
        'Zero dropped tasks or missed follow-ups',
        'All your tools working together seamlessly',
        'Instant response to business-critical events',
        'Graceful error recovery without human intervention',
        'Full visibility into every automated process',
        'Launch faster with pre-built workflow templates',
        'Scales with your business at no extra effort',
      ]}
    />
  );
}
