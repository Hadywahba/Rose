'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreateFormField,
  UpdateFormField,
  useCreateSchema,
  useUpdateSchema,
} from '@/lib/schema/dashboard-schema/shared.schema';

import { cn } from '@/lib/utility/tailwind-merge';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Types
type CreateMode = {
  mode: 'create';
  currentImageUrl?: never;
  defaultName?: never;
};

type UpdateMode = {
  mode: 'update';
  currentImageUrl?: string;
  defaultName?: string;
};

type DashboardCategoryOccassionFormProps = (CreateMode | UpdateMode) & {
  submitText: string;
  isLoading?: boolean;
  className?: string;
  serverError?: string | null;
  formType: 'category' | 'occassion';
  onSubmit: (formData: FormData, reset: () => void) => void;
};

type CreateFormProps = {
  submitText: string;
  isLoading?: boolean;
  className?: string;
  serverError?: string | null;
  formType: 'category' | 'occassion';
  onSubmit: (formData: FormData, reset: () => void) => void;
};

type UpdateFormProps = CreateFormProps & {
  defaultName?: string;
  currentImageUrl?: string;
};

// Custom File Input
function FileInput({
  onChange,
  fileInputRef,
  fileName,
}: {
  onChange: (file: File | undefined) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  fileName?: string;
}) {
  // Translations
  const t = useTranslations();

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors hover:bg-accent/50"
      onClick={() => fileInputRef.current?.click()}
    >
      {/* file-name */}
      <span
        className={cn(
          'truncate',
          fileName ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {fileName}
      </span>
      {/* upload button */}
      <span className="ms-3 flex shrink-0 items-center gap-1.5 rounded-md text-maroon-500">
        <Upload className="h-4 w-4" />
        <span className="font-medium">{t('upload-file')}</span>
      </span>
      {/* hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0])}
      />
    </div>
  );
}

//Create Form
function CreateForm({
  submitText,
  isLoading,
  className,
  serverError,
  formType,
  onSubmit,
}: CreateFormProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const schema = useCreateSchema();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<CreateFormField>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '' },
  });

  const onFormSubmit: SubmitHandler<CreateFormField> = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    if (values.image) formData.append('image', values.image);

    onSubmit(formData, () => {
      reset({ name: '' });
      setFileName(undefined);
      // reset-file-input
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={cn('space-y-4 md:w-[75%]', className)}
    >
      {/* Name */}
      <div className="space-y-1">
        <Label className="relative before:absolute before:-end-2 before:top-0 before:text-red-600 before:content-['*']">
          {t('name')}
        </Label>
        <Input
          className="w-full"
          {...register('name')}
          placeholder={
            formType === 'category'
              ? t('enter-category-name-0')
              : t('enter-occassion-name')
          }
        />
        {errors.name && (
          <p className="my-2 text-sm font-semibold text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-1">
        <Label className="relative before:absolute before:-end-2 before:top-0 before:text-red-600 before:content-['*']">
          {formType === 'category'
            ? t('category-image-0')
            : t('occassion-image')}
        </Label>
        <FileInput
          fileInputRef={fileInputRef}
          fileName={fileName}
          onChange={(file) => {
            setFileName(file?.name);
            setValue('image', file, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.image && (
          <p className="my-2 text-sm font-semibold text-red-500">
            {errors.image.message}
          </p>
        )}
      </div>

      {/* Server-Error */}
      {serverError && (
        <p className="my-2 text-sm font-semibold text-red-500">{serverError}</p>
      )}

      <Button
        className="w-full"
        disabled={(isSubmitted && !isValid) || isLoading}
        type="submit"
      >
        {isLoading ? t('loading') : submitText}
      </Button>
    </form>
  );
}

//Update Form
function UpdateForm({
  submitText,
  isLoading,
  className,
  serverError,
  formType,
  onSubmit,
  defaultName,
}: UpdateFormProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const schema = useUpdateSchema();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid, isDirty },
  } = useForm<UpdateFormField>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: defaultName ?? '' },
  });

  const onFormSubmit: SubmitHandler<UpdateFormField> = (values) => {
    // guard-no-changes
    if (!isDirty) {
      toast.info(t('no-changes'));
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    onSubmit(formData, () => reset({ name: defaultName ?? '' }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn('space-y-4 md:w-[75%]', className)}
      >
        {/* Name */}
        <div className="space-y-1">
          <Label className="relative before:absolute before:-end-2 before:top-0 before:text-red-600 before:content-['*']">
            {t('name')}
          </Label>
          <Input
          className='w-full'
            {...register('name')}
            placeholder={
              formType === 'category'
                ? t('enter-category-name-0')
                : t('enter-occassion-name')
            }
          />
          {errors.name && (
            <p className="my-2 text-sm font-semibold text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Image — gallery button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-blue-500 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-sm font-medium">
              {formType === 'category'
                ? t('view-category-image')
                : t('view-occassion-image')}
            </span>
          </button>
        </div>

        {/* Server-Error */}
        {serverError && (
          <p className="text-sm font-semibold text-red-500">
            {serverError}
          </p>
        )}

        <Button
          className="w-full"
          disabled={(isSubmitted && !isValid) || isLoading}
          type="submit"
        >
          {isLoading ? t('loading') : submitText}
        </Button>
      </form>
    </>
  );
}

//Main Export
export default function DashboardCategoryForm(
  props: DashboardCategoryOccassionFormProps,
) {
  if (props.mode === 'update') {
    return (
      <UpdateForm
        submitText={props.submitText}
        isLoading={props.isLoading}
        className={props.className}
        serverError={props.serverError}
        formType={props.formType}
        onSubmit={props.onSubmit}
        defaultName={props.defaultName}
        currentImageUrl={props.currentImageUrl}
      />
    );
  }

  return (
    <CreateForm
      submitText={props.submitText}
      isLoading={props.isLoading}
      className={props.className}
      serverError={props.serverError}
      formType={props.formType}
      onSubmit={props.onSubmit}
    />
  );
}
