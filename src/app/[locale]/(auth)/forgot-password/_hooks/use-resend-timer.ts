'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

const STORAGE_KEY = 'otp_expires_at';
const OTP_DURATION = 30; // seconds

export function useResendTimer() {
  // Start with 0 to avoid SSR mismatch — will sync from localStorage on mount
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const readExpiresAt = (): number | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = Number(raw);
    return Number.isNaN(value) ? null : value;
  };

  const tick = useCallback(() => {
    const expiresAt = readExpiresAt();
    if (!expiresAt) {
      setTimeLeft(0);
      return;
    }
    const seconds = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
    setTimeLeft(seconds);
    if (seconds === 0) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Sync from localStorage on mount
  useEffect(() => {
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tick]);

  const startTimer = useCallback(() => {
    const expiresAt = Date.now() + OTP_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, String(expiresAt));
    setTimeLeft(OTP_DURATION);
  }, []);

  const clearTimer = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTimeLeft(0);
  }, []);

  return {
    timeLeft,
    canResend: timeLeft === 0,
    startTimer,
    clearTimer,
  };
}
