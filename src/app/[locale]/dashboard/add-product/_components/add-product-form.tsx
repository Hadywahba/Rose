'use client';

import { useRef, useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import {
  getAddProductSchema,
  AddProductFormFields,
} from '@/lib/schema/products/add-product.schema';
import { useTranslations } from 'next-intl';
import useAddProduct from '../_hooks/use-add-product';
import useCategories from '../_hooks/use-categories';
import useOccasions from '../_hooks/use-occasions';

export default function AddProductForm() {
  const t = useTranslations();

  // Mutations & Queries
  const { isPending, addProduct } = useAddProduct();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: occasions, isLoading: loadingOccasions } = useOccasions();

  // Refs for file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form
  const form = useForm<AddProductFormFields>({
    defaultValues: {
      title: '',
      description: '',
      price: undefined,
      discount: 0,
      priceAfterDiscount: undefined,
      quantity: undefined,
      category: '',
      occasion: '',
    },
    resolver: zodResolver(getAddProductSchema(t)),
    mode: 'onBlur',
  });

  // Watch price & discount to auto-compute priceAfterDiscount
  const price = useWatch({ control: form.control, name: 'price' });
  const discount = useWatch({ control: form.control, name: 'discount' });

  useEffect(() => {
    if (price && discount && discount > 0 && discount <= 100) {
      const computed = price - (price * discount) / 100;
      form.setValue('priceAfterDiscount', Math.round(computed * 100) / 100, {
        shouldValidate: false,
      });
    } else {
      form.setValue('priceAfterDiscount', undefined, { shouldValidate: false });
    }
  }, [price, discount, form]);

  // Submit
  const onSubmit: SubmitHandler<AddProductFormFields> = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', String(values.price));
    formData.append('quantity', String(values.quantity));
    formData.append('discount', String(values.discount ?? 0));
    if (values.priceAfterDiscount !== undefined) {
      formData.append('priceAfterDiscount', String(values.priceAfterDiscount));
    }
    formData.append('category', values.category);
    formData.append('occasion', values.occasion);

    if (values.imgCover?.[0]) {
      formData.append('imgCover', values.imgCover[0]);
    }
    if (values.images) {
      Array.from(values.images).forEach((file) => {
        formData.append('images', file);
      });
    }

    addProduct(formData, {
      onSuccess: () => {
        form.reset();
        if (coverInputRef.current) coverInputRef.current.value = '';
        if (galleryInputRef.current) galleryInputRef.current.value = '';
      },
    });
  };

  const { errors, isSubmitting } = form.formState;
  const isDisabled = isPending || isSubmitting;

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.add.fields.title')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    error={!!errors.title}
                    placeholder={t('products.add.fields.title-placeholder')}
                    className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.add.fields.description')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-error={!!errors.description ? 'true' : 'false'}
                    placeholder={t(
                      'products.add.fields.description-placeholder',
                    )}
                    className="max-h-48 min-h-32 w-full resize-none overflow-y-auto border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price | Discount | Price After Discount */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t('products.add.fields.price')}{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      error={!!errors.price}
                      min={0}
                      placeholder={t('products.add.fields.price-placeholder')}
                      className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t('products.add.fields.discount')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      min={0}
                      max={100}
                      placeholder={t(
                        'products.add.fields.discount-placeholder',
                      )}
                      className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === '' ? 0 : e.target.valueAsNumber,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price After Discount (read-only) */}
            <FormField
              control={form.control}
              name="priceAfterDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t('products.add.fields.price-after-discount')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      readOnly
                      disabled
                      value={field.value ?? ''}
                      placeholder={t(
                        'products.add.fields.price-after-discount-placeholder',
                      )}
                      className="h-11 w-full border-zinc-200 bg-zinc-100 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.add.fields.quantity')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="number"
                    error={!!errors.quantity}
                    min={0}
                    placeholder={t('products.add.fields.quantity-placeholder')}
                    className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image & Gallery */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Cover Image */}
            <FormField
              control={form.control}
              name="imgCover"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t('products.add.fields.cover')}{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        'flex h-11 items-center rounded-lg border border-zinc-200 dark:border-zinc-600',
                        errors.imgCover && 'border-red-500',
                      )}
                    >
                      <span className="flex-1 truncate ps-3 text-sm text-zinc-400">
                        {value?.[0]?.name ?? ''}
                      </span>
                      <input
                        {...field}
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="flex w-fit items-center gap-1 px-3 text-sm text-maroon-600 hover:bg-transparent hover:text-maroon-700 dark:text-softpink-300"
                        onClick={() => coverInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {t('products.add.fields.upload')}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Gallery */}
            <FormField
              control={form.control}
              name="images"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t('products.add.fields.gallery')}{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        'flex h-11 items-center rounded-lg border border-zinc-200 dark:border-zinc-600',
                        errors.images && 'border-red-500',
                      )}
                    >
                      <span className="flex-1 truncate ps-3 text-sm text-zinc-400">
                        {value && value.length > 0
                          ? `${value.length} file${value.length > 1 ? 's' : ''} selected`
                          : ''}
                      </span>
                      <input
                        {...field}
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="flex w-fit items-center gap-1 px-3 text-sm text-maroon-600 hover:bg-transparent hover:text-maroon-700 dark:text-softpink-300"
                        onClick={() => galleryInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {t('products.add.fields.upload')}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.add.fields.category')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'h-11 border border-zinc-200 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                        errors.category && 'border-red-500',
                      )}
                    >
                      <SelectValue
                        placeholder={t(
                          'products.add.fields.category-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-zinc-700">
                    {loadingCategories ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      categories?.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Occasion */}
          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.add.fields.occasion')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'h-11 border border-zinc-200 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                        errors.occasion && 'border-red-500',
                      )}
                    >
                      <SelectValue
                        placeholder={t(
                          'products.add.fields.occasion-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-zinc-700">
                    {loadingOccasions ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      occasions?.map((occ) => (
                        <SelectItem key={occ._id} value={occ._id}>
                          {occ.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-20">
            <Button
              type="submit"
              variant="primary"
              disabled={isDisabled}
              className="w-full rounded-xl py-6 text-base"
            >
              {isPending
                ? t('products.add.submit-loading')
                : t('products.add.submit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
