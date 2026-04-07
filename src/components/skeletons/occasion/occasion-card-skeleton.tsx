import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function OccasionCardSkeleton() {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 dark:border-zinc-400 ">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>

      <CardHeader className="space-y-3 pb-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2 pt-0 sm:flex-row sm:gap-3">
        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
