import * as React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';
import { Search } from 'lucide-react';

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
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'text', error, disabled, ...props }, ref) => {
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

            // Password
            variant === 'password' && 'pr-10 text-zinc-400',

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
