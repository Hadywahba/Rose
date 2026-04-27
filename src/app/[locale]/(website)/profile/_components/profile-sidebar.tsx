'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { KeyRound, UserCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type ProfileTab = 'account' | 'password';

type ProfileSidebarProps = {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export default function ProfileSidebar({ active, onChange }: ProfileSidebarProps) {
  const t = useTranslations('profile');

  const tabs: { key: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { key: 'account', label: t('tabs.account'), icon: <UserCircle2 className="h-4 w-4" /> },
    { key: 'password', label: t('tabs.password'), icon: <KeyRound className="h-4 w-4" /> },
  ];

  return (
    <aside className="flex flex-row gap-2 sm:flex-col shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'flex w-full items-center  gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
            active === tab.key
              ? 'bg-maroon-600 text-white shadow-sm dark:bg-softpink-400 dark:text-zinc-900'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
