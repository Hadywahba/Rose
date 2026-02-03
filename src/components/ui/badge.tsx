import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utility/tailwind-merge';

const badgeVariants = cva(
  'inline-flex items-center justify-center text-center rounded-2xl  w-24  px-2 py-0.5 text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-maroon-600  text-white  hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-softpink-300 dark:hover:bg-softpink-400 dark:text-zinc-800',
        Subtle:
          'bg-zinc-100 border border-zinc-400 text-zinc-800  hover:bg-zinc-200 disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-600',
        secondary:
          'bg-maroon-50 text-maroon-600  hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-700 dark:text-sotfpink-300 dark:hover:bg-zinc-600',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
