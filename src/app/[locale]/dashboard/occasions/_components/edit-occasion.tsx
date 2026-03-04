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
import { UseEditOccasionName } from '../_hooks/use-edit-occasion';
import {
  OccasionFormFields,
  occasionSchema,
} from '@/lib/schema/occasion/occasion.schema';
import SubmitButton from './submit-button';

interface EditOccasionProps {
  occasionId: string;
  occasionData: OccasionResponse;
}

export default function EditOccasion({
  occasionId,
  occasionData,
}: EditOccasionProps) {
  // Translation
  const t = useTranslations('dashboard-occasion');

  //   Mutation
  const { error, editoccasion, isPending } = UseEditOccasionName(occasionId);

  // Form
  const form = useForm<OccasionFormFields>({
    mode: 'all',
    resolver: zodResolver(occasionSchema(t)),
    defaultValues: {
      name: occasionData?.occasion.name || '',
    },
  });

  // Function
  const onsubmit: SubmitHandler<OccasionFormFields> = (data) => {
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
                  <FormLabel className="font-inter text-sm font-medium capitalize text-zinc-800 dark:text-zinc-50">
                    {t('occasion-name')}
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
                className="mt-5 border-[.0625rem] border-[rgba(0,0,0,0.08)] text-blue-600"
              >
                <ImagePlus size={18} /> View occasion image
              </Button>
            </div>
          </div>
          {/* Submit Button */}
          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="occasion-loading"
            text="update-occasion-button"
          />
        </form>
      </Form>
    </div>
  );
}
