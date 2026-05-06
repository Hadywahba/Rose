'use client';

import { useEffect, useState } from 'react';
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
import {
  TestimonialFormFields,
  testimonialSchema,
} from '@/lib/schema/testimonial/testimonial.schema';
import useAddTestimonial from '../_hook/use-add-testimonial';
import { InteractiveRating } from '@/components/ui/InteractiveRating';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/components/features/auth/submit-button';
import Image from 'next/image';
import { Camera, Send } from 'lucide-react';
import { UseUpload } from '@/lib/hooks/use-upload';

type userContentProps = {
  user: User | null;
};

export default function TestimonialForm({ user }: userContentProps) {
  // Translations
  const t = useTranslations('testimonial');

  const { addTestimonial, error, isPending } = useAddTestimonial();
  const { UploadImages, isPending: uploading } = UseUpload();

  //   State
  const [preview, setPreview] = useState<string | null>(null);

  // Form
  const form = useForm<TestimonialFormFields>({
    mode: 'all',
    resolver: zodResolver(testimonialSchema(t)),
    defaultValues: { content: '', name: '', rating: 0, email: '', image: '' },
  });

  // Effect
  useEffect(() => {
    if (user) {
      form.setValue('name', user.username ?? '');
      form.setValue('email', user.email ?? '');
    }
  }, [user, form]);
  

  // handle file change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    UploadImages(file, {
      onSuccess: (res) => {
        const uploadedUrl = res.payload?.url;
        if (!uploadedUrl) return;
        fieldOnChange(uploadedUrl);
        console.log(res);
      },
      onError: () => {
        setPreview(null);
      },
    });
  };
  const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGES;
  const onSubmit: SubmitHandler<TestimonialFormFields> = (values) => {
    const tempImageUrl = values.image
      ? `${BASE_URL}/api/upload/temp/${values.image}`
      : '';
    const payload = {
      ...values,
      image: tempImageUrl,
    };
    console.log(payload);
    addTestimonial(payload, {
      onSuccess: () => {
        form.reset({
          content: '',
          name: user?.username ?? '',
          email: user?.email ?? '',
          rating: 0,
          image: '',
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <section className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 sm:p-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-100 dark:bg-maroon-900/40">
          <Send className="h-5 w-5 text-maroon-600 dark:text-softpink-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-50">
          {t('form-title')}
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('image')}</FormLabel>

                <FormControl>
                  <div className="flex w-full items-center gap-4">
                    {/* Upload */}
                    <label
                      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-maroon-300 bg-maroon-50 px-4 py-3 text-sm font-medium text-maroon-600 transition-colors hover:bg-maroon-100 dark:border-maroon-800 dark:bg-maroon-900/20 dark:text-softpink-400 dark:hover:bg-maroon-900/40 ${uploading ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      <Camera className="h-4 w-4" />
                      {uploading ? t('uploading') : t('upload-image')}

                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, field.onChange)}
                      />
                    </label>

                    {/* Preview — يظهر فوراً من blob ثم يتحدث بالـ URL */}
                    {(preview || field.value) && (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-maroon-300 dark:ring-maroon-700">
                        <Image
                          src={preview ?? String(field.value)}
                          alt="preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t('name')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!user}
                      className="w-full"
                      placeholder={t('name-placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {t('email')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!user}
                      className="w-full"
                      placeholder={t('email-placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('form-second-field')}
                </FormLabel>
                <FormControl>
                  <InteractiveRating
                    rating={Number(field.value)}
                    onRatingChange={field.onChange}
                    className="[&_svg]:size-7"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('review')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-32 w-full resize-none"
                    placeholder={t('review-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="testimonial.submitting"
            text="submit-button"
          />
        </form>
      </Form>
    </section>
  );
}
