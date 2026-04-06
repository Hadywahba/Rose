'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  // Translation
  const t = useTranslations('contact.form');
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSent(true);
    setIsSubmitting(false);
  }

  return (
    <section className="relative overflow-hidden bg-maroon-50 py-16 dark:bg-zinc-900 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-1/3 -translate-y-1/3 rounded-full bg-maroon-200/40 blur-3xl dark:bg-maroon-900/20" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-softpink-200/40 blur-3xl dark:bg-softpink-900/20" />

      <div className="container relative mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-maroon-600 dark:text-softpink-300">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl">
            {t('heading')}
          </h2>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-maroon-100 bg-white p-10 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-maroon-100 dark:bg-maroon-900">
              <Send className="h-7 w-7 text-maroon-600 dark:text-maroon-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-maroon-700 dark:text-softpink-200">
              {t('success.title')}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              {t('success.description')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-10"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t('name')}
                </label>
                <Input
                  required
                  placeholder={t('name-placeholder')}
                  className="h-11 w-full focus-visible:ring-maroon-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t('email')}
                </label>
                <Input
                  required
                  type="email"
                  placeholder={t('email-placeholder')}
                  className="h-11 w-full focus-visible:ring-maroon-400"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('subject')}
              </label>
              <Input
                required
                placeholder={t('subject-placeholder')}
                className="h-11 w-full focus-visible:ring-maroon-400"
              />
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('message')}
              </label>
              <textarea
                required
                rows={5}
                placeholder={t('message-placeholder')}
                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-400 focus-visible:ring-offset-2"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-xl bg-maroon-600 font-semibold hover:bg-maroon-700 dark:bg-maroon-600 dark:hover:bg-maroon-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t('submit')}
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
