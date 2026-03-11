'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  pauseBetween?: number;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
  loop = false,
  pauseBetween = 1500,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const currentStringIndex = useRef(0);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref current without triggering effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const strings = Array.isArray(text) ? text : [text];
  const stringsRef = useRef(strings);
  stringsRef.current = strings;

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const typeString = useCallback(
    (str: string, onDone: () => void) => {
      setIsTyping(true);
      setDisplayedText('');

      let charIndex = 0;

      const typeNext = () => {
        if (charIndex < str.length) {
          const nextChar = str[charIndex];
          charIndex++;
          setDisplayedText(str.slice(0, charIndex));

          // Slight variation in typing speed for natural feel
          const variation = nextChar === ' ' ? speed * 0.5 : speed;
          addTimeout(typeNext, variation);
        } else {
          setIsTyping(false);
          onDone();
        }
      };

      typeNext();
    },
    [speed, addTimeout]
  );

  const deleteString = useCallback(
    (str: string, onDone: () => void) => {
      setIsTyping(true);
      let charIndex = str.length;

      const deleteNext = () => {
        if (charIndex > 0) {
          charIndex--;
          setDisplayedText(str.slice(0, charIndex));
          addTimeout(deleteNext, speed * 0.5);
        } else {
          setIsTyping(false);
          onDone();
        }
      };

      deleteNext();
    },
    [speed, addTimeout]
  );

  useEffect(() => {
    clearAllTimeouts();
    currentStringIndex.current = 0;
    setDisplayedText('');

    const allStrings = stringsRef.current;
    const isMulti = allStrings.length > 1;

    const startCycle = () => {
      const idx = currentStringIndex.current;
      const currentStr = allStrings[idx];

      typeString(currentStr, () => {
        const isLast = idx === allStrings.length - 1;

        if (isMulti) {
          addTimeout(() => {
            deleteString(currentStr, () => {
              if (isLast) {
                if (loop) {
                  currentStringIndex.current = 0;
                  addTimeout(startCycle, 300);
                } else {
                  onCompleteRef.current?.();
                }
              } else {
                currentStringIndex.current = idx + 1;
                addTimeout(startCycle, 300);
              }
            });
          }, pauseBetween);
        } else {
          // Single string - just complete
          if (!loop) {
            onCompleteRef.current?.();
          }
        }
      });
    };

    addTimeout(startCycle, delay);

    return clearAllTimeouts;
    // Intentionally depend on primitive values to avoid re-triggering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Use stringified text to compare by value
    JSON.stringify(Array.isArray(text) ? text : [text]),
    speed,
    delay,
    loop,
    pauseBetween,
    typeString,
    deleteString,
    addTimeout,
    clearAllTimeouts,
  ]);

  // Blinking cursor
  useEffect(() => {
    if (isTyping) {
      setShowCursor(true);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className="inline-block w-[2px] h-[1em] align-middle ml-0.5 bg-accent"
        style={{
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
        aria-hidden="true"
      />
    </span>
  );
}
