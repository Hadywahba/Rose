'use client';

import { useState } from 'react';
import ProfileSidebar, { ProfileTab } from './profile-sidebar';
import ProfileForm from './profile-form';
import ChangePasswordForm from './change-password-form';
import ProfileAvatar from './profile-avatar';
import ProfileInfoBadges from './profile-info-badges';
import { useTranslations } from 'next-intl';
import { KeyRound, UserCircle2 } from 'lucide-react';
import { ImageProvider } from '@/components/providers/app/profile/profile-provider';

type ProfileContentProps = {
  user: User;
};

export default function ProfileContent({ user }: ProfileContentProps) {
  // Translations
  const t = useTranslations('profile');

  // State
  const [activeTab, setActiveTab] = useState<ProfileTab>('account');

  const tabTitle = {
    account: {
      label: t('tabs.account'),
      icon: (
        <UserCircle2 className="h-5 w-5 text-maroon-600 dark:text-softpink-400" />
      ),
    },
    password: {
      label: t('tabs.password'),
      icon: (
        <KeyRound className="h-5 w-5 text-maroon-600 dark:text-softpink-400" />
      ),
    },
  };

  return (
    <ImageProvider>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-maroon-700 to-maroon-500" />

        {/* Avatar + info */}
        <div className="-mt-16 flex flex-col items-center px-6 pb-2">
          <ProfileAvatar
            photo={user.photo || null}
            name={`${user.firstName} ${user.lastName}`}
            user={user}
          />
          <h2 className="mt-3 text-xl font-bold text-zinc-800 dark:text-zinc-50">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            @{user.username}
          </p>
          <ProfileInfoBadges user={user} />
        </div>

        <div className="mx-6 my-4 border-t border-zinc-100 dark:border-zinc-800" />

        {/* Body: sidebar + content */}
        <div className="flex flex-col gap-6 px-6 pb-8 sm:flex-row">
          {/* Sidebar */}
          <div className="sm:w-48 sm:shrink-0">
            <ProfileSidebar active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Divider vertical */}
          <div className="hidden w-px bg-zinc-100 dark:bg-zinc-800 sm:block" />

          {/* Tab content */}
          <div className="flex-1">
            <div className="mb-5 flex items-center gap-2">
              {tabTitle[activeTab].icon}
              <p className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {tabTitle[activeTab].label}
              </p>
            </div>

            {activeTab === 'account' && <ProfileForm user={user} />}
            {activeTab === 'password' && (
              <ChangePasswordForm email={user.email} />
            )}
          </div>
        </div>
      </div>
    </ImageProvider>
  );
}
