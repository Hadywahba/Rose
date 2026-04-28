'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { KeyRound, Trash2, UserCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type ProfileTab = 'account' | 'password' | 'deleteAccount';

type ProfileSidebarProps = {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export default function ProfileSidebar({ active, onChange }: ProfileSidebarProps) {
  const t = useTranslations('profile');

  const tabs: { key: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { key: 'account', label: t('tabs.account'), icon: <UserCircle2 className="h-4 w-4" /> },
    { key: 'password', label: t('tabs.password'), icon: <KeyRound className="h-4 w-4" /> },
      { key: 'deleteAccount', label: t('tabs.deleteAccount'), icon: <Trash2 className="h-4 w-4" /> },
  ];

  return (
    <aside className="flex flex-row flex-wrap gap-2 sm:flex-col sm:flex-nowrap shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold transition-colors',
            active === tab.key
              ? 'bg-maroon-600 text-white shadow-sm dark:bg-softpink-400 dark:text-zinc-900'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
          )}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
        </button>
      ))}
    </aside>
  );
}
