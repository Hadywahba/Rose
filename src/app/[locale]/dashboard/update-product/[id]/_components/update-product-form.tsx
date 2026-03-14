'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
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
import { cn } from '@/lib/utility/tailwind-merge';
import {
  getUpdateProductSchema,
  UpdateProductFormFields,
} from '@/lib/schema/products/update-product.schema';
import { Product } from '@/lib/types/products/product';
import { useTranslations } from 'next-intl';
import useUpdateProduct from '../_hooks/use-update-product';
import useCategories from '../../../add-product/_hooks/use-categories';
import useOccasions from '../../../add-product/_hooks/use-occasions';

interface UpdateProductFormProps {
  product: Product;
}

export default function UpdateProductForm({ product }: UpdateProductFormProps) {
  // Translation
  const t = useTranslations();

  // Mutations
  const { isPending, updateProduct } = useUpdateProduct(product._id);

  // Queries
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: occasions, isLoading: loadingOccasions } = useOccasions();

  // Form & Validation
  const form = useForm<UpdateProductFormFields>({
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount ?? 0,
      priceAfterDiscount: product.priceAfterDiscount ?? undefined,
      quantity: product.quantity,
      category:
        typeof product.category === 'string'
          ? product.category
          : ((product.category as unknown as { _id: string })?._id ?? ''),
      occasion:
        typeof product.occasion === 'string'
          ? product.occasion
          : ((product.occasion as unknown as { _id: string })?._id ?? ''),
    },
    resolver: zodResolver(getUpdateProductSchema(t)),
    mode: 'onBlur',
  });

  // Functions
  const onSubmit: SubmitHandler<UpdateProductFormFields> = (values) => {
    const data: Record<string, unknown> = {
      title: values.title,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      category: values.category,
    };

    if (values.priceAfterDiscount !== undefined) {
      data.priceAfterDiscount = values.priceAfterDiscount;
    }

    updateProduct(data);
  };

  // Variables
  const { errors, isSubmitting } = form.formState;
  const isDisabled = isPending || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                {t('products.update.fields.title')}{' '}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  error={!!errors.title}
                  placeholder={t('products.update.fields.title-placeholder')}
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
                {t('products.update.fields.description')}{' '}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  data-error={!!errors.description ? 'true' : 'false'}
                  placeholder={t(
                    'products.update.fields.description-placeholder',
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
                  {t('products.update.fields.price')}{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="number"
                    error={!!errors.price}
                    min={0}
                    placeholder={t('products.update.fields.price-placeholder')}
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
                  {t('products.update.fields.discount')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="number"
                    min={0}
                    max={100}
                    disabled
                    placeholder={t(
                      'products.update.fields.discount-placeholder',
                    )}
                    className="h-11 w-full border-zinc-200 bg-zinc-100 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price After Discount */}
          <FormField
            control={form.control}
            name="priceAfterDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                  {t('products.update.fields.price-after-discount')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    value={field.value ?? ''}
                    error={!!errors.priceAfterDiscount}
                    placeholder={t(
                      'products.update.fields.price-after-discount-placeholder',
                    )}
                    className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : e.target.valueAsNumber,
                      )
                    }
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
                {t('products.update.fields.quantity')}{' '}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="number"
                  error={!!errors.quantity}
                  min={0}
                  placeholder={t('products.update.fields.quantity-placeholder')}
                  className="h-11 w-full border-zinc-200 text-black placeholder:text-zinc-400 dark:text-zinc-50"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                {t('products.update.fields.category')}{' '}
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
                        'products.update.fields.category-placeholder',
                      )}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-zinc-700">
                  {loadingCategories ? (
                    <SelectItem value="loading" disabled>
                      {t('products.update.fields.loading-options')}
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
                {t('products.update.fields.occasion')}
              </FormLabel>
              <Select value={field.value} disabled>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-11 border border-zinc-200 bg-zinc-100 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                    )}
                  >
                    <SelectValue
                      placeholder={t(
                        'products.update.fields.occasion-placeholder',
                      )}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-zinc-700">
                  {loadingOccasions ? (
                    <SelectItem value="loading" disabled>
                      {t('products.update.fields.loading-options')}
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
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isDisabled}
            className="w-full rounded-xl py-6 text-base"
          >
            {isPending
              ? t('products.update.submit-loading')
              : t('products.update.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
