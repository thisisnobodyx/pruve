'use client';

import { type ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { w: 240, h: 480, frame: 32, bezel: 26, notchW: 90, notchH: 26, dot: 7, home: 100, homePad: 3 },
  md: { w: 280, h: 560, frame: 38, bezel: 30, notchW: 105, notchH: 30, dot: 9, home: 118, homePad: 4 },
  lg: { w: 320, h: 640, frame: 44, bezel: 36, notchW: 120, notchH: 34, dot: 10, home: 134, homePad: 5 },
};

export default function PhoneMockup({
  children,
  className = '',
  accentColor = '#7C3AED',
  size = 'lg',
}: PhoneMockupProps) {
  const s = sizes[size];

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      <div
        className="absolute -inset-4 opacity-20 blur-2xl"
        style={{ background: accentColor, borderRadius: s.frame + 8 }}
      />

      {/* Phone frame */}
      <div
        className="relative bg-[#1a1a1a] p-[10px] shadow-2xl shadow-black/60 border border-white/10"
        style={{ borderRadius: s.frame }}
      >
        {/* Inner bezel */}
        <div className="relative bg-black overflow-hidden" style={{ borderRadius: s.bezel }}>
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div
              className="bg-black flex items-center justify-center"
              style={{ width: s.notchW, height: s.notchH, borderBottomLeftRadius: s.notchH * 0.5, borderBottomRightRadius: s.notchH * 0.5 }}
            >
              <div
                className="rounded-full bg-[#1a1a1a] ring-1 ring-white/5"
                style={{ width: s.dot, height: s.dot }}
              />
            </div>
          </div>

          {/* Screen content */}
          <div className="relative overflow-hidden" style={{ width: s.w, height: s.h }}>
            {children}
          </div>

          {/* Home indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-white/20 rounded-full"
            style={{ bottom: s.homePad, width: s.home, height: s.homePad + 1 }}
          />
        </div>
      </div>
    </div>
  );
}
