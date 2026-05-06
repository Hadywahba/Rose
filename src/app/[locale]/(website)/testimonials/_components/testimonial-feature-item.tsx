import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function TestimonialFeatureItem({ icon, title, description }: Props) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-maroon-100 bg-white p-4 shadow-sm dark:border-maroon-900/40 dark:bg-zinc-900">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon-600 dark:bg-softpink-400">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-50">{title}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
