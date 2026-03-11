'use client';

import { type ReactNode } from 'react';

interface BrowserMockupProps {
  children: ReactNode;
  className?: string;
  url?: string;
}

export default function BrowserMockup({
  children,
  className = '',
  url = 'pruve.co',
}: BrowserMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-[#1E1535] rounded-xl border border-border overflow-hidden shadow-2xl shadow-black/40">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#150E2B] border-b border-border">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="bg-bg/60 rounded-md px-4 py-1 text-xs text-dim flex items-center gap-2 min-w-[200px]">
              <svg className="w-3 h-3 text-dim/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{url}</span>
            </div>
          </div>

          <div className="w-[52px]" />
        </div>

        {/* Content area */}
        <div className="relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
