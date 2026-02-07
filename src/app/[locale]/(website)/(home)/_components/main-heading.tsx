import React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';

interface MainHeadingProps {
  heading?: string;
  paragraph?: string;
  className?: string;
}

/**
 * Main heading component with decorative underline styling.
 * Displays an optional small heading and a large styled title with dark mode support.
 *
 * @param heading - Optional small heading text displayed above the main title
 * @param paragraph - Main title text with decorative underline
 * @param className - Additional CSS classes for styling
 */
export default function MainHeading({
  heading,
  paragraph,
  className,
}: MainHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        className,
      )}
    >
      {heading && (
        // use Static Color because wait design system
        <p className="mb-2 text-sm font-bold uppercase leading-none tracking-[0.25em] text-softpink-500 dark:text-[#D75458] sm:text-base">
          {heading}
        </p>
      )}
      {paragraph && (
        // use Static Color because wait design system
        <h2 className="relative inline-block w-fit pb-1 text-2xl font-bold leading-none text-maroon-700 before:absolute before:bottom-0 before:left-1/2 before:z-[-1] before:h-[17px] before:w-[165px] before:translate-x-[-50%] before:rounded-br-[20px] before:rounded-tr-[20px] before:bg-[#FFE0E7] after:absolute after:bottom-[-0px] after:left-1/2 after:z-[1] after:h-[2px] after:w-[165px] after:-translate-x-1/2 after:bg-[#E65073] dark:text-[#FFC2D0] dark:before:bg-[#3F3F46] dark:after:bg-[#FF668B] sm:text-[2.3rem] sm:before:left-0 sm:before:w-[420px] sm:before:translate-x-0 sm:after:left-0 sm:after:translate-x-0">
          {paragraph}
        </h2>
      )}
    </div>
  );
}
