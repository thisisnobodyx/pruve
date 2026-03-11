'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Also scroll after a tick in case browser restores after hydration
    const t = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(t);
  }, []);

  return null;
}
