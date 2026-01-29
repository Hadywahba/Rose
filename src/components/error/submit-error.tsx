'usec client';
import React from 'react';
import { CircleX } from 'lucide-react';
interface SubmitErrorProps {
  errors: Error | null;
}

export default function SubmitError({ errors }: SubmitErrorProps) {
  return (
    <>
      {errors && (
        <div className="relative w-full border border-red-500 bg-red-50 p-2 text-center text-sm font-semibold text-red-600 dark:border-none">
          <div className="absolute right-1/2 top-0 -translate-y-1/2 translate-x-1/2 rounded-xl bg-red-50">
            <CircleX className="h-4 w-4 text-red-600" />
          </div>
          <p>{errors.message}</p>
        </div>
      )}
    </>
  );
}
