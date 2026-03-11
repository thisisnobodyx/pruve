'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const serviceLinks = [
  { label: 'WhatsApp Agent', href: '/services/whatsapp-agent' },
  { label: 'AI Receptionist', href: '/services/ai-receptionist' },
  { label: 'Multi-Channel', href: '/services/multi-channel' },
  { label: 'Lead Capture', href: '/services/lead-capture' },
  { label: 'Content Engine', href: '/services/content-engine' },
  { label: 'Workflow', href: '/services/workflow' },
  { label: 'Social Media', href: '/services/social-media' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with newsletter service
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="bg-bg-2 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div className="lg:pr-8">
            <Link
              href="/"
              className="inline-block font-display font-extrabold text-xl tracking-tight text-white mb-4"
            >
              PRUVE
              <span className="text-accent">.</span>
            </Link>
            <p className="text-dim text-sm font-body font-light leading-relaxed max-w-xs">
              We automate your business so you can focus on what matters.
            </p>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-[0.2em] text-white mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dim text-sm font-body font-light transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-[0.2em] text-white mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dim text-sm font-body font-light transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-[0.2em] text-white mb-6">
              Stay in the Loop
            </h4>
            <p className="text-dim text-sm font-body font-light mb-4">
              Get AI automation tips delivered weekly.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get AI automation tips"
                className="flex-1 bg-bg-card border border-border rounded-l-input px-4 py-2.5 text-sm font-body font-light text-white placeholder:text-dim/60 focus:outline-none focus:border-accent/40 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="bg-accent text-bg px-3.5 py-2.5 rounded-r-input transition-all duration-300 hover:bg-accent/90 active:scale-95 flex items-center justify-center"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {submitted && (
              <p className="text-accent-2 text-xs font-body mt-2 animate-pulse">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dim text-xs font-body font-light">
            &copy; {new Date().getFullYear()} Pruve.co &mdash; All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-dim text-xs font-body font-light transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-dim/40 text-xs">&middot;</span>
            <Link
              href="/terms"
              className="text-dim text-xs font-body font-light transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
