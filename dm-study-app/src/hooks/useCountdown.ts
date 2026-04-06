'use client';
import { useState, useEffect } from 'react';
import { getTimeRemaining, DEADLINE } from '@/lib/utils';

export function useCountdown() {
  const [time, setTime] = useState(getTimeRemaining(DEADLINE));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(DEADLINE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
