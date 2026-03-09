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
import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useEditOccasionName } from '../_hooks/use-edit-occasion';
import {
  EditOccasionFormFields,
  editoccasionSchema,
} from '@/lib/schema/occasion/occasion.schema';
import SubmitButton from './submit-button';
import { cn } from '@/lib/utility/tailwind-merge';

interface EditOccasionProps {
  occasionId: string;
  occasionData: OccasionResponse;
}

export default function EditOccasion({
  occasionId,
  occasionData,
}: EditOccasionProps) {
  // Translation
  const t = useTranslations('dashboard');

  //   Mutation
  const { error, editoccasion, isPending } = useEditOccasionName(occasionId);

  // Form
  const form = useForm<EditOccasionFormFields>({
    mode: 'all',
    resolver: zodResolver(editoccasionSchema(t)),
    defaultValues: {
      name: occasionData?.occasion.name || '',
    },
  });

  // Function
  const onsubmit: SubmitHandler<EditOccasionFormFields> = (data) => {
    editoccasion(data);
  };

  return (
    <div className="w-full max-w-[46.625rem] pb-6">
      <Form {...form}>
        {/*Form */}
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col justify-center gap-32 p-6"
        >
          <div>
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
                    {t('dashboard-occasion.occasion-name')}{' '}
                  </FormLabel>

                  {/* Field */}
                  <FormControl>
                    {/* Input */}
                    <Input
                      {...field}
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* show Picture */}
            <div className="flex justify-end">
              <Button
                variant={'outline'}
                className="mt-5 w-48 border-[.0625rem] border-[rgba(0,0,0,0.08)] text-blue-600 dark:bg-transparent dark:text-zinc-50"
              >
                <ImagePlus size={18} /> {t('dashboard-occasion.occasion-image')}
              </Button>
            </div>
          </div>
          {/* Submit Button */}
          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="dashboard-occasion.occasion-loading"
            text="dashboard-occasion.update-occasion-button"
          />
        </form>
      </Form>
    </div>
  );
}
