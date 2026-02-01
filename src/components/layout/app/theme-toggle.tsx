'use client';

import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggleIcon() {
  // Hook
  const { setTheme } = useTheme();

  return (
    <Button
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains('dark')
            ? 'light'
            : 'dark',
        )
      }
      className="rounded-md p-2 transition"
    >
      {/*  Light mode */}
      <Sun className="block h-5 w-5 dark:hidden" />

      {/*  Dark mode */}
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  );
}
