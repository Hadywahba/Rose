// ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-t-xl dark:shadow-zinc-200">
      {/* Image placeholder */}
      <div className="aspect-[5/5] w-full rounded-xl bg-zinc-300 dark:bg-zinc-700" />

      {/* Title placeholder */}
      <div className="mt-3 h-6 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col">
          {/* Stars placeholder */}
          <div className="mt-2 flex items-center space-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700"
                />
              ))}
          </div>

          {/* Price placeholders */}
          <div className="mt-3 flex items-center space-x-2">
            <div className="h-5 w-12 rounded bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-5 w-8 rounded bg-zinc-200 line-through dark:bg-zinc-600" />
          </div>
        </div>
        {/* Cart button placeholder */}
        <div className="mt-3 h-11 w-11 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
