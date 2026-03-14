'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';


interface FileUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  className?: string;
}

export default function FileUpload({ value, onChange, className }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(value?.name || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName('');
      onChange(undefined);
    }
  };

    // Translation
    const t = useTranslations('dashboard');

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <input
        aria-label="Upload a file"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden "
        onChange={handleFileChange}
      />

      <Button
        variant="Subtle"
        className="relative items-center justify-end pl-2 h-12 w-full rounded-lg border-2 bg-transparent  !text-end text-base text-maroon-600 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName && (
          <span className="absolute start-0 w-10 text-sm text-muted-foreground">
            {fileName}
          </span>
        )}
        <Upload /> {t('dashboard-occasion.upload-file')}
      </Button>
    </div>
  );
}
