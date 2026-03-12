'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LoaderCircle, Sparkles, ArrowLeft, Send } from 'lucide-react';

const ACCENT = '#7C3AED';

/* ─── Channel definitions ─── */
interface Channel {
  id: string;
  name: string;
  color: string;
  icon: string;
  unread: number;
}

const channels: Channel[] = [
  { id: 'whatsapp', name: 'WhatsApp', color: '#25D366', icon: 'WA', unread: 4 },
  { id: 'instagram', name: 'Instagram', color: '#E1306C', icon: 'IG', unread: 3 },
  { id: 'telegram', name: 'Telegram', color: '#0088CC', icon: 'TG', unread: 2 },
  { id: 'email', name: 'Email', color: '#9590A8', icon: '@', unread: 5 },
  { id: 'webchat', name: 'Web Chat', color: '#7C3AED', icon: 'WC', unread: 1 },
];

/* ─── Conversation data ─── */
interface Message {
  role: 'customer' | 'agent';
  content: string;
  time: string;
}

interface Conversation {
  id: string;
  channelId: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

const conversations: Conversation[] = [
  // WhatsApp
  {
    id: 'wa1',
    channelId: 'whatsapp',
    name: 'Sarah Martinez',
    avatar: 'SM',
    lastMessage: 'Hi, do you have this product in blue?',
    time: '2m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hi there! I saw your new collection on the website.', time: '10:30 AM' },
      { role: 'agent', content: 'Hello Sarah! Yes, our new spring collection just launched. How can I help?', time: '10:31 AM' },
      { role: 'customer', content: 'Hi, do you have this product in blue?', time: '10:33 AM' },
    ],
  },
  {
    id: 'wa2',
    channelId: 'whatsapp',
    name: 'James Wilson',
    avatar: 'JW',
    lastMessage: 'When will my order arrive?',
    time: '15m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hey, I placed an order 3 days ago. Order #4829', time: '10:15 AM' },
      { role: 'agent', content: 'Let me check that for you, James. One moment please.', time: '10:16 AM' },
      { role: 'customer', content: 'When will my order arrive?', time: '10:20 AM' },
    ],
  },
  {
    id: 'wa3',
    channelId: 'whatsapp',
    name: 'Emily Chen',
    avatar: 'EC',
    lastMessage: 'Can I get a refund on my last purchase?',
    time: '1h ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hello, I need help with a return.', time: '9:45 AM' },
      { role: 'agent', content: 'Of course! I can help with that. Could you share your order number?', time: '9:46 AM' },
      { role: 'customer', content: 'It\u0027s #3847. Can I get a refund on my last purchase?', time: '9:48 AM' },
    ],
  },
  {
    id: 'wa4',
    channelId: 'whatsapp',
    name: 'David Park',
    avatar: 'DP',
    lastMessage: 'Thanks for the quick response!',
    time: '2h ago',
    unread: false,
    messages: [
      { role: 'customer', content: 'Do you ship internationally?', time: '8:30 AM' },
      { role: 'agent', content: 'Yes! We ship to over 50 countries. Delivery typically takes 7-14 business days.', time: '8:31 AM' },
      { role: 'customer', content: 'Thanks for the quick response!', time: '8:32 AM' },
    ],
  },
  // Instagram
  {
    id: 'ig1',
    channelId: 'instagram',
    name: 'Alex Kim',
    avatar: 'AK',
    lastMessage: 'Love your products! Where can I buy?',
    time: '5m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'OMG I saw your reel and I\u0027m obsessed!', time: '10:25 AM' },
      { role: 'agent', content: 'Thank you so much! We appreciate the love!', time: '10:26 AM' },
      { role: 'customer', content: 'Love your products! Where can I buy?', time: '10:28 AM' },
    ],
  },
  {
    id: 'ig2',
    channelId: 'instagram',
    name: 'Mia Johnson',
    avatar: 'MJ',
    lastMessage: 'Do you offer influencer partnerships?',
    time: '30m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hi! I have 50K followers in the beauty niche.', time: '10:00 AM' },
      { role: 'customer', content: 'Do you offer influencer partnerships?', time: '10:01 AM' },
    ],
  },
  {
    id: 'ig3',
    channelId: 'instagram',
    name: 'Ryan Thompson',
    avatar: 'RT',
    lastMessage: 'Is this still available?',
    time: '45m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hey, I saw this in your stories yesterday.', time: '9:30 AM' },
      { role: 'customer', content: 'Is this still available?', time: '9:31 AM' },
    ],
  },
  // Telegram
  {
    id: 'tg1',
    channelId: 'telegram',
    name: 'Lena Volkova',
    avatar: 'LV',
    lastMessage: 'Can you send me the product catalog?',
    time: '10m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hello! I\u0027m interested in your wholesale options.', time: '10:20 AM' },
      { role: 'agent', content: 'Welcome! We do offer wholesale pricing for bulk orders.', time: '10:21 AM' },
      { role: 'customer', content: 'Can you send me the product catalog?', time: '10:22 AM' },
    ],
  },
  {
    id: 'tg2',
    channelId: 'telegram',
    name: 'Marco Rossi',
    avatar: 'MR',
    lastMessage: 'What payment methods do you accept?',
    time: '1h ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'I want to place a large order.', time: '9:15 AM' },
      { role: 'customer', content: 'What payment methods do you accept?', time: '9:16 AM' },
    ],
  },
  // Email
  {
    id: 'em1',
    channelId: 'email',
    name: 'Patricia Brown',
    avatar: 'PB',
    lastMessage: 'RE: Invoice #2847 - Payment confirmation',
    time: '8m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hello, I just submitted payment for invoice #2847. Could you please confirm receipt?', time: '10:22 AM' },
    ],
  },
  {
    id: 'em2',
    channelId: 'email',
    name: 'Robert Taylor',
    avatar: 'RT',
    lastMessage: 'Partnership inquiry - Q2 campaign',
    time: '25m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Dear team, I represent a marketing agency and we\u0027d like to discuss a potential partnership for our Q2 campaign. Are you available for a call this week?', time: '10:05 AM' },
    ],
  },
  {
    id: 'em3',
    channelId: 'email',
    name: 'Lisa Anderson',
    avatar: 'LA',
    lastMessage: 'Product complaint - damaged item received',
    time: '40m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'I received my order today and unfortunately the item was damaged in transit. Order #5612. I\u0027d like a replacement or refund please.', time: '9:50 AM' },
    ],
  },
  {
    id: 'em4',
    channelId: 'email',
    name: 'Michael Green',
    avatar: 'MG',
    lastMessage: 'RE: Subscription renewal',
    time: '2h ago',
    unread: true,
    messages: [
      { role: 'agent', content: 'Hi Michael, your subscription renews on March 15. Would you like to continue with the same plan?', time: '8:00 AM' },
      { role: 'customer', content: 'Yes, but can I upgrade to the Pro plan? What\u0027s the price difference?', time: '8:30 AM' },
    ],
  },
  {
    id: 'em5',
    channelId: 'email',
    name: 'Sandra White',
    avatar: 'SW',
    lastMessage: 'Bulk order inquiry - 500 units',
    time: '3h ago',
    unread: false,
    messages: [
      { role: 'customer', content: 'We\u0027re interested in ordering 500 units of your flagship product. Do you offer volume discounts?', time: '7:30 AM' },
      { role: 'agent', content: 'Absolutely! For orders of 500+, we offer a 25% discount. I\u0027ll prepare a quote for you.', time: '7:45 AM' },
    ],
  },
  // Web Chat
  {
    id: 'wc1',
    channelId: 'webchat',
    name: 'Anonymous Visitor',
    avatar: 'AV',
    lastMessage: 'How do I create an account?',
    time: '1m ago',
    unread: true,
    messages: [
      { role: 'customer', content: 'Hi, I\u0027m new here. How do I create an account?', time: '10:34 AM' },
    ],
  },
];

/* ─── Smart Reply Button ─── */
function SmartReplyButton({
  conversation,
  onReply,
}: {
  conversation: Conversation;
  onReply: (reply: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSmartReply() {
    if (loading) return;
    setLoading(true);

    try {
      const lastCustomerMsg = [...conversation.messages]
        .reverse()
        .find((m) => m.role === 'customer');

      const systemPrompt =
        'You are an AI assistant managing a multi-channel inbox. Generate a brief, professional reply to this customer message. Keep it under 2 sentences.';

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Channel: ${conversation.channelId}\nCustomer name: ${conversation.name}\nConversation context:\n${conversation.messages.map((m) => `${m.role}: ${m.content}`).join('\n')}\n\nGenerate a reply to the customer\u0027s latest message: "${lastCustomerMsg?.content}"`,
            },
          ],
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      const reply = data.content || 'Thank you for reaching out! Let me look into this for you right away.';
      onReply(reply);
    } catch {
      onReply('Thank you for reaching out! Let me look into this for you right away.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSmartReply}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:brightness-110 disabled:opacity-60"
      style={{ background: `${ACCENT}20`, color: ACCENT }}
    >
      {loading ? (
        <>
          <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5" />
          Smart Reply
        </>
      )}
    </button>
  );
}

export default function InteractiveDemo() {
  const [activeChannel, setActiveChannel] = useState('whatsapp');
  const [selectedConvo, setSelectedConvo] = useState<string | null>(null);
  const [localConversations, setLocalConversations] = useState(conversations);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const channelConvos = localConversations.filter((c) => c.channelId === activeChannel);
  const activeConvo = selectedConvo
    ? localConversations.find((c) => c.id === selectedConvo)
    : null;
  const activeChannelData = channels.find((c) => c.id === activeChannel)!;

  function handleSmartReply(convoId: string, reply: string) {
    setLocalConversations((prev) =>
      prev.map((c) =>
        c.id === convoId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { role: 'agent' as const, content: reply, time: 'Just now' },
              ],
              lastMessage: reply,
            }
          : c
      )
    );
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section-mobile md:py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Your unified{' '}
            <span style={{ color: ACCENT }}>inbox.</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            See how every channel converges into one clean interface. Click a conversation and try the AI-powered Smart Reply.
          </p>
        </div>

        {/* Inbox mockup */}
        <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          {/* Channel tabs */}
          <div className="flex border-b border-border overflow-x-auto">
            {channels.map((channel) => {
              const isActive = activeChannel === channel.id;
              const channelUnread = localConversations.filter(
                (c) => c.channelId === channel.id && c.unread
              ).length;

              return (
                <button
                  key={channel.id}
                  onClick={() => {
                    setActiveChannel(channel.id);
                    setSelectedConvo(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'text-white border-current'
                      : 'text-dim border-transparent hover:text-white hover:bg-white/3'
                  }`}
                  style={isActive ? { color: channel.color, borderColor: channel.color } : {}}
                >
                  <span
                    className="w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center"
                    style={{
                      background: isActive ? `${channel.color}25` : 'rgba(255,255,255,0.06)',
                      color: isActive ? channel.color : 'inherit',
                    }}
                  >
                    {channel.icon}
                  </span>
                  <span className="hidden sm:inline">{channel.name}</span>
                  {channelUnread > 0 && (
                    <span
                      className="text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 text-white"
                      style={{ background: channel.color }}
                    >
                      {channelUnread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div className="min-h-[420px] flex">
            <AnimatePresence mode="wait">
              {activeConvo ? (
                /* ─── Chat thread view ─── */
                <motion.div
                  key={`thread-${activeConvo.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Thread header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                    <button
                      onClick={() => setSelectedConvo(null)}
                      className="text-dim hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `${activeChannelData.color}20`,
                        color: activeChannelData.color,
                      }}
                    >
                      {activeConvo.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium">{activeConvo.name}</div>
                      <div className="text-dim text-[11px] flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: activeChannelData.color }}
                        />
                        {activeChannelData.name}
                      </div>
                    </div>
                    <SmartReplyButton
                      conversation={activeConvo}
                      onReply={(reply) => handleSmartReply(activeConvo.id, reply)}
                    />
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {activeConvo.messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex ${msg.role === 'agent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.role === 'agent'
                              ? 'rounded-br-md'
                              : 'rounded-bl-md'
                          }`}
                          style={
                            msg.role === 'agent'
                              ? { background: `${ACCENT}20`, color: 'white' }
                              : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)' }
                          }
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <span className="text-[10px] opacity-50 mt-1 block text-right">{msg.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-white/5 border border-border rounded-full px-4 py-2 text-sm text-white placeholder:text-dim/50 outline-none focus:border-white/20 transition-colors"
                      readOnly
                    />
                    <button
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                      style={{ background: ACCENT }}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ─── Conversation list view ─── */
                <motion.div
                  key={`list-${activeChannel}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  {channelConvos.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-dim text-sm">
                      No conversations yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {channelConvos.map((convo, i) => (
                        <motion.button
                          key={convo.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSelectedConvo(convo.id)}
                          className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-white/3 transition-colors"
                        >
                          {/* Avatar */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{
                              background: `${activeChannelData.color}15`,
                              color: activeChannelData.color,
                            }}
                          >
                            {convo.avatar}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className={`text-sm font-medium ${convo.unread ? 'text-white' : 'text-dim'}`}>
                                {convo.name}
                              </span>
                              <span className="text-[10px] text-dim shrink-0 ml-2">{convo.time}</span>
                            </div>
                            <p className={`text-xs truncate ${convo.unread ? 'text-white/70' : 'text-dim'}`}>
                              {convo.lastMessage}
                            </p>
                          </div>

                          {/* Unread dot */}
                          {convo.unread && (
                            <div
                              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                              style={{ background: activeChannelData.color }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center gap-2 text-dim/50 text-xs mt-6">
          <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
          Powered by Pruve AI
        </div>
      </motion.div>
    </section>
  );
}
