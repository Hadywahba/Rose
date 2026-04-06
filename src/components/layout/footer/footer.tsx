import React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';
import FooterUpperBody from './footer-upper-body';
import FooterEnd from './footer-end';
import FooterLowerBody from './footer-lower-body';

export default function Footer() {
  return (
    <footer
      className={cn(
        'relative mt-auto w-full overflow-hidden border-t border-maroon-100/80 bg-gradient-to-b from-white via-maroon-50/40 to-white px-4 pb-8 pt-16 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 md:px-8',
        'before:pointer-events-none before:absolute before:-left-24 before:top-0 before:h-60 before:w-60 before:rounded-full before:bg-maroon-200/40 before:blur-3xl before:dark:bg-maroon-900/25',
        'after:pointer-events-none after:absolute after:-right-28 after:bottom-0 after:h-72 after:w-72 after:rounded-full after:bg-softpink-200/40 after:blur-3xl after:dark:bg-softpink-900/20',
      )}
    >
      {/* Body */}
      <section className="mx-auto mb-10 max-w-[88rem]">
        <FooterUpperBody />
      </section>

      <section className="mx-auto grid max-w-[88rem] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <FooterLowerBody />
      </section>

      {/* End */}
      <FooterEnd />
    </footer>
  );
}
