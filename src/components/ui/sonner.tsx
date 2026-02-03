'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import {
  CheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const locale = useLocale();
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Specific state overrides
          success:
            'group-[.toaster]:!bg-emerald-50 group-[.toaster]:!border-emerald-700 group-[.toaster]:!text-zinc-800  dark:group-[.toaster]:!bg-emerald-300 dark:group-[.toaster]:text-zinc-800 dark:group-[.toaster]:border-emerald-800',
          error:
            'group-[.toaster]:!bg-red-50 group-[.toaster]:!text-zinc-800 group-[.toaster]:!border-red-700 dark:group-[.toaster]:!bg-red-300 dark:group-[.toaster]:!text-zinc-800 dark:group-[.toaster]:!border-red-700 dark:group-[.toaster]:border-red-800',
          warning:
            'group-[.toaster]:bg-amber-50 group-[.toaster]:text-amber-900 group-[.toaster]:border-amber-200 dark:group-[.toaster]:bg-amber-950 dark:group-[.toaster]:text-amber-200 dark:group-[.toaster]:border-amber-800 ',
          info: 'group toast h-12 group-[.toaster]:!bg-zinc-100 group-[.toaster]:!text-foreground group-[.toaster]:!border-zinc-400 dark:group-[.toaster]:!bg-zinc-300 dark:group-[.toaster]:!text-zinc-800 dark:group-[.toaster]:!border-0',

          // Other elements
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      icons={{
        success: (
          <CheckIcon
            className={cn(
              'size-4 text-emerald-600',
              locale == 'ar' ? 'absolute left-0' : 'absolute right-0',
            )}
          />
        ),
        info: <InfoIcon className="size-4 text-zinc-500" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <XIcon className="size-4 text-red-700" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
