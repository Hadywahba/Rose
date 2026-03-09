'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AddOccasionFormFields,
  addOccasionSchema,
} from '@/lib/schema/occasion/occasion.schema';
import SubmitButton from './submit-button';
import { UseAddOccasion } from '../_hooks/use-add-occasion';
import FileUpload from '@/components/ui/input-file';
import { cn } from '@/lib/utility/tailwind-merge';

export default function AddOccasion() {
  // Translation
  const t = useTranslations('dashboard');

  // Mutation
  const { Addoccasion, error, isPending } = UseAddOccasion();

  // Form
  const form = useForm<AddOccasionFormFields>({
    mode: 'all',
    resolver: zodResolver(addOccasionSchema(t)),
    defaultValues: {
      name: '',
    },
  });

  // Function
  const onsubmit: SubmitHandler<AddOccasionFormFields> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }
    Addoccasion(formData);
  };

  return (
    <div className="w-full max-w-[46.625rem] pb-6">
      <Form {...form}>
        {/*Form */}
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col justify-center gap-6 p-6"
        >
          <div className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'font-inter text-sm font-medium capitalize text-zinc-800 dark:text-zinc-50',
                      "after:ml-1 after:text-destructive after:content-['*']",
                    )}
                  >
                    {t('dashboard-occasion.occasion-name')}
                  </FormLabel>

                  {/* Field */}
                  <FormControl>
                    {/* Input */}
                    <Input
                      {...field}
                      required
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Picture Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'font-inter text-sm font-medium capitalize text-zinc-800 dark:text-zinc-50',
                      "after:ml-1 after:text-destructive after:content-['*']",
                    )}
                  >
                    {t('dashboard-occasion.occasion-add-image')}{' '}
                  </FormLabel>

                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit Button */}
          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="dashboard-occasion.occasion-loading"
            text="dashboard-occasion.occasion-added"
          />
        </form>
      </Form>
    </div>
  );
}
