// Shared data for AI Employees page

export interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  href: string;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  price: number;
  color: string;
  desc: string;
  fullDesc: string;
  agentIds: string[];
}

export const agents: Agent[] = [
  { id: 'whatsapp', name: 'WhatsApp Agent', icon: '💬', color: '#25D366', desc: 'Handles all WhatsApp conversations', href: '/services/whatsapp-agent' },
  { id: 'receptionist', name: 'AI Receptionist', icon: '📞', color: '#C9A84C', desc: 'Handles inquiries, bookings, intake', href: '/services/ai-receptionist' },
  { id: 'multichannel', name: 'Multi-Channel Bot', icon: '📥', color: '#7C3AED', desc: 'One AI across every platform', href: '/services/multi-channel' },
  { id: 'content', name: 'Content Engine', icon: '✍️', color: '#F59E0B', desc: 'Writes and schedules content', href: '/services/content-engine' },
  { id: 'social', name: 'Social Media AI', icon: '📱', color: '#EC4899', desc: 'Manages all social posting', href: '/services/social-media' },
  { id: 'leadcapture', name: 'Lead Capture', icon: '🧲', color: '#C8F135', desc: 'Captures, scores, follows up leads', href: '/services/lead-capture' },
  { id: 'workflow', name: 'Workflow Automation', icon: '⚡', color: '#FF6B35', desc: 'Connects tools, eliminates manual tasks', href: '/services/workflow' },
  { id: 'intelligence', name: 'Competitive Intel', icon: '🔍', color: '#06B6D4', desc: 'Monitors competitors daily', href: '/services/smart-website' },
];

export const employees: Employee[] = [
  {
    id: 'operator',
    name: 'The Operator',
    title: 'Your Front Desk',
    price: 297,
    color: '#7DF9C0',
    desc: 'Handles all communication, bookings, and customer memory.',
    fullDesc: 'Your front desk person who never sleeps, never forgets a customer, never misses a message. Handles WhatsApp, phone calls, and multi-channel messaging — all coordinated under one identity built for your business.',
    agentIds: ['whatsapp', 'receptionist', 'multichannel'],
  },
  {
    id: 'manager',
    name: 'The Manager',
    title: 'Your Operations Manager',
    price: 697,
    color: '#7C3AED',
    desc: 'Everything The Operator does, plus marketing, leads, and reputation.',
    fullDesc: 'Does everything The Operator does, plus runs your marketing, follows up on every lead, manages your reputation, and sends you weekly reports. Like hiring an ops manager who also does content and sales.',
    agentIds: ['whatsapp', 'receptionist', 'multichannel', 'content', 'social', 'leadcapture'],
  },
  {
    id: 'executive',
    name: 'The Executive',
    title: 'Your COO',
    price: 1497,
    color: '#C8F135',
    desc: 'Everything The Manager does, plus research, automation, and self-learning.',
    fullDesc: 'Does everything The Manager does, plus researches competitors, answers your phone, manages your team, buys supplies, and writes its own new skills when it needs them. Your autonomous COO.',
    agentIds: ['whatsapp', 'receptionist', 'multichannel', 'content', 'social', 'leadcapture', 'workflow', 'intelligence'],
  },
];

export function getAgentsByIds(ids: string[]): Agent[] {
  return ids.map((id) => agents.find((a) => a.id === id)!).filter(Boolean);
}
