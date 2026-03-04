import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SubmitError from '@/components/error/submit-error';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  error: Error | null;
  text: string;
  title?: string;
  isValid: boolean;
  isSubmitting: boolean;
  isPending: boolean;
  link?: string;
  loading: string;
}
export default function SubmitButton({
  error,
  text,
  title,
  isValid,
  isSubmitting,
  isPending,
  link,
  loading,
}: SubmitButtonProps) {
  // Translation
  const t = useTranslations('dashboard-occasion');

  return (
    <div className="mt-0 flex flex-col gap-6 pt-9">
      {/* Button */}
      <div>
        <Button
          variant={'primary'}
          disabled={isPending || (!isValid && isSubmitting)}
          className="w-full rounded-xl py-6 text-base"
        >
          {isPending ? t(loading) : t(text)}
        </Button>

        {/* Optional Title */}
        {title && (
          <div className="mt-9 text-center">
            <p className="border-t-2 border-zinc-200 py-4 pt-5 text-center text-sm font-medium text-zinc-800 first-letter:capitalize dark:border-zinc-600 dark:text-zinc-50">
              {t.rich(title, {
                span: (chunk: React.ReactNode) =>
                  link ? (
                    <Link href={link}>
                      <span className="text-sm font-bold text-maroon-700 dark:text-softpink-300">
                        {chunk}
                      </span>
                    </Link>
                  ) : (
                    <span className="text-sm font-bold text-maroon-700 dark:text-softpink-300">
                      {chunk}
                    </span>
                  ),
              })}
            </p>
          </div>
        )}
      </div>
      {/* Error */}
      {error && (
        <div className="">
          <SubmitError errors={error} />
        </div>
      )}
    </div>
  );
}
