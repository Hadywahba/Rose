import React from 'react';
import { displayUserProfile } from './_hooks/get-profile';
import { getTranslations } from 'next-intl/server';
import { UserCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import ProfileContent from './_components/profile-content';

export default async function ProfilePage() {
  // Translation
  const t = await getTranslations('profile');

  // Fetch data From Server
  const { data, error } = await displayUserProfile();

  if (error || !data) redirect('/login');

  return (
    <main className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-softpink-100 px-4 py-10 dark:from-zinc-900 dark:via-maroon-950 dark:to-zinc-900">
      <div className="container mx-auto max-w-3xl">
        {/* Page title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-maroon-100 dark:bg-maroon-900/40">
            <UserCircle2 className="h-5 w-5 text-maroon-700 dark:text-softpink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-50">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <ProfileContent user={data} />
      </div>
    </main>
  );
}
