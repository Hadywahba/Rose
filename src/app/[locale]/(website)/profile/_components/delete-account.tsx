'use client';

import React, { useState } from 'react';
import DeleteModal from './delete-modal';
import { Trash2, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DeleteAccount() {
  const t = useTranslations('profile');
  const [openModal, setopenModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-maroon-800 dark:bg-maroon-950/30">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-maroon-900/40">
            <TriangleAlert className="h-4 w-4 text-red-600 dark:text-softpink-400" />
          </div>
          <div>
            <h3 className="font-bold text-red-700 dark:text-softpink-300">
              {t('deleteAccount.title')}
            </h3>
            <p className="mt-1 text-sm text-red-600/80 dark:text-softpink-200/60">
              {t('deleteAccount.description')}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-red-200 dark:border-maroon-800" />

        {/* Warning list */}
        <ul className="mb-5 space-y-1.5 text-sm text-red-600/80 dark:text-softpink-200/60">
          {(t.raw('deleteAccount.warnings') as string[]).map((w: string) => (
            <li key={w} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400 dark:bg-maroon-500" />
              {w}
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          type="button"
          onClick={() => setopenModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white dark:border-maroon-700 dark:bg-maroon-900/30 dark:text-softpink-300 dark:hover:bg-maroon-700 dark:hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          {t('deleteAccount.button')}
        </button>
      </div>

      {openModal && (
        <DeleteModal setopenModal={setopenModal} openModal={openModal} />
      )}
    </>
  );
}
