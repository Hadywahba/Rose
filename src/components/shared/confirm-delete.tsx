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
import Image from 'next/image';

type ConfirmDeleteProps = {
  handleDeleteAddress: (id: string) => void;
  id: string;
  pendingDelete: boolean;
};


export function ConfirmDelete({ handleDeleteAddress, id, pendingDelete }: ConfirmDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn('flex h-8 w-8 items-center justify-center rounded-full',
            pendingDelete && 'cursor-not-allowed opacity-50')}
          disabled={pendingDelete}
          aria-label="Delete address"
          variant="destructive"
        >
          <Trash2Icon size={18} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex h-[20rem] max-w-md flex-col p-4 rounded-2xl">
        <AlertDialogHeader className="flex flex-1 flex-col items-center justify-center gap-4 pt-2">
          <Image
            src="/images/trashIcon.svg"
            alt="delete icon"
            width={110}
            height={110}
          />

          <AlertDialogDescription className="text-center text-xl font-semibold text-zinc-800">
            Are you sure you want to delete this address?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-4 sm:justify-center">
          <AlertDialogCancel className=" text-zinc-800 border-zinc-400">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
              className={cn(
                'bg-maroon-600 text-white hover:bg-maroon-700',
                pendingDelete && 'cursor-not-allowed opacity-50')}
              onClick={() => handleDeleteAddress(id)}
              disabled={pendingDelete}>
            
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
