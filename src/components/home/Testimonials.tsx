'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface Testimonial {
  quote: string;
  name: string;
  business: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Pruve automated our entire booking system. We went from missing 30% of calls to capturing every single lead.',
    name: 'Sarah K.',
    business: 'Restaurant Owner',
    rating: 5,
  },
  {
    quote:
      'The WhatsApp agent handles more conversations than our three staff members combined. Game changer.',
    name: 'Marco D.',
    business: 'Real Estate',
    rating: 5,
  },
  {
    quote:
      'I was skeptical about AI, but the results are undeniable. Our response time went from hours to seconds.',
    name: 'Priya M.',
    business: 'Dental Clinic',
    rating: 5,
  },
  {
    quote:
      'Content used to take us 10 hours a week. Now it takes 10 minutes to review what the AI creates.',
    name: 'Jason L.',
    business: 'Fitness Studio',
    rating: 5,
  },
  {
    quote:
      'Best investment we made this year. The automation paid for itself in the first month.',
    name: 'Elena R.',
    business: 'E-commerce',
    rating: 5,
  },
  {
    quote:
      'Professional, fast, and the results are real. Pruve is not just another agency.',
    name: 'David C.',
    business: 'Tech Startup',
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24 // gap-6 = 24px
      : 400;

    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, testimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;

    const cardWidth =
      (el.firstElementChild as HTMLElement).offsetWidth + 24;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  return (
    <section className="py-section px-6 overflow-hidden">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
          Trusted by businesses everywhere.
        </h2>
      </ScrollReveal>

      {/* Scrollable Carousel */}
      <ScrollReveal delay={0.15}>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="min-w-[350px] md:min-w-[400px] snap-center shrink-0"
            >
              <div className="bg-bg-card border border-border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:border-accent/15">
                {/* Large Quote Mark */}
                <span className="font-display text-5xl text-accent/20 leading-none mb-4 select-none">
                  &ldquo;
                </span>

                {/* Quote Text */}
                <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1">
                  {testimonial.quote}
                </p>

                {/* Divider */}
                <div className="border-t border-border pt-4">
                  {/* Name */}
                  <p className="font-display font-bold text-sm text-white">
                    {testimonial.name}
                  </p>

                  {/* Business */}
                  <p className="text-dim text-xs mb-2">
                    {testimonial.business}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3.5 h-3.5 fill-accent-3 text-accent-3"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Navigation Dots */}
      <div className="flex gap-2 justify-center mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-accent w-6'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* Scrollbar-hide CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
