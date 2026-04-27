import { BadgeCheck, ShieldAlert, User2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utility/tailwind-merge';

type ProfileInfoBadgesProps = {
  user: User;
};

export default function ProfileInfoBadges({ user }: ProfileInfoBadgesProps) {
  const t = useTranslations('profile');

  const badges = [
    {
      label: t('badges.email'),
      verified: user.emailVerified,
    },
    {
      label: t('badges.phone'),
      verified: user.phoneVerified,
    },
  ];

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
      {/* Role */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-100 px-3 py-1 text-xs font-bold text-maroon-700 dark:bg-maroon-900/40 dark:text-softpink-300">
        <User2 className="h-3.5 w-3.5" />
        {user.role}
      </span>

      {/* Gender */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        {user.gender === 'MALE' ? '♂' : '♀'} {t(`gender.${user.gender.toLowerCase()}`)}
      </span>

      {/* Verified badges */}
      {badges.map((b) => (
        <span
          key={b.label}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
            b.verified
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500',
          )}
        >
          {b.verified ? (
            <BadgeCheck className="h-3.5 w-3.5" />
          ) : (
            <ShieldAlert className="h-3.5 w-3.5" />
          )}
          {b.label}
        </span>
      ))}
    </div>
  );
}
