'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
          }
        }}
      />

      <Button
        variant="Subtle"
        className="relative h-12 w-80 rounded-lg border-2 bg-transparent !pe-0 ps-48 !text-end text-base text-maroon-600 transition-colors dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:focus:border-softpink-400 md:text-sm"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName && (
          <span className="absolute start-0 w-10 text-sm text-muted-foreground">
            {fileName}
          </span>
        )}
        <Upload /> Upload file
      </Button>
    </div>
  );
}
