'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'otp_expires_at';
const OTP_DURATION = 30; // seconds

export function useResendTimer() {
  const [timeLeft, setTimeLeft] = useState(0);

  const readExpiresAt = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = Number(raw);
    return Number.isNaN(value) ? null : value;
  };

  const startTimer = useCallback(() => {
    const expiresAt = Date.now() + OTP_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, String(expiresAt));
    setTimeLeft(OTP_DURATION);
  }, []);

  const clearTimer = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTimeLeft(0);
  }, []);

  useEffect(() => {
    const tick = () => {
      const expiresAt = readExpiresAt();

      if (!expiresAt) {
        setTimeLeft(0);
        return;
      }

      const diff = Math.max(0, expiresAt - Date.now());
      const seconds = Math.ceil(diff / 1000);

      setTimeLeft(seconds);

      if (seconds === 0) {
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    tick(); // sync immediately
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    timeLeft,
    canResend: timeLeft === 0,
    startTimer,
    clearTimer,
  };
}
