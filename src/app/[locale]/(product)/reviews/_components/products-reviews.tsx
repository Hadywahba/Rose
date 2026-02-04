
import { cn } from '@/lib/utility/tailwind-merge';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  verified?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    title: 'Exceeded my expectations',
    content:
      'I was a bit skeptical at first, but this product really delivered. The quality is outstanding and it arrived faster than expected. Would definitely recommend to anyone on the fence.',
    author: {
      name: 'Sarah M',
      avatar:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
    },
    date: 'Dec 10, 2024',
    verified: true,
  },
  {
    id: '4',
    rating: 4.5,
    title: 'Good but not perfect',
    content:
      "The product is nice and works well. My only minor complaint is that the color is slightly different from the photos, but it's still a great purchase overall.",
    author: {
      name: 'Michael T.',
    },
    date: 'Dec 2, 2024',
    verified: false,
  },
];

interface Reviews1Props {
  reviews?: Review[];
  className?: string;
}

export function ProductsReviews({ reviews = DEFAULT_REVIEWS, className }: Reviews1Props) {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800 md:text-2xl">
            General rating:
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-800">
              {averageRating.toFixed(1)}{' '}
              <span className="text-sm font-medium text-zinc-500">
                ({reviews.length} ratings)
              </span>
            </span>
            <Rating rate={averageRating} className="[&_svg]:size-5" />
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-2">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {review.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-semibold text-zinc-600">
                      {review.author.name}
                    </span>
                    <span className="text-zinc-400">{review.date}</span>
                  </div>
                </div>
                {/* Rating */}
                <div className="mt-1 flex items-center gap-1">
                  <Rating rate={review.rating} className="[&_svg]:size-4" />
                  <span className="text-sm font-semibold text-zinc-800">
                    ({review.rating.toFixed(1)})
                  </span>
                </div>

                {/* Title & Content */}
                <div className="space-y-1">
                  <h3 className="font-medium">{review.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
