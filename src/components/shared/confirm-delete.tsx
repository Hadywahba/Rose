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
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';

export function ConfirmDelete() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex h-8 w-8 items-center justify-center rounded-full"
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
          <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
