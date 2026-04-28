'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { TriangleAlert, X } from 'lucide-react';
import SubmitError from '@/components/error/submit-error';
import Modal from '@/components/ui/modal';
import { signOut } from 'next-auth/react';
import { UseDeleteAccount } from '../_hooks/use-delete-account';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

export default function DeleteModal({
  setopenModal,
  openModal,
}: {
  setopenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}) {
  const t = useTranslations('profile');

  // Mutation — logic unchanged
  const { deleteMe, deleteIsPending, deleteError } = UseDeleteAccount();

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setopenModal(false)}
      className="relative mx-4 flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white dark:border dark:border-maroon-800 dark:bg-zinc-950"
    >
      {/* Close button */}
      <button
        onClick={() => setopenModal(false)}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-maroon-900/40 dark:hover:text-softpink-300"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Icon */}
      <div className="flex flex-col items-center px-6 pb-4 pt-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-maroon-950/60">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-maroon-900/60">
            <TriangleAlert className="h-7 w-7 text-red-600 dark:text-softpink-400" />
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-4 text-center text-lg font-bold text-zinc-800 dark:text-softpink-100">
          {t('deleteModal.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500 dark:text-softpink-200/60">
          {t('deleteModal.description')}
        </p>
      </div>

      {/* Error */}
      {deleteError && (
        <div className="px-6">
          <SubmitError errors={deleteError} />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex items-center justify-center gap-3 border-t border-zinc-100 bg-zinc-50 px-6 py-5 dark:border-maroon-900 dark:bg-maroon-950/40">
        <Button
          onClick={() => setopenModal(false)}
          variant="Subtle"
          className="flex-1"
        >
          {t('deleteModal.cancel')}
        </Button>
        <Button
          onClick={() => {
            signOut();
            deleteMe();
          }}
          variant="destructive"
          disabled={deleteIsPending}
          className="flex flex-1 items-center gap-2"
        >
          {deleteIsPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('deleteModal.deleting')}
            </>
          ) : (
            t('deleteModal.confirm')
          )}
        </Button>
      </div>
    </Modal>
  );
}
