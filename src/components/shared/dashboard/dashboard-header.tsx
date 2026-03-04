'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utility/tailwind-merge';

import { Plus } from 'lucide-react';

type DashboardHeaderPropts = {
  title: string;
  path: string;
  className?: string;
  btnText: string;
};
export default function DashboardHeaderPage({
  title,
  btnText,
  path,
  className,
}: DashboardHeaderPropts) {
  // Navigation
  const router = useRouter();

  // Functions
  function handleNavigate() {
    router.push(path);
  }

  return (
    <header
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <h1 className="font-inter text-2xl font-semibold capitalize text-zinc-800 dark:text-zinc-200">
        {title}
      </h1>
      <Button
        onClick={handleNavigate}
        className="flex h-11 w-full items-center justify-center gap-2 sm:w-44 sm:justify-between"
      >
        <Plus /> <span>{btnText}</span>
      </Button>
    </header>
  );
}
