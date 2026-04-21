export default function ReviewFormSkeleton() {
  return (
    <div className="col-span-1 animate-pulse space-y-6 border-s ps-4 dark:border-zinc-50">
      {/* Rating skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-6 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-10 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-28 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      {/* Button skeleton */}
      <div className="h-12 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}
