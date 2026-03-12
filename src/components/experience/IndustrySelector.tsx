'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from '@/components/shared/Starfield';
import TypewriterText from '@/components/shared/TypewriterText';
import { industryCategories } from './experience-data';
import { allIndustries } from './industries';

interface IndustrySelectorProps {
  selectedIndustry: string | null;
  onSelect: (id: string) => void;
}

export default function IndustrySelector({ selectedIndustry, onSelect }: IndustrySelectorProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the selected industry object
  const selected = useMemo(
    () => allIndustries.find((i) => i.id === selectedIndustry),
    [selectedIndustry]
  );

  // Filter industries by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return allIndustries;
    const q = query.toLowerCase();
    return allIndustries.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.emoji.includes(q)
    );
  }, [query]);

  // Group filtered results by category
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const cat of industryCategories) {
      const items = filtered.filter((i) => i.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => {
    const list: typeof filtered = [];
    for (const cat of industryCategories) {
      if (grouped[cat]) list.push(...grouped[cat]);
    }
    return list;
  }, [grouped]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, flatList.length - 1));
      setIsOpen(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0 && flatList[highlightedIndex]) {
      e.preventDefault();
      handleSelect(flatList[highlightedIndex].id);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
    setQuery('');
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <Starfield starCount={400} speed={0.15} />
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block"
        >
          EXPERIENCE YOUR AI EMPLOYEE
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
        >
          See your AI Employee
          <br />
          <span className="text-accent">in action.</span>
        </motion.h1>

        {/* Rotating taglines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-dim text-lg mb-12 h-8"
        >
          <TypewriterText
            text={[
              'Watch it handle your calls.',
              'Watch it book your appointments.',
              'Watch it close your leads.',
              'Watch it manage your reputation.',
              'Watch it grow your business.',
            ]}
            speed={50}
            loop
            pauseBetween={2500}
          />
        </motion.div>

        {/* Searchable Industry Picker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-xl mx-auto"
        >
          {/* Selected state badge */}
          <AnimatePresence>
            {selected && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30"
              >
                <span className="text-lg">{selected.emoji}</span>
                <span className="text-white font-medium text-sm">{selected.label}</span>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-dim hover:text-white text-xs ml-1 transition-colors"
                >
                  Change
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dim pointer-events-none">
              🔍
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setHighlightedIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={selected ? `${selected.emoji} ${selected.label}` : 'Search your industry...'}
              className="w-full bg-bg-card/80 backdrop-blur-xl border border-border rounded-2xl pl-12 pr-4 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dim text-xs pointer-events-none">
              {isOpen ? '↑↓ Navigate • Enter Select' : 'Click or type to search'}
            </div>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl max-h-[60vh] overflow-y-auto z-50 origin-top"
              >
                {Object.keys(grouped).length === 0 ? (
                  <div className="p-6 text-center text-dim text-sm">
                    No matching industries found. Try a different search.
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      {/* Category header */}
                      <div className="px-4 pt-4 pb-1 sticky top-0 bg-bg-card/95 backdrop-blur-xl z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-dim">
                          {category}
                        </span>
                      </div>
                      {/* Industry items */}
                      {items.map((industry) => {
                        const flatIdx = flatList.indexOf(industry);
                        const isHighlighted = flatIdx === highlightedIndex;
                        const isSelected = industry.id === selectedIndustry;
                        return (
                          <button
                            key={industry.id}
                            onClick={() => handleSelect(industry.id)}
                            onMouseEnter={() => setHighlightedIndex(flatIdx)}
                            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                              isHighlighted
                                ? 'bg-accent/10'
                                : isSelected
                                  ? 'bg-accent/5'
                                  : 'hover:bg-white/5'
                            }`}
                          >
                            <span className="text-xl flex-shrink-0">{industry.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-medium truncate">
                                {industry.label}
                              </div>
                              <div className="text-dim text-[11px] truncate">{industry.tagline}</div>
                            </div>
                            {isSelected && (
                              <span className="text-accent text-xs flex-shrink-0">✓ Selected</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}

                {/* Freeform "Other" entry */}
                {query.trim() && !filtered.some((i) => i.label.toLowerCase() === query.toLowerCase()) && (
                  <div className="border-t border-border">
                    <button
                      onClick={() => handleSelect('other')}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xl">❓</span>
                      <div>
                        <div className="text-white text-sm font-medium">
                          Use &ldquo;{query}&rdquo; as my industry
                        </div>
                        <div className="text-dim text-[11px]">
                          We&apos;ll show you a general AI Employee experience
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll hint */}
        {!selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 text-dim text-xs animate-bounce"
          >
            Choose your industry to start the simulation ↓
          </motion.div>
        )}
      </div>
    </section>
  );
}
