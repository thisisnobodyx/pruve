'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  business: string;
  rating: number;
  photo?: string | null;
  source?: 'google' | 'manual';
}

/* Fallback testimonials shown when Google Reviews API is not configured */
const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      'Pruve automated our entire booking system. We went from missing 30% of calls to capturing every single lead.',
    name: 'Sarah K.',
    business: 'Restaurant Owner',
    rating: 5,
    source: 'manual',
  },
  {
    quote:
      'The AI Employee handles more conversations than our three staff members combined. Game changer.',
    name: 'Marco D.',
    business: 'Real Estate',
    rating: 5,
    source: 'manual',
  },
  {
    quote:
      'I was skeptical about AI, but the results are undeniable. Our response time went from hours to seconds.',
    name: 'Priya M.',
    business: 'Dental Clinic',
    rating: 5,
    source: 'manual',
  },
  {
    quote:
      'Content used to take us 10 hours a week. Now it takes 10 minutes to review what the AI creates.',
    name: 'Jason L.',
    business: 'Fitness Studio',
    rating: 5,
    source: 'manual',
  },
  {
    quote:
      'Best investment we made this year. The automation paid for itself in the first month.',
    name: 'Elena R.',
    business: 'E-commerce',
    rating: 5,
    source: 'manual',
  },
  {
    quote:
      'Professional, fast, and the results are real. Pruve is not just another agency.',
    name: 'David C.',
    business: 'Tech Startup',
    rating: 5,
    source: 'manual',
  },
];

function GoogleBadge({ rating, total }: { rating: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <div className="flex items-center gap-1.5 bg-bg-card border border-border rounded-full px-4 py-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-white text-sm font-bold">{rating.toFixed(1)}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.round(rating)
                  ? 'fill-accent-3 text-accent-3'
                  : 'fill-white/10 text-white/10'
              }`}
            />
          ))}
        </div>
        <span className="text-dim text-xs">({total} reviews)</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [googleMeta, setGoogleMeta] = useState<{ rating: number; total: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Fetch Google Reviews on mount
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();

        if (data.reviews && data.reviews.length > 0) {
          const googleReviews: Testimonial[] = data.reviews.map(
            (r: { name: string; quote: string; rating: number; photo?: string | null }) => ({
              name: r.name,
              quote: r.quote,
              rating: r.rating,
              business: 'Google Review',
              photo: r.photo,
              source: 'google' as const,
            })
          );
          setTestimonials(googleReviews);
          if (data.overallRating && data.totalReviews) {
            setGoogleMeta({ rating: data.overallRating, total: data.totalReviews });
          }
        }
      } catch {
        // Silently fall back to hardcoded testimonials
      }
    }
    fetchReviews();
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 400;

    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, testimonials.length - 1));
  }, [testimonials.length]);

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
    <section ref={sectionRef} className="py-section px-6 overflow-hidden">
      {/* Header */}
      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          Trusted by businesses everywhere.
        </h2>
      </motion.div>

      {/* Google Rating Badge */}
      {googleMeta && (
        <GoogleBadge rating={googleMeta.rating} total={googleMeta.total} />
      )}
      {!googleMeta && <div className="mb-12" />}

      {/* Scrollable Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={`${testimonial.name}-${i}`}
              className="min-w-[350px] md:min-w-[400px] snap-center shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="bg-bg-card border border-border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:border-accent/15 hover:-translate-y-1">
                <span className="font-display text-5xl text-accent/20 leading-none mb-4 select-none">
                  &ldquo;
                </span>

                <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1">
                  {testimonial.quote}
                </p>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Profile photo for Google reviews */}
                    {testimonial.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-display font-bold text-sm text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-dim text-xs">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                    {testimonial.source === 'google' && (
                      <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
