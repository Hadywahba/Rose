'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utility/tailwind-merge';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ConfirmDeleteProps = {
  handleDeleteAddress: (id: string) => void;
  id: string;
  pendingDelete: boolean;
};


export function ConfirmDelete({ handleDeleteAddress, id, pendingDelete }: ConfirmDeleteProps) {
  // Translations
  const t = useTranslations('my-addresses');
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            pendingDelete && 'cursor-not-allowed opacity-50',
          )}
          disabled={pendingDelete}
          aria-label="Delete address"
          variant="destructive"
        >
          <Trash2Icon size={18} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex h-[20rem] max-w-md flex-col rounded-2xl p-4 dark:bg-zinc-700">
        <AlertDialogHeader className="flex flex-1 flex-col items-center justify-center gap-4 pt-2">
          <Image
            className="rounded-full bg-zinc-300"
            src="/images/trashIcon.svg"
            alt="delete icon"
            width={110}
            height={110}
          />

          <AlertDialogDescription className="text-center text-xl font-semibold text-zinc-800 dark:text-zinc-300">
            {t('sure-to-delete')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-4 sm:justify-center">
          <AlertDialogCancel className="border-zinc-400 text-zinc-800 dark:bg-softpink-100 dark:text-softpink-700">
            {t('Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              'bg-maroon-600 text-white hover:bg-maroon-700',
              pendingDelete && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => handleDeleteAddress(id)}
            disabled={pendingDelete}
          >
            {t('Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
