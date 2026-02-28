export default function AddressSkeleton() {
  return (
    <div className="mb-3 flex w-full animate-pulse flex-col rounded-2xl border-[.0625rem] border-zinc-300 px-4">
      <div className="mt-4 flex items-center justify-between">
        {/* Location Placeholder */}
        <div className="h-8 w-40 rounded bg-zinc-200 dark:bg-zinc-700"></div>

        {/* Phone Placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-maroon-200 dark:bg-zinc-600"></div>
          <div className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
      </div>

      {/* Address Placeholder */}
      <div className="mb-4 mt-2 h-5 w-32 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
    </div>
  );
}
