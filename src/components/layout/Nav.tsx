'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  { label: 'WhatsApp Agent', href: '/services/whatsapp-agent', icon: '💬', color: '#25D366', desc: 'Auto-reply & book via WhatsApp' },
  { label: 'AI Receptionist', href: '/services/ai-receptionist', icon: '📞', color: '#C9A84C', desc: 'Never miss a call again' },
  { label: 'Multi-Channel Inbox', href: '/services/multi-channel', icon: '📥', color: '#7C3AED', desc: 'All messages, one place' },
  { label: 'Lead Capture', href: '/services/lead-capture', icon: '🧲', color: '#C8F135', desc: 'Turn visitors into leads' },
  { label: 'Content Engine', href: '/services/content-engine', icon: '✍️', color: '#F59E0B', desc: 'AI-generated content at scale' },
  { label: 'Smart Website', href: '/services/smart-website', icon: '🌐', color: '#7C3AED', desc: 'Websites that convert & chat' },
  { label: 'Workflow Automation', href: '/services/workflow', icon: '⚡', color: '#FF6B35', desc: 'Automate repetitive tasks' },
  { label: 'Social Media', href: '/services/social-media', icon: '📱', color: '#EC4899', desc: 'AI-powered social presence' },
];

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Experience', href: '/experience' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${
          scrolled
            ? 'bg-bg-2/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-extrabold text-xl tracking-tight text-white relative z-50"
          >
            PRUVE
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith('/services'));
              if (link.hasDropdown) {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      className={`relative text-sm font-body font-medium tracking-wide transition-colors duration-300 flex items-center gap-1 ${
                        isActive ? 'text-white' : 'text-dim hover:text-white'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-body font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-dim hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 bg-accent text-bg font-body font-medium text-sm px-6 py-2.5 rounded-pill transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Call
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-white origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1.5px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-white origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Mega Dropdown */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            ref={megaRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="fixed top-20 left-0 right-0 z-40"
          >
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="bg-bg-2/95 backdrop-blur-2xl border border-border rounded-2xl p-8 shadow-2xl shadow-black/40">
                <div className="grid grid-cols-4 gap-3">
                  {agents.map((agent) => (
                    <Link
                      key={agent.href}
                      href={agent.href}
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                        style={{ background: `${agent.color}15` }}
                      >
                        {agent.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                          {agent.label}
                        </div>
                        <div className="text-xs text-dim mt-0.5">{agent.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-dim text-xs">Not sure which agent you need?</p>
                  <Link
                    href="/ai-employees"
                    onClick={() => setMegaOpen(false)}
                    className="text-accent text-xs font-medium hover:underline"
                  >
                    See all AI Employees &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bg-2 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {/* Services group */}
              <div className="flex flex-col items-center gap-3 mb-2">
                <span className="text-dim text-xs uppercase tracking-widest">Services</span>
                <div className="grid grid-cols-2 gap-2">
                  {agents.map((agent) => (
                    <Link
                      key={agent.href}
                      href={agent.href}
                      onClick={closeMobile}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card/50 text-sm text-white hover:text-accent transition-colors"
                    >
                      <span>{agent.icon}</span>
                      <span className="text-xs">{agent.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other links */}
              {navLinks.filter(l => !l.hasDropdown).map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={`font-display font-extrabold text-3xl tracking-tight transition-colors duration-300 ${
                      pathname === link.href ? 'text-accent' : 'text-white hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="inline-flex items-center gap-2 bg-accent text-bg font-body font-medium text-base px-8 py-3 rounded-pill transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                >
                  Book a Call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
