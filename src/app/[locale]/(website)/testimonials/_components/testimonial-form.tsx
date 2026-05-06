'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { TestimonialFormFields, testimonialSchema } from '@/lib/schema/testimonial/testimonial.schema';

export default function TestimonialForm() {
  // Translation
  const t = useTranslations('testimonials');

  // Hook
  const { addreview, error, isPending } = useAddTestimonial();

  // Form & Validation
  const form = useForm<TestimonialFormFields>({
    mode: 'all',
    resolver: zodResolver(testimonialSchema(t)),
    defaultValues: {
      message: '',
      name: '',
      rating: 0,
    },
  });

  // Function
  const onSubmit: SubmitHandler<TestimonialFormFields> = (values) => {
    console.log(values);
    const formattedValues = {
      ...values,
      rating: Number(values.rating),
    };
    addreview(formattedValues, {
      onSuccess: () => {
        form.reset({
          name: '',
          message: '',
          rating: 0,
        });
      },
    });
  };

  return (
    <section className="h-150 rounded-xl bg-white px-8 pt-12 sm:p-12 shadow-2xl">
      {/* Title */}
      <h1 className="mb-4 text-3xl font-semibold">{t('form-title')}</h1>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <div className="space-y-4">
            {/* username */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('form-first-field')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      placeholder={t('name-placeholder')}
                      {...field}
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('form-second-field')}
                  </FormLabel>

                  <FormControl>
                    <InteractiveRating
                      rating={Number(field.value)}
                      onRatingChange={field.onChange}
                      className="[&_svg]:size-6"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FeedBack */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('review')}
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      className="min-h-30 w-full resize-none text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      placeholder={t('review-placeholder')}
                      {...field}
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
            loading="submitting"
            text="submit-button"
          />
        </form>
      </Form>
    </section>
  );
}
