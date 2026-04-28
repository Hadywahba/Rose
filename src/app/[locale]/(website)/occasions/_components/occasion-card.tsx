import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface OccasionProps {
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export default function OccasionsCard({
  name,
  image,

  createdAt,
  id,
}: OccasionProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Variabeles
  const imageUrl = image?.startsWith('http')
    ? image
    : `https://rose-app.elevateegy.com/uploads/${image}`;
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl dark:border-zinc-400">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </CardContent>

      <CardHeader className="space-y-3 pb-4">
        <CardTitle className="line-clamp-2 text-xl font-bold text-maroon-700 transition-colors group-hover:text-maroon-800 dark:text-softpink-200 dark:group-hover:text-softpink-400 sm:text-2xl">
          {name}
        </CardTitle>

        <CardDescription className="flex flex-col gap-2 text-sm sm:text-base">
          {/* <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>{productsCount} Products Available</span>
          </div> */}

          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>{formattedDate}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2 pt-0 sm:flex-row sm:gap-3">
        <Link href={`/product?occasion=${id}`} className="w-full">
          <Button
            className="w-full bg-maroon-600 hover:bg-maroon-700 sm:flex-1"
            size="default"
          >
            Explore Products
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
