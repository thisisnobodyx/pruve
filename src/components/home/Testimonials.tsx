'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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

/* Single testimonial card */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-accent/15 hover:-translate-y-1">
      <span className="font-display text-4xl md:text-5xl text-accent/20 leading-none mb-3 md:mb-4 select-none">
        &ldquo;
      </span>

      <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1">
        {testimonial.quote}
      </p>

      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3 mb-2">
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
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [googleMeta, setGoogleMeta] = useState<{ rating: number; total: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

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

  // Desktop: 3 cards per page, Mobile: 1 card per page
  // We'll use CSS to show different layouts
  const desktopPerPage = 3;
  const totalDesktopPages = Math.ceil(testimonials.length / desktopPerPage);

  const goNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalDesktopPages);
  }, [totalDesktopPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalDesktopPages) % totalDesktopPages);
  }, [totalDesktopPages]);

  // Auto-advance every 6s
  useEffect(() => {
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Get current page's testimonials for desktop
  const desktopStart = currentPage * desktopPerPage;
  const desktopVisible = testimonials.slice(desktopStart, desktopStart + desktopPerPage);

  return (
    <section ref={sectionRef} className="py-16 md:py-section px-6 overflow-hidden">
      {/* Header */}
      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 text-white">
          Trusted by businesses everywhere.
        </h2>
      </motion.div>

      {/* Google Rating Badge */}
      {googleMeta && (
        <GoogleBadge rating={googleMeta.rating} total={googleMeta.total} />
      )}
      {!googleMeta && <div className="mb-8 md:mb-12" />}

      {/* Desktop: 3-card grid with page transitions */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-6"
            >
              {desktopVisible.map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.name}-${desktopStart + i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-dim hover:text-white hover:border-accent/30 transition-all z-10"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-dim hover:text-white hover:border-accent/30 transition-all z-10"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop dots */}
        <div className="flex gap-2 justify-center mt-8">
          {Array.from({ length: totalDesktopPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage
                  ? 'bg-accent w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: swipeable single-card carousel */}
      <div className="md:hidden">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="px-1"
            >
              <TestimonialCard testimonial={testimonials[currentPage % testimonials.length]} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile nav arrows */}
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center text-dim hover:text-white transition-all z-10"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % testimonials.length)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center text-dim hover:text-white transition-all z-10"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile dots */}
        <div className="flex gap-2 justify-center mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage % testimonials.length
                  ? 'bg-accent w-5'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
