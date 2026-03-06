export default function TopSellingSectionSkeleton() {
  return (
    <div className="fixed bottom-0 right-0 h-[440px] w-3/4 bg-zinc-50">
      <section className="grid grid-cols-2 gap-6 p-6">
        {/* Top Selling Column Skeleton */}
        <div className="flex flex-col gap-6 bg-white p-6 text-zinc-800">
          {/* Title */}
          <div className="h-6 w-40 animate-pulse rounded bg-zinc-200" />

          {/* List */}
          <div className="no-scrollbar flex max-h-[21.25rem] flex-col gap-3 overflow-y-auto pb-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded p-2"
              >
                {/* Product name */}
                <div className="h-4 w-[60%] animate-pulse rounded bg-zinc-200" />

                {/* Quantity */}
                <div className="h-4 w-12 animate-pulse rounded bg-zinc-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Column Skeleton */}
        <div className="flex flex-col gap-6 bg-white p-6 text-zinc-800">
          {/* Title */}
          <div className="h-6 w-40 animate-pulse rounded bg-zinc-200" />

          {/* List */}
          <div className="no-scrollbar flex max-h-[21.25rem] flex-col gap-3 overflow-y-auto pb-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded p-2"
              >
                {/* Product name */}
                <div className="h-4 w-[60%] animate-pulse rounded bg-zinc-200" />

                {/* Quantity */}
                <div className="h-4 w-12 animate-pulse rounded bg-zinc-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
