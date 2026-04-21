import React from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InteractiveRating } from '@/components/ui/InteractiveRating';
import { Textarea } from '@/components/ui/textarea';
import { ratingFormSchema, RatingFormSchema } from '@/lib/schema/add-review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { useAddReview } from '../_hooks/use-add-review';

interface ReviewFormProps {
  productId: string;
}
export default function ReviewForm({ productId }: ReviewFormProps) {
  // Translations
  const t = useTranslations('review-form');

  // Hook
  const { isPending, addReview } = useAddReview(productId);

  // Form
  const form = useForm<RatingFormSchema>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      productId: productId,
      rating: 0,
      headline: '',
      content: '',
    },
  });

  // Submit
  function onSubmit(values: RatingFormSchema) {
    addReview(values);
    form.reset({
      content: '',
      headline: '',
      rating: 0,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-4"
      >
        {/* Rating */}
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <FieldLabel className="dark:text-zinc-50">
              {t('your-rating')}
            </FieldLabel>

            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <InteractiveRating
                  rating={field.value}
                  onRatingChange={field.onChange}
                  className="[&_svg]:size-6"
                />
              )}
            />
          </div>

          <FieldError>{form.formState.errors.rating?.message}</FieldError>
        </div>

        {/* Title */}
        <Field>
          <FieldLabel className="dark:text-zinc-50">
            {t('title-label')}
          </FieldLabel>

          <Input
            className="w-full dark:text-zinc-50"
            placeholder={t('title-placeholder')}
            {...form.register('headline')}
          />

          <FieldError>{form.formState.errors.headline?.message}</FieldError>
        </Field>

        {/* Comment */}
        <Field>
          <FieldLabel className="dark:text-zinc-50">
            {t('review-label')}
          </FieldLabel>

          <Textarea
            className="min-h-36 dark:text-zinc-50"
            placeholder={t('review-placeholder')}
            {...form.register('content')}
          />

          <FieldError>{form.formState.errors.content?.message}</FieldError>
        </Field>

        {/* Submit */}
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? t('submitting') : t('submit-button')}
        </Button>
      </form>
    </Form>
  );
}
