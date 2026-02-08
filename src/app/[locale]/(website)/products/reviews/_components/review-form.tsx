'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InteractiveRating } from '@/components/ui/InteractiveRating';
import { Textarea } from '@/components/ui/textarea';
import { ratingFormSchema, RatingFormSchema } from '@/lib/schemas/add-review';
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
  const { isPending, addReview } = useAddReview();

  // Hook Form
  const form = useForm<RatingFormSchema>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      product: productId,
      rating: 0,
      title: '',
      comment: '',
    },
  });

  // Function
  function onSubmit(values: RatingFormSchema) {
    addReview(values);
  }

  return (
    <div className="col-span-1 border-s ps-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              {/* Rating */}
              <FieldLabel>{t('your-rating')}</FieldLabel>
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
            <FieldLabel htmlFor="title">{t('title-label')}</FieldLabel>
            <Input
              className='w-full'
              id="title"
              placeholder={t('title-placeholder')}
              {...form.register('title')}
            />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </Field>

          {/* Comment */}
          <Field>
            <FieldLabel htmlFor="comment">{t('review-label')}</FieldLabel>
            <Textarea
              className="min-h-36"
              id="comment"
              placeholder={t('review-placeholder')}
              {...form.register('comment')}
            />
            <FieldError>{form.formState.errors.comment?.message}</FieldError>
          </Field>

          {/* Submit Button */}
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? t('submitting') : t('submit-button')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
