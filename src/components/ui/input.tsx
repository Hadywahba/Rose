'use client';

import * as React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';
import { Eye, EyeOff, Search } from 'lucide-react';
import { useLocale } from 'next-intl';

type InputVariant =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'file'
  | 'tel'
  | 'url';

interface InputProps extends React.ComponentProps<'input'> {
  variant?: InputVariant;
  error?: boolean;

  /**
   * When true, renders the native <input /> directly without the outer wrapper.
   * Useful when the parent component provides its own layout (e.g. PhoneInput).
   */
  noWrapper?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant = 'text', error, disabled, noWrapper, ...props },
    ref,
  ) => {
    // States
    const [showPassword, setShowPassword] = React.useState(false);

    // Hook
    const locale = useLocale();

    // Variables
    const isPassword = type === 'password' || variant === 'password';

    // Functions
    function handleTogglePassword() {
      setShowPassword((current) => !current);
    }

    // Password-input
    if (isPassword) {
      if (noWrapper) {
        return (
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            data-error={error ? 'true' : 'false'}
            disabled={disabled}
            className={cn(
              /* ================= Base ================= */
              'flex h-full w-full rounded-lg border border-zinc-300 bg-transparent p-4 pe-10 text-base text-zinc-400 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm',

              /* ================= Default ================= */
              'border-zinc-300 placeholder:text-muted-foreground',

              /* ================= Hover ================= */
              'hover:border-zinc-400',

              /* ================= Focus ================= */
              'focus:border-maroon-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600',

              /* ================= Error (highest priority) ================= */
              'data-[error=true]:border-red-600',
              'data-[error=true]:focus:border-red-600',
              'data-[error=true]:focus-visible:ring-red-600',

              /* ================= Disabled ================= */
              'disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-100 disabled:opacity-50',

              className,
            )}
            {...props}
            placeholder="***********"
          />
        );
      }

      return (
        <div className="relative h-11 rounded-lg">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            data-error={error ? 'true' : 'false'}
            disabled={disabled}
            className={cn(
              /* ================= Base ================= */
              'flex h-full w-full rounded-lg border border-zinc-300 bg-transparent p-4 pe-10 text-base text-zinc-400 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm',

              /* ================= Default ================= */
              'border-zinc-300 placeholder:text-muted-foreground',

              /* ================= Hover ================= */
              'hover:border-zinc-400',

              /* ================= Focus ================= */
              'focus:border-maroon-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600',

              /* ================= Error (highest priority) ================= */
              'data-[error=true]:border-red-600',
              'data-[error=true]:focus:border-red-600',
              'data-[error=true]:focus-visible:ring-red-600',

              /* ================= Disabled ================= */
              'disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-100 disabled:opacity-50',

              className,
            )}
            {...props}
            placeholder="***********"
          />
          {/* Toggle-button */}
          <button
            type="button"
            onClick={handleTogglePassword}
            className={cn(
              'absolute top-1/2 flex -translate-y-1/2 items-center justify-center p-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
              locale === 'ar' ? 'left-2' : 'right-2',
            )}
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        </div>
      );
    }

    if (noWrapper) {
      return (
        <input
          ref={ref}
          type={type ?? variant}
          data-error={error ? 'true' : 'false'}
          disabled={disabled}
          className={cn(
            /* ================= Base ================= */
            'flex h-12 w-80 rounded-lg border border-zinc-300 bg-transparent p-4 text-base text-zinc-800 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm',

            /* ================= Default ================= */
            'border-zinc-300 placeholder:text-muted-foreground',

            /* ================= Hover ================= */
            'hover:border-zinc-400',

            /* ================= Focus ================= */
            'focus:border-maroon-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600',

            /* ================= Error (highest priority) ================= */
            'data-[error=true]:border-red-600',
            'data-[error=true]:focus:border-red-600',
            'data-[error=true]:focus-visible:ring-red-600',

            /* ================= Disabled ================= */
            'disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-100 disabled:opacity-50',

            /* ================= Variants ================= */

            // Text / Email / URL / Tel
            (variant === 'text' ||
              variant === 'email' ||
              variant === 'url' ||
              variant === 'tel') &&
              'text-zinc-500',

            // Number
            variant === 'number' && 'appearance-none',

            // Search (padding only; icon is rendered in wrapper mode)
            variant === 'search' && 'pl-10',

            // File
            variant === 'file' &&
              'file file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-maroon-500',

            className,
          )}
          {...props}
        />
      );
    }

    // Other-inputs-types
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type ?? variant}
          data-error={error ? 'true' : 'false'}
          disabled={disabled}
          className={cn(
            /* ================= Base ================= */
            'flex h-12 w-80 rounded-lg border border-zinc-300 bg-transparent p-4 text-base text-zinc-800 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm',

            /* ================= Default ================= */
            'border-zinc-300 placeholder:text-muted-foreground',

            /* ================= Hover ================= */
            'hover:border-zinc-400',

            /* ================= Focus ================= */
            'focus:border-maroon-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600',

            /* ================= Error (highest priority) ================= */
            'data-[error=true]:border-red-600',
            'data-[error=true]:focus:border-red-600',
            'data-[error=true]:focus-visible:ring-red-600',

            /* ================= Disabled ================= */
            'disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-100 disabled:opacity-50',

            /* ================= Variants ================= */

            // Text / Email / URL / Tel
            (variant === 'text' ||
              variant === 'email' ||
              variant === 'url' ||
              variant === 'tel') &&
              'text-zinc-500',

            // Number
            variant === 'number' && 'appearance-none',

            // Search
            variant === 'search' && 'pl-10',

            // File
            variant === 'file' &&
              'file file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-maroon-500',

            className,
          )}
          {...props}
        />
        {variant === 'search' && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-zinc-400" />
        )}
        {variant === 'tel' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-950">
            EG (+20)
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
