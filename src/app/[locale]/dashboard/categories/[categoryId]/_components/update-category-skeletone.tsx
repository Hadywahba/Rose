import { Skeleton } from '@/components/ui/skeleton';

export default function UpdateCategorySkeleton() {
  return (
    <section>
      {/* header */}
      <Skeleton className="h-7 w-48 rounded-md" />

      <div className="mt-4 rounded-lg bg-white p-5 dark:bg-gray-800">
        <div className="space-y-4 md:w-[75%]">
          {/* Name label */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          {/* View image button */}
          <div className="flex justify-end">
            <Skeleton className="h-9 w-40 rounded-lg" />
          </div>

          {/* Submit button */}
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>
    </section>
  );
}
