'use client';

import {
  Package,
  ClipboardList,
  LayoutList,
  CircleDollarSign,
} from 'lucide-react';
import { useTranslations, useFormatter } from 'next-intl';
import { cn } from '@/lib/utility/tailwind-merge';
import { type LucideIcon } from 'lucide-react';
import { useStatistics } from '../_hooks/use-statistics';
import { type OverallStatistics } from '@/lib/types/statistics/statistics.d';

type StatConfig = {
  icon: LucideIcon;
  labelKey: string;
  valueKey: keyof OverallStatistics;
  isRevenue?: boolean;
  lightBg: string;
  darkBg: string;
  lightIcon: string;
  darkIcon: string;
  lightValue: string;
  darkValue: string;
  hoverBg: string;
};

const STATS: StatConfig[] = [
  {
    icon: Package,
    labelKey: 'total-products',
    valueKey: 'totalProducts',
    lightBg: 'bg-maroon-50',
    darkBg: 'dark:bg-zinc-800',
    lightIcon: 'text-maroon-500',
    darkIcon: 'dark:text-softpink-300',
    lightValue: 'text-maroon-600',
    darkValue: 'dark:text-softpink-300',
    hoverBg: 'hover:bg-maroon-100 dark:hover:bg-zinc-700',
  },
  {
    icon: ClipboardList,
    labelKey: 'total-orders',
    valueKey: 'totalOrders',
    lightBg: 'bg-[#0063D00D]',
    darkBg: 'dark:bg-zinc-800',
    lightIcon: 'text-blue-500',
    darkIcon: 'dark:text-blue-300',
    lightValue: 'text-blue-600',
    darkValue: 'dark:text-blue-300',
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-zinc-700',
  },
  {
    icon: LayoutList,
    labelKey: 'total-categories',
    valueKey: 'totalCategories',
    lightBg: 'bg-[#753CBF0D]',
    darkBg: 'dark:bg-zinc-800',
    lightIcon: 'text-violet-500',
    darkIcon: 'dark:text-violet-400',
    lightValue: 'text-violet-600',
    darkValue: 'dark:text-violet-400',
    hoverBg: 'hover:bg-violet-100 dark:hover:bg-zinc-700',
  },
  {
    icon: CircleDollarSign,
    labelKey: 'total-revenue',
    valueKey: 'totalRevenue',
    isRevenue: true,
    lightBg: 'bg-[#0089610D]',
    darkBg: 'dark:bg-zinc-800',
    lightIcon: 'text-emerald-500',
    darkIcon: 'dark:text-emerald-400',
    lightValue: 'text-emerald-600',
    darkValue: 'dark:text-emerald-400',
    hoverBg: 'hover:bg-emerald-100 dark:hover:bg-zinc-700',
  },
];

export default function StatsOverview() {
  // Translation
  const t = useTranslations('dashboard.stats-overview');
  const format = useFormatter();

  // Queries
  const { data, isLoading } = useStatistics();

  // Skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.labelKey}
            className={cn(
              'flex animate-pulse flex-col gap-2 rounded-2xl p-4',
              stat.lightBg,
              stat.darkBg,
            )}
          >
            <div className="size-7 rounded-lg bg-zinc-300 dark:bg-zinc-600" />
            <div className="mt-1 h-7 w-20 rounded-md bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl bg-background p-6">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        const rawValue = data?.[stat.valueKey] ?? 0;
        const formattedValue = format.number(rawValue, 'numbers');

        return (
          <div
            key={stat.labelKey}
            className={cn(
              'flex flex-col gap-2 rounded-2xl p-4 transition-all duration-200',
              'hover:scale-[1.02] hover:shadow-md dark:hover:shadow-zinc-900',
              stat.lightBg,
              stat.darkBg,
              stat.hoverBg,
            )}
          >
            <Icon
              className={cn('size-8', stat.lightIcon, stat.darkIcon)}
              strokeWidth={1.5}
            />
            <div>
              <p
                className={cn(
                  'pt-2 text-2xl font-bold',
                  stat.lightValue,
                  stat.darkValue,
                )}
              >
                {formattedValue}
                {stat.isRevenue && (
                  <span className="ms-1 text-xs font-semibold">{t('egp')}</span>
                )}
              </p>
              <p className="mt-0.5 text-base font-medium text-zinc-800 dark:text-zinc-400">
                {t(stat.labelKey)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
