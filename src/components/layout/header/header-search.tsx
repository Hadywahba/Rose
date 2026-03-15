import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

export default function HeaderSearch() {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="What awesome gift are you looking for?"
        className="h-12 w-full rounded-lg border-gray-200 pl-10 focus-visible:ring-red-800 dark:text-white"
      />
    </div>
  );
}
