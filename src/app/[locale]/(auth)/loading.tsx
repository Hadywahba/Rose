import Spinner from '@/components/loader/Spinner';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center lg:h-full">
      <Spinner color="text-maroon-600 dark:text-pink-300" />
    </div>
  );
}
