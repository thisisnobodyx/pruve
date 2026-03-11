'use client';

import { motion } from 'framer-motion';
import { Inbox, MousePointer2 } from 'lucide-react';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#7C3AED';

interface AppCard {
  name: string;
  color: string;
  icon: string;
  unread: number;
  rotation: number;
  x: number;
  y: number;
}

const appCards: AppCard[] = [
  { name: 'WhatsApp', color: '#25D366', icon: 'WA', unread: 12, rotation: -8, x: -160, y: -80 },
  { name: 'Instagram', color: '#E1306C', icon: 'IG', unread: 8, rotation: 5, x: 140, y: -100 },
  { name: 'Email', color: '#9590A8', icon: '@', unread: 23, rotation: -3, x: -120, y: 80 },
  { name: 'Telegram', color: '#0088CC', icon: 'TG', unread: 5, rotation: 7, x: 170, y: 60 },
  { name: 'Web Chat', color: '#7C3AED', icon: 'WC', unread: 3, rotation: -5, x: 10, y: 130 },
];

const totalUnread = appCards.reduce((sum, c) => sum + c.unread, 0); // 51

/* ─── Chat App Window Card ─── */
function ChatAppWindow({
  card,
  scale,
  opacity,
  offsetX,
  offsetY,
}: {
  card: AppCard;
  scale: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
}) {
  return (
    <div
      className="absolute bg-bg-card border border-border rounded-xl w-[180px] transition-all duration-500"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${card.rotation * scale}deg) scale(${0.8 + scale * 0.2})`,
        opacity,
        left: '50%',
        top: '50%',
        marginLeft: '-90px',
        marginTop: '-50px',
      }}
    >
      {/* App header */}
      <div
        className="flex items-center justify-between px-3 py-2 rounded-t-xl"
        style={{ background: `${card.color}15` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold"
            style={{ background: `${card.color}30`, color: card.color }}
          >
            {card.icon}
          </div>
          <span className="text-white text-xs font-medium">{card.name}</span>
        </div>
        {/* Notification badge */}
        <div className="bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {card.unread}
        </div>
      </div>
      {/* Fake messages */}
      <div className="p-2.5 space-y-1.5">
        {[1, 2, 3].map((j) => (
          <div key={j} className="flex gap-2 items-start">
            <div className="w-4 h-4 rounded-full bg-white/10 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <div className="h-2 bg-white/8 rounded-full" style={{ width: `${50 + j * 15}%` }} />
              <div className="h-2 bg-white/5 rounded-full" style={{ width: `${30 + j * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Unified Inbox Card (solved state) ─── */
function UnifiedCard() {
  return (
    <div className="bg-bg-card border rounded-2xl w-[300px] p-5" style={{ borderColor: `${ACCENT}40` }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${ACCENT}20` }}
        >
          <Inbox className="w-5 h-5" style={{ color: ACCENT }} />
        </div>
        <div>
          <div className="text-white text-sm font-semibold">Unified Inbox</div>
          <div className="text-dim text-[11px]">5 channels connected</div>
        </div>
      </div>

      {/* Channel indicators */}
      <div className="flex items-center gap-2 mb-4">
        {appCards.map((c) => (
          <div
            key={c.name}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold"
            style={{ background: `${c.color}20`, color: c.color }}
          >
            {c.icon}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${ACCENT}10` }}>
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-white text-xs font-medium">All caught up</span>
        <span className="ml-auto text-xs font-bold" style={{ color: ACCENT }}>0 unread</span>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1 (0-0.25): Chat windows appear chaotically
        // Phase 2 (0.25-0.4): "51 unread" stat with dark overlay
        // Phase 3 (0.4-0.5): Quick fade, windows compress
        // Phase 4 (0.5-1.0): Single unified inbox card

        const phase1 = Math.min(progress / 0.25, 1);
        const phase2 = progress > 0.25 ? Math.min((progress - 0.25) / 0.15, 1) : 0;
        const phase3 = progress > 0.4 ? Math.min((progress - 0.4) / 0.1, 1) : 0;
        const phase4 = progress > 0.5 ? Math.min((progress - 0.5) / 0.3, 1) : 0;

        const visibleCards = Math.ceil(phase1 * appCards.length);
        const compressAmount = phase3;
        const cursorBounce = phase2 > 0 && phase3 < 0.5;

        // Cursor position bouncing between apps
        const cursorTarget = Math.floor((progress * 10) % appCards.length);
        const cursorCard = appCards[cursorTarget];

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${
                  phase4 > 0 ? `${ACCENT}08` : 'rgba(255,69,69,0.03)'
                } 0%, transparent 70%)`,
                transition: 'background 0.5s',
              }}
            />

            {/* Section label */}
            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 text-center"
              style={{ opacity: phase1 }}
            >
              <span className="font-mono text-sm tracking-widest uppercase" style={{ color: ACCENT }}>
                THE PROBLEM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                App Chaos
              </h2>
            </div>

            {/* Chat app windows (phases 1-3) */}
            {phase4 < 1 && (
              <div
                className="relative"
                style={{ opacity: phase4 > 0 ? 1 - phase4 : 1 }}
              >
                {appCards.slice(0, visibleCards).map((card) => {
                  const compressedX = card.x * (1 - compressAmount);
                  const compressedY = card.y * (1 - compressAmount);

                  return (
                    <ChatAppWindow
                      key={card.name}
                      card={card}
                      scale={1 - compressAmount * 0.5}
                      opacity={phase1}
                      offsetX={compressedX}
                      offsetY={compressedY}
                    />
                  );
                })}

                {/* Bouncing cursor */}
                {cursorBounce && (
                  <motion.div
                    className="absolute z-20 pointer-events-none"
                    animate={{
                      x: cursorCard.x * (1 - compressAmount),
                      y: cursorCard.y * (1 - compressAmount),
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-8px',
                      marginTop: '-8px',
                    }}
                  >
                    <MousePointer2 className="w-5 h-5 text-white drop-shadow-lg" />
                  </motion.div>
                )}
              </div>
            )}

            {/* Dark overlay that dims app windows when stat appears */}
            {phase2 > 0 && phase4 < 1 && (
              <div
                className="absolute inset-0 z-[5]"
                style={{
                  background: 'rgba(5, 5, 12, 0.95)',
                  opacity: Math.min(Math.min(phase2 * 2, 1), 1 - phase3),
                }}
              />
            )}

            {/* Unread counter */}
            {phase2 > 0 && phase4 < 1 && (
              <div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-10"
                style={{
                  opacity: Math.min(phase2, phase4 > 0 ? 1 - phase4 : 1),
                }}
              >
                <div className="text-5xl md:text-7xl font-extrabold mb-2 tabular-nums text-[#FF4545]">
                  {totalUnread} unread
                </div>
                <p className="text-white/70 text-lg">
                  across {appCards.length} platforms.
                </p>
              </div>
            )}

            {/* Solved state: Unified inbox */}
            {phase4 > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: phase4 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={phase4 > 0.2 ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex justify-center"
                  >
                    <UnifiedCard />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={phase4 > 0.4 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      All in one place.
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={phase4 > 0.6 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="inline-flex items-center gap-2 mt-4"
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={ACCENT} strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-dim text-lg">Every message, every channel, one inbox.</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
